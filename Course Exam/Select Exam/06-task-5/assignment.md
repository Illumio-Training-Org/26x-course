---
slug: task-5
id: azq1aqjf9wr9
type: challenge
title: 05-Deny Traffic Between Development and Production for the Ordering Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a Policy named `Task5-DenyDevProd` with a deny rule for All
Services: from Application: `ordering`, Environment: `Development`,
Location: `ca`, to Application: `ordering`, Environment: `Production`,
Location: `ca`.

Use the Map to filter this specific traffic and verify the flow lines
change colour.
