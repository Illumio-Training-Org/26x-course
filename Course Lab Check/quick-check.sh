#!/bin/bash
# Pre-class quick check for 26.x Instruqt tracks.
#
# Runs `instruqt track test` against a published track (it builds a real
# sandbox, runs every setup script, then tears it down) and reads the log
# for the CHECK-OK / CHECK-FAIL markers our scripts print, plus known
# failure messages. Writes a report to reports/ and pops up a Mac
# notification with PASS/FAIL.
#
# Usage:  ./quick-check.sh [slug ...]     (default: every track in tracks.txt)
#
# WARNING: running `instruqt track test` on a track can END any live
# learner session on that same track. Only run it when nobody is in class.

cd "$(dirname "$0")" || exit 1
ORG="illumio-training"
mkdir -p reports
SLUGS=("$@")
if [ ${#SLUGS[@]} -eq 0 ]; then
  while read -r slug _; do SLUGS+=("$slug"); done < <(grep -vE '^\s*(#|$)' tracks.txt)
fi

overall=0
for slug in "${SLUGS[@]}"; do
  markers="$(grep -E "^${slug}[[:space:]]" tracks.txt | cut -d' ' -f2- | xargs)"
  stamp="$(date +%Y-%m-%d_%H%M)"
  raw="reports/${stamp}_${slug}.log"
  report="reports/${stamp}_${slug}.txt"
  echo "== $slug: running instruqt track test (takes ~5 min) ..."
  start=$(date +%s)
  since="$(date -u -r "$start" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d "@$start" +%Y-%m-%dT%H:%M:%SZ)"
  testout="reports/${stamp}_${slug}.test.txt"
  instruqt track test "$ORG/$slug" --skip-fail-check > "$testout" 2>&1
  test_rc=$?
  secs=$(( $(date +%s) - start ))
  # A passing `track test` only prints a summary - the setup/cleanup script
  # output (with our CHECK markers) is in Instruqt's track log. Fetch it for
  # this test's participant, waiting up to ~2 min for the cleanup lines.
  pid="$(grep -oE 'Participant ID: [a-z0-9]+' "$testout" | awk '{print $3}' | head -1)"
  echo "   test finished (participant ${pid:-unknown}) - collecting the Instruqt log ..."
  tmplog="$(mktemp)"
  instruqt track logs "$ORG/$slug" --since "$since" > "$tmplog" 2>&1 &
  logpid=$!
  for i in $(seq 1 24); do
    sleep 5
    grep "$pid" "$tmplog" | grep -q "CHECK-.*crystal-deleted" && { sleep 10; break; }
  done
  kill "$logpid" 2>/dev/null; wait "$logpid" 2>/dev/null
  { cat "$testout"; echo; echo "===== Instruqt track log for participant $pid ====="; grep "$pid" "$tmplog"; } > "$raw"
  rm -f "$tmplog"
  python3 - "$raw" "$report" "$slug" "$test_rc" "$secs" "$markers" <<'PY'
import sys, re
raw, report, slug, rc, secs, markers = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5]), sys.argv[6].split()
log = open(raw, errors="replace").read()
lines = log.splitlines()
ok = set(re.findall(r"CHECK-OK: ([\w-]+)", log))
fails = [l for l in lines if "CHECK-FAIL:" in l]
missing = [m for m in markers if m not in ok]
# Known failure messages (anywhere in the log, whatever Instruqt's level says)
patterns = [r"script was aborted", r"Error making request", r"\[ERROR\]", r"^.*\bError:", r"timed out",
            r"exit code [1-9]", r"Lateral Movement attack NOT fired", r"Crystal delete returned HTTP 5"]
ignore = [r"debconf: unable to initialize frontend", r"Deployment not found", r"CHECK-FAIL:"]
bad = [l for l in lines if any(re.search(p, l) for p in patterns) and not any(re.search(i, l) for i in ignore)]
leak = [l for l in lines if "crst_" in l]
linkleak = [l for l in lines if "accesslink/login?token=" in l]
def ts(pat):
    for l in lines:
        if re.search(pat, l):
            m = re.match(r"(\S+Z)", l)
            if m: return m.group(1)
    return "-"
problems = []
if rc != 0: problems.append(f"instruqt track test exited with code {rc}")
problems += [f"missing marker: CHECK-OK: {m}" for m in missing]
problems += ["marker: " + l.split("CHECK-FAIL:",1)[1].strip() for l in fails]
problems += ["log: " + l[:200] for l in bad[:15]]
if leak: problems.append(f"SECURITY: Crystal API key (crst_) appears in the log on {len(leak)} line(s)")
if linkleak: problems.append(f"SECURITY: learner magic link (accesslink token) appears in the log on {len(linkleak)} line(s)")
result = "PASS" if not problems else "FAIL"
out = [f"26.x quick check - {slug} - {result}",
       f"run length: {secs//60}m{secs%60:02d}s (instruqt track test exit code {rc})",
       f"sandbox ready         (UTC) : {ts(r'Terraform apply has been successful')}",
       f"track setup complete  (UTC) : {ts(r'CHECK-OK: track-setup-complete')}",
       f"AWS build complete    (UTC) : {ts(r'CHECK-OK: aws-build')}",
       f"Crystal deleted       (UTC) : {ts(r'CHECK-OK: crystal-deleted')}",
       "", "markers found: " + (", ".join(sorted(ok)) or "none")]
if problems: out += ["", "PROBLEMS:"] + ["  - " + p for p in problems]
out += ["", f"full log: {raw}"]
open(report, "w").write("\n".join(out) + "\n")
print("\n".join(out))
sys.exit(0 if result == "PASS" else 1)
PY
  rc=$?
  [ $rc -ne 0 ] && overall=1
  status=$([ $rc -eq 0 ] && echo PASS || echo FAIL)
  osascript -e "display notification \"$slug: $status (see Verify Labs/reports)\" with title \"26.x quick check\"" 2>/dev/null
done
exit $overall
