# Known issues — ! 26.x Lab Crystal Test

Track-specific issues found while building/testing the Project Crystal
integration, separate from the general build history in git log.

## Traffic flows slow to appear in the PCE's Traffic Explorer / Map

**Status:** open, timing not yet confirmed.

Objects (labels, workloads, rulesets, etc.) and Crystal's own
flows/tick counter populate quickly after a deployment starts, but the
same flow data does not immediately become queryable in the PCE's
Explore → Traffic / Map views. Confirmed via direct `Traffic Explorer`
query in the Console (clicked "Run", got "No Traffic available for
selected filters") well after Crystal's own dashboard already showed
hundreds of flows/tick generated.

- Deployment start time (org 4140033): `2026-09-22T08:23:45Z`
- **Confirmed visible** in the Console's Traffic Explorer (685 total
  flows), earliest "First Detected" timestamp shown: `22/09/2026,
  09:32:28`.
- **Time to appear: ~69 minutes** from the original deployment's start
  time, **or ~32-34 minutes** if attributed instead to two later test
  deployments created against the same org (~08:58-09:00) while
  investigating an unrelated issue - see caveat below. Not possible to
  cleanly attribute which deployment's traffic this actually is, since
  more than one was running against the same PCE org by the time
  flows became visible.
- For comparison, vensim's own historical baseline (see
  `26x_vensim_traffic_generation` project notes) was **14-23 minutes**
  typically, with one outlier case taking **~90 minutes**. Crystal's
  observed range here (32-69 min depending on attribution) falls
  within that same broad envelope - not clearly faster or slower,
  more data points needed for a real comparison.

Also saw a `503 Waiting for cache initialization` on the very first
poll attempt (~immediately after deployment start), which cleared on
the next poll ~1 minute later — likely just the PCE's flow-summary
cache spinning up for a brand-new org, not specific to Crystal.

**Note added after investigating the deployment's early stop (see next
section below):** the original deployment was killed at `08:47:05`,
~23 minutes after it started, by an unrelated cause (see below) - not
a normal full-length session. So the "~69 minutes" figure above is
against a deployment that itself only ran for 23 of those minutes,
which muddies the comparison to vensim's baseline further. A clean,
uninterrupted timing run (no CLI tests started against the same track
while it's live) is still needed for a trustworthy number.

## Running `instruqt track test` can end an existing live session on
the same track

**Status:** identified root cause, not a Crystal/lab bug - a testing
hygiene issue.

While investigating why a real live session (participant `alxnvy5q6fek`,
org 4140033) ended after only ~23 minutes despite `idle_timeout` and
`timelimit` both being set to 6 hours (21600s), found this in the
Instruqt track logs:

```
08:46:56 dyz2bqddv32u INFO: Setting up environment           <- a `instruqt track test` run starting
08:47:04 alxnvy5q6fek INFO: executing track lifecycle script <- the live session's cleanup starting
08:47:05 alxnvy5q6fek INFO: Starting script: cleanup-cloud-client
```

8 seconds apart. Starting a new `instruqt track test` run against a
track slug that already has an active real participant session
appears to cause Instruqt to end that existing session (cleanly - it
ran `cleanup-cloud-client` as a normal `action: cleanup`, not an
error/crash). Not confirmed whether this is documented/intended
platform behavior or a genuine Instruqt bug - worth asking Instruqt
support if it recurs or matters for other tracks.

**How to apply:** don't run `instruqt track test` against a track
slug while a real/important session is live on it. This was purely a
side effect of active development/testing colliding with a real
session - the lab itself should be unaffected by this once testing is
done.
