# Select Exam Check Key - `! 26.x Withdrawn: Select Exam Check Key 06/11`

**Withdrawn 2026-11-06.** I replaced it with `! 26.x Select Exam`, which now uses
the service-account method (same as `! 26.x Lab` and the other exams). Slug
(`26x-select-exam-check-key`) and track ID are unchanged. Kept frozen as a
backup and reference only.


A test copy of `! 26.x Select Exam`, created 2026-10-18 to test a workaround
for the mid-lab PCE API 401s. The only change is in
`track_scripts/setup-cloud-client`: right after the agent variables, setup
uses the magic-link key to create a second PCE API key named
`check-scripts` (`GET /users/login`, then `POST <user>/api_keys`) and
appends it to `/root/.autoaccount_env` as an override of
`AUTOACCOUNT_APIKEY_ID`/`_SECRET`. Every challenge check/solve script
sources that file, so they all use the new key with no script edits;
setup itself (Crystal etc.) and the learner's terminal keep the magic-link
key. Also saved to `/root/.pce-check-key`, and a `check-api-keys` command
tests both keys side by side. If key creation fails, nothing is appended
and the scripts use the magic-link key as before.

