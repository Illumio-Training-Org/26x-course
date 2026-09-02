---
slug: task-8
id: chzwbpic6mrr
type: challenge
title: 08-Extend the Ringfence to Cover Both Instances
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a Label Group named `dev-prod` containing the Environment labels
`Development` and `Production`. Update `Task7-RingfenceOrdering`'s
scope to use this Label Group instead of just Development, so both the
Dev and Prod instances of the `ordering` application are ringfenced by
the same policy.
