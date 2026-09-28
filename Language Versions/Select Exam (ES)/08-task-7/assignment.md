---
slug: task-7
id: glwlslboclc9
type: challenge
title: 07-Ringfencing Using a Label Group
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea un Label Group llamado `dev-prod`.

El Label Group debe contener los siguientes labels de Environment:

- `Development`
- `Production`

Actualiza la Policy existente `Task6-RingfenceOrdering` para que use
el Label Group `dev-prod` en lugar del label individual de
Environment `Development`.

La politica resultante debe ringfence tanto la instancia de
Development como la de Production de la aplicacion `ordering` usando
la misma Policy.
