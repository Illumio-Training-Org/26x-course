# Course Lab Check - pre-class quick check for `! 26.x Lab`

Checks that the 26.x course lab still builds and cleans up correctly, so
problems show up **before** a class instead of during it. Takes about 3
minutes and ends with a clear **PASS** or **FAIL**.

> **Only run it when nobody is in a class on the track you're checking.**
> The check uses `instruqt track test`, which can end live learner sessions
> on that same track.

## What it checks

`quick-check.sh` runs `instruqt track test` against the published track.
That builds a real sandbox, runs every setup script, then tears it down.
It then fetches that test's Instruqt log and checks it.

Instruqt labels almost every log line as INFO - even real failures - so the
lab's scripts print their own markers, `CHECK-OK: <step>` or
`CHECK-FAIL: <step>`. The check passes only if:

- every marker listed for the track in `tracks.txt` appears as `CHECK-OK`;
- no `CHECK-FAIL` appears;
- none of the known failure messages appear (`script was aborted`,
  `Error making request`, `[ERROR]`, `Error:`, `timed out`, `exit code`,
  `Lateral Movement attack NOT fired`, `Crystal delete returned HTTP 5xx`);
- the Crystal API key (`crst_`) doesn't appear anywhere in the log;
- the learner's magic link (`accesslink/login?token=`) doesn't appear
  anywhere in the log (setup keeps command echo off while it handles it).

Known harmless noise is ignored: `debconf: unable to initialize frontend`,
and `Deployment not found` (the second cleanup finding the deployment
already deleted).

| Marker | Means |
|---|---|
| `magic-link` | the learner's magic link / PCE org was created |
| `crystal-reachable` | Crystal answered with HTTP 200 (API key valid) |
| `crystal-deployed` | the `Lab_<DDMM>_<org>_<learner>` Crystal deployment was created |
| `crystal-running` | the deployment reached `running` |
| `attack-fired` | the Lateral Movement attack was accepted |
| `ruleset-job-started` | the background policy-disable job started |
| `track-setup-complete` | the whole track setup finished |
| `aws-build` | the AWS Terraform build finished |
| `crystal-deleted` | the Crystal deployment was deleted at the end |

The test also passes the Close Lab challenge: its check only passes after
the learner runs `close-lab` and types YES, and `instruqt track test` runs
that challenge's solve script to create the same confirmation. So if the
Close Lab check or solve script breaks, `crystal-deleted` goes missing and
the run fails. (Typing YES by hand is not tested.)

**Not checked:** things that happen after the test has already torn the
sandbox down - Crystal's object import (~5-10 min), the policies actually
being disabled, and traffic appearing (~15-65 min on poc4).

## What you need

- The **Instruqt CLI**, logged in as an Instruqt user who is a member of the
  **illumio-training** team with rights to test the 26.x tracks.
- **bash** and **Python 3**.
- This folder (clone the `Illumio-Training-Org/26x-course` repo).

## Running it on a Mac

1. **Install the Instruqt CLI** (once) with Homebrew:
   ```
   brew install instruqt/tap/instruqt
   instruqt version
   ```
   (No Homebrew? Download `instruqt-darwin-arm64.zip` for Apple silicon or
   `instruqt-darwin-amd64.zip` for Intel from
   https://github.com/instruqt/cli/releases/latest, unzip it, and move the
   `instruqt` file to `/usr/local/bin/`.)
2. **Log in to Instruqt** (once per machine - it stays logged in):
   ```
   instruqt auth login
   ```
   A browser window opens; sign in with your Instruqt account, then return
   to the terminal.
3. **Get the files** (once) and go to this folder:
   ```
   git clone https://github.com/Illumio-Training-Org/26x-course.git
   cd "26x-course/Course Lab Check"
   ```
   (Already cloned? `git pull` to get the latest.)
4. **Run the check:**
   ```
   ./quick-check.sh 26x-lab
   ```
5. **Read the result:** PASS/FAIL prints in the terminal and a Mac
   notification pops up. Details are in `reports/`.

## Running it on Windows (using WSL)

The script is a bash script, so on Windows it runs inside **WSL** (Windows
Subsystem for Linux) - not in PowerShell or Command Prompt.

1. **Install WSL** (once): open **PowerShell as Administrator** and run
   ```
   wsl --install
   ```
   Restart when asked, then open **Ubuntu** from the Start menu and set a
   Linux username and password.
2. **Install the tools** (once), inside Ubuntu:
   ```
   sudo apt update
   sudo apt install -y unzip git python3
   ```
3. **Install the Instruqt CLI inside Ubuntu** (once) - the **Linux** version.
   A Windows copy of the CLI is not visible from WSL.
   ```
   curl -L -o instruqt.zip https://github.com/instruqt/cli/releases/latest/download/instruqt-linux.zip
   unzip instruqt.zip
   sudo mv instruqt /usr/local/bin/
   sudo chmod +x /usr/local/bin/instruqt
   rm instruqt.zip
   instruqt version
   ```
4. **Log in to Instruqt from Ubuntu** (once - a Windows or Mac login does not
   carry over):
   ```
   instruqt auth login
   ```
   WSL often can't open a browser itself. If nothing opens, copy the link the
   command prints into your Windows browser, sign in, and return to the
   Ubuntu window. (If it can't log in at all, see *Using an API token*
   below.)
5. **Get the files** (once) and go to this folder:
   ```
   cd ~
   git clone https://github.com/Illumio-Training-Org/26x-course.git
   cd "26x-course/Course Lab Check"
   ```
   Cloning inside Ubuntu (rather than onto a Windows drive under
   `/mnt/c/...`) avoids Windows line-ending problems. If you do use a copy
   on a Windows drive and see `$'\r': command not found`, run:
   ```
   sed -i 's/\r$//' quick-check.sh tracks.txt
   ```
6. **Run the check:**
   ```
   bash ./quick-check.sh 26x-lab
   ```
7. **Read the result:** PASS/FAIL prints in the terminal (there's no pop-up
   notification on Windows). Details are in `reports/`.

## Using an API token instead of `instruqt auth login`

If the browser login doesn't work (common on WSL or headless machines), the
CLI also accepts an Instruqt team API token (from the Instruqt team
settings):

```
INSTRUQT_TOKEN="<token>" bash ./quick-check.sh 26x-lab
```

The token is a team-wide credential - keep it private and never save it in
this repo.

## What each run produces

- `reports/<date>_<time>_<slug>.txt` - summary: PASS/FAIL, timings (UTC),
  markers found, and the list of problems if it failed.
- `reports/<date>_<time>_<slug>.log` - the test output plus the full
  Instruqt log for that test.
- `reports/<date>_<time>_<slug>.test.txt` - the raw `instruqt track test`
  output.

`reports/` is kept out of Git (`.gitignore`).

Example of a passing run (2026-09-30):

```
26.x quick check - 26x-lab - PASS
run length: 2m31s (instruqt track test exit code 0)
sandbox ready         (UTC) : 2026-09-30T08:33:02Z
track setup complete  (UTC) : 2026-09-30T08:33:23Z
AWS build complete    (UTC) : 2026-09-30T08:34:20Z
Crystal deleted       (UTC) : 2026-09-30T08:34:25Z
```

## Files

- `quick-check.sh` - the check.
- `tracks.txt` - which tracks to check and the markers each must print.
  Currently only `26x-lab`.
- The markers themselves are printed by the lab's scripts in
  `../Course Lab/` (`track_scripts/setup-cloud-client`,
  `01-lab/setup-cloud-client`, and both `cleanup-cloud-client` scripts) -
  keep their wording in sync with `tracks.txt` if either changes.
