---
slug: task-9
id: e97epezul2lz
type: challenge
title: 09-Payment Application Ringfencing and Dependency
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea una Policy llamada `Task9-RingfencePayment`.

Ringfence la aplicacion `Payment` en `LDN` creando una allow rule que
permita a los workloads que coincidan con:

- Application: `Payment`
- Location: `LDN`

Dentro de la misma Policy, crea una segunda allow rule que permita
comunicacion entrante desde la aplicacion `Ordering` hacia la
aplicacion `Payment` en `LDN`, para que Ordering pueda seguir
alcanzando a Payment una vez que este ringfenced.

La segunda regla debe permitir:

- Origen: la aplicacion `Ordering`
- Destino: la aplicacion `Payment`, Location: `LDN`
- Service: **HTTPS**, puerto **TCP** `443`
