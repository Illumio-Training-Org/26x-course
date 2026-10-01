# 000-Template for CX — scaffold conventions

This is the reusable starting point for every new Illumio ILT lab. When
copying it for a new lab:

## Structure
- One directory per challenge: `NN-slug-name/assignment.md`. The directory
  name carries the `NN-` prefix; the frontmatter `slug:` field does not.
- Each challenge ships exactly one terminal tab (`hostname: rockyvm`,
  `type: terminal`, `cmd: /bin/bash`). No setup/cleanup scripts are used
  anywhere in this template — it is intentionally script-free, matching
  most of the org's existing reading/console-walkthrough labs. The one
  deliberate exception is `04-verification-for-exam` (see below), which
  ships a real `check-rockyvm`/`solve-rockyvm` pair specifically to teach
  the fail-message check-script pattern — remove that challenge entirely
  for labs that don't need auto-graded exam-style checks.
- **`hostname` must match the machine name defined in `config.yml` (or,
  if you switch to a `sandbox_preset`, whatever host that preset defines)**
  — it is NOT always the same value across presets. This template defines
  its own plain Rocky Linux 9 VM named `rockyvm` in `config.yml` (it used
  the `base-image` preset until 2026-09-29, when that preset stopped being
  readable by our team's CLI - "graphql: Unauthorized"). Other presets: `bookworm-preset` names its host
  `bookworm`. `ks3-ready-for-cilium` (used by 331-Containers) names its
  host `host`. `instruqt track push` will fail with "references unknown
  host" if these don't match — confirmed by testing this template's first
  push (which failed against `bookworm-preset` until `hostname` was
  corrected).

## Things you MUST remove per new lab
- `track.yml` `description`'s **BEST PRACTICE** list (Ensure context
  defined / Outcome driven / Simplify tracks for maintenance / Tracks must
  be robust (Github) / Automate lab testing (track-test) / Clear feedback
  when checking (fail-message) / Provide student with a method for
  checking their work / Provide a method for exam testing / Right-size
  VM/container memory) is authoring guidance for whoever is building the
  lab, not learner-facing content — strip it out of the description once
  a real lab is built from this template.

## Things you MUST change per new lab
- `track.yml`: `slug`, `title`, `description` (`Lab Name:` + `Outcome:`),
  `tags`, the machines in `config.yml` (currently one generic plain Rocky
  Linux VM, `rockyvm` - a placeholder, not real infra for any product)
  plus the matching `hostname:` in every challenge's `tabs[]`, `timelimit`,
  `idle_timeout`.
- `assets/illumio-logo-splash.png` (splash logo) and `assets/logo.png` (track
  icon) — keep as-is (shared Illumio branding) unless the lab needs its own (the logo is the standard Illumio icon used
  across all tracks, e.g. 331-Containers).
- Challenge titles/slugs/bodies — replace every `[bracketed placeholder]`.

## Things you must NEVER hand-edit
- `id:` on the track or on any challenge/tab, and `checksum:` on the track.
  These fields are Instruqt-assigned. This template omits them entirely —
  Instruqt will populate them automatically the first time you run
  `instruqt track create` (or push). After that first push, never
  hand-edit them again.

## Learner UI note: Stop/Exit/Restart live on the Overview screen
The "Instruqt 101" video (see below) mentions Stop/Exit/Restart controls
that don't appear in the in-challenge toolbar (which only shows Overview,
Invite details, hand/chat icons, Progress, Hide Instructions, timer).
Verified via a real learner share-link session (2026-08-19): those controls
are NOT missing/outdated — they live on the track's **Overview** screen
(the landing page showing the challenge list and title/description), which
also has **Stop** and **Resume** buttons in its own toolbar. So the video
is still accurate, just describing a different screen than the in-challenge
view. No content changes needed because of this.

## Splash + video intro (challenge 01 only)
`01-getting-started` carries two `notes:` entries: a `type: text` note with
the splash, then a `type: video` entry pointing at Instruqt's own official
"Instruqt 101" interface walkthrough
(`https://www.youtube.com/embed/_QALLe3DJpk`). Instruqt renders the video
to the right of the splash on the pre-challenge slide; `type: video`
accepts a YouTube embed URL directly.

**Splash design (since 2026-10-01, copied from `! 26.x Lab`):** no
background picture. The note sits on the notes area's own colour
(`#141720`) with `assets/illumio-logo-splash.png` - the white Illumio logo
recoloured to `#141720` so it has no visible box, shown at `width: 444px`
(`max-width: 70%`) - followed by normal-flow HTML text: heading "Welcome
to your Illumio Training Lab", the four bullets, Illumio Training /
training@illumio.com, and the CTA "Click &rsaquo; for a short video on using
Instruqt". The old
overlay-on-`splashscreenblank.png` design (text absolutely positioned on a
branded background image) is kept in `assets/` only for a quick revert.

**Images in notes:** use an `<img src="../assets/...">` tag, NOT a CSS
`background-image: url(...)` - a relative `../assets/...` path resolves as
an `<img src>` but did NOT resolve inside CSS `url()` in a live test
(2026-08-19).

**Font**: Montserrat (400/700) via a Google Fonts `<link>` inside the
note's `contents:` - confirmed working live. Illumio's brand font ("FK
Grotesk") is licensed and can't be embedded; Montserrat was chosen as a
close, freely licensed match.

## Verification challenges (03 and 04) — two different purposes

- **`03-wrap-up-verification`, titled "Verification for the Student"**:
  the learner verifies and cleans up their own work manually (console
  checks + a verification command + a cleanup command) — no check
  script, matches the rest of this script-free template.
- **`04-verification-for-exam`, titled "Verification for Exam"**: a
  **worked example**, not real content — demonstrates Instruqt's
  `fail-message` helper and check-script gating, for exam-style tracks
  that need real automated grading (as opposed to this template's
  default, advisory-only style). Delete this whole challenge for any
  lab that doesn't need exam-style grading.

**Why `fail-message` matters, learned building the 26.x course
(2026-08-26/27)**: without it, Instruqt shows a learner a **generic**
"Not quite right, try again" banner on any check failure — it does
**not** surface anything your script `echo`/`print`s. The learner has
no idea why it failed. `fail-message "some text"` is the actual
mechanism that puts specific text in front of the learner — it writes
to stdout prefixed with `FAIL:`, but does **not** exit on its own (you
still need an explicit `exit 1`/non-zero after it). A real gotcha hit
live: don't also `echo` your own copy of the same failure text right
before calling `fail-message` — it already prints its own `FAIL: ...`
line, so doing both shows the learner the same message twice.

`check-<hostname>`/`solve-<hostname>` file naming must match the
challenge's own tab `hostname:` exactly (same rule as everywhere else
in Instruqt) — `04-verification-for-exam` uses `check-rockyvm`/
`solve-rockyvm` to match its `hostname: rockyvm` tab. A `solve-<hostname>`
script is required alongside any `check-<hostname>` script whenever
`skipping_enabled: true` is set at the track level (confirmed via
`instruqt track validate` erroring otherwise) — it should bring the
sandbox to the same end-state a learner completing the challenge
themselves would reach, so "Skip" still works correctly.

## House style (see any assignment.md for a live example)
- `# 🧩 Task 0N – Title` header immediately followed by a `==========` line.
- Numbered steps as `**N)** ...` (no space before the closing paren —
  updated 2026-08-26 to match the spacing used across the 26.x course
  build; the template previously used `**N )**` with a space).
- ` ```run ` fenced blocks = auto-runs in the Instruqt terminal.
  Plain ` ``` ` fences = reference-only, not executed.
- `> [!NOTE]` / `> [!IMPORTANT]` GitHub-style admonitions.
- Inline images: `![desc](../assets/file.png)`.
- Every challenge ends with `---` then `**Lab Complete**`; the final
  challenge in the track extends that to
  `**Lab Complete – This is the end of the lab and pressing NEXT will end the session**`.
