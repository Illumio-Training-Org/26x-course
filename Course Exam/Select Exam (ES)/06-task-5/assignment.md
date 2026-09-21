---
slug: task-5
id: dmztmmbhzeny
type: challenge
title: 05-Deny Traffic Between Development and Production for the Ordering Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
> [!NOTE]
> do we want info boxes here - i.e to suggest looking at the map

Usa el Map para inspeccionar el trafico que fluye entre Development y
Production en la ubicacion `ca`.

Crea una Policy llamada `Task5-DenyDevProd` con una deny rule para All
Services: desde Application: `ordering`, Environment: `Development`,
Location: `ca`, hacia Application: `ordering`, Environment:
`Production`, Location: `ca`.

Vuelve a comprobar el Map para asegurarte de que la politica ha
funcionado.
