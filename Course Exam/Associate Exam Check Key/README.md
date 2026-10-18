# Associate Exam Check Key — `! 26.x Associate Exam Check Key`

A test copy of `! 26.x Associate Exam`, created 2026-10-18 to test a workaround
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

