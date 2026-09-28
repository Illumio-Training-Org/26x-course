---
slug: task-8
id: 1hcfaskfiogq
type: challenge
title: 08-Global Development and Production Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea una Policy llamada `Task8-DenyGlobal`.

Configura una deny rule **global** y **de un solo sentido** que
impida la comunicacion de Development a Production para la aplicacion
`ordering`.

Origen:

- Application: `ordering`
- Environment: `Development`

Destino:

- Application: `ordering`
- Environment: `Production`

La regla debe:

- Denegar **All Services**
- Aplicarse **globalmente**

Dentro de la misma Policy, crea una excepcion que permita trafico
**SSH** de Development a Production para la aplicacion `ordering`.

La excepcion de **SSH** tambien debe ser **de un solo sentido**, de
Development a Production, y no debe tener restriccion de Location.
