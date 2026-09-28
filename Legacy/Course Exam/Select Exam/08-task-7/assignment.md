---
slug: task-7
id: chzwbpic6mrr
type: challenge
title: 07-Ringfencing Using a Label Group
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a Label Group named `dev-prod`.

The Label Group must contain the following Environment labels:

- `Development`
- `Production`

Update the existing `Task6-RingfenceOrdering` Policy to use the
`dev-prod` Label Group in place of the individual `Development`
Environment label.

The resulting policy must ringfence both the Development and
Production instances of the `ordering` application using the same
Policy.
