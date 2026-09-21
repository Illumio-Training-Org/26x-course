---
slug: task-5
id: azq1aqjf9wr9
type: challenge
title: 05-Deny Traffic for the Ordering Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
> [!NOTE]
> do we want info boxes here - i.e to suggest looking at the map

Use the Map to inspect traffic flowing between Development and
Production in the `ca` location.

Create a Policy named `Task5-DenyDevProd` with a deny rule for All
Services: from Application: `ordering`, Environment: `Development`,
Location: `ca`, to Application: `ordering`, Environment: `Production`,
Location: `ca`.

Check the Map again to ensure the policy has worked.
