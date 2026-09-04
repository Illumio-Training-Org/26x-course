---
slug: task-8
id: xcsdwb5xkzcv
type: challenge
title: 08-Deny Dev to Prod for Ordering Globally
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a ruleset named `Task8-DenyGlobal` with a deny rule blocking
all communication one way, from Development to Production only, for
the `ordering` application, with no Location restriction.

Then add an exception: an Allow Rule permitting SSH one way, from
Development to Production, for `ordering`.
