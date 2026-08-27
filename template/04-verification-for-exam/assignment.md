---
slug: verification-for-exam
type: challenge
title: Verification for Exam
tabs:
- title: terminal
  type: terminal
  hostname: rockyvm
  cmd: /bin/bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Verification for Exam

This challenge is a **worked example**, not a real task — it exists to
show how automated, check-gated grading works in Instruqt, for exam
tracks that need it (unlike this template's other challenges, which
are deliberately script-free).

**The problem it solves:** by default, if a check script fails,
Instruqt just shows the learner a generic *"Not quite right, try
again"* banner — it does **not** show anything your script printed
with `echo`/`print`. A student has no idea *why* it failed.

**The fix — the `fail-message` helper**, built into every Instruqt
sandbox:

- `fail-message "some text"` writes that text to stdout, prefixed with
  `FAIL:`, and **this is what Instruqt actually displays to the
  learner** in the failure banner.
- Calling it does **not** stop the script — you still need an explicit
  `exit 1` (or any non-zero code) straight after.
- Exit code is everything: `exit 0` = pass (learner can click Next),
  any non-zero = fail (learner stays on this challenge).

**A real gotcha learned the hard way**: `fail-message` already prints
its own `FAIL: ...` line — don't *also* `echo` your own copy of the
same message right before calling it, or the learner sees the same
text twice.

**How this challenge is wired up**: a file called `check-rockyvm`
sits in this challenge's own folder (`04-verification-for-exam/`),
matching the tab's `hostname: rockyvm` above — Instruqt finds and
runs it automatically whenever the learner clicks **Check**. Its full
content:

```
#!/bin/sh
if [ -f /root/verified.txt ]; then
  echo "Found /root/verified.txt"
  exit 0
else
  fail-message "There is no file named /root/verified.txt - did you create it? Run: touch /root/verified.txt"
  exit 1
fi
```

**Try it yourself** — click **Check** now without doing anything, and
you should see that exact fail message. Then run the command below and
click **Check** again to see it pass:

```run
touch /root/verified.txt
```

> [!NOTE]
> Adapt the pattern above for a real exam task: replace the `[ -f ... ]`
> check with whatever your task actually needs to verify (an API call,
> an object existing, a file's contents, etc.), and write a
> `fail-message` that tells the learner specifically what's still
> missing — the same way this example does.

---

**Lab Complete**
