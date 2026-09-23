---
slug: task-5
id: dmztmmbhzeny
type: challenge
title: 05-Environment Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Usa el Map para inspeccionar las comunicaciones entre los entornos
Development y Production para la aplicacion `ordering` en la
ubicacion `ca`.

Crea una Policy llamada `Task5-DenyDevProd`.

Configura una deny rule para **All Services** con:

Origen:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

Destino:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Usa el Map para verificar el efecto de la politica.
