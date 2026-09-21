---
slug: task-7
id: glwlslboclc9
type: challenge
title: 07-Extend the Ringfence to Cover Both Instances
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea un Label Group llamado `dev-prod` que contenga los labels de
Environment `Development` y `Production`. Actualiza
`Task6-RingfenceOrdering` para que use este Label Group en lugar de
solo Development, de forma que tanto la instancia de Dev como la de
Prod de la aplicacion `ordering` queden ringfenced por la misma
politica.
