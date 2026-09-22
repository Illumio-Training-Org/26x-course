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
- Time to appear: **pending** — being polled directly against the PCE
  `traffic_flows/async_queries` API; will update this entry once flows
  are actually found (or note a timeout if they never appear).
- For comparison, vensim's own historical baseline (see
  `26x_vensim_traffic_generation` project notes) was **14-23 minutes**
  typically, with one outlier case taking **~90 minutes**.

Also saw a `503 Waiting for cache initialization` on the very first
poll attempt (~immediately after deployment start), which cleared on
the next poll ~1 minute later — likely just the PCE's flow-summary
cache spinning up for a brand-new org, not specific to Crystal.
