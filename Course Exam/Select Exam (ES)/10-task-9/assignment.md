---
slug: task-9
id: e97epezul2lz
type: challenge
title: 09-Ringfence Payment in LDN and Allow Inbound Access
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Ringfence la aplicacion `Payment` en `LDN`: crea una Policy llamada
`Task9-RingfencePayment` con una allow rule para que los workloads de
la aplicacion `Payment` (Location: `LDN`) puedan comunicarse
libremente entre si.

Luego anade una segunda allow rule a la misma Policy que permita
trafico entrante desde la aplicacion `Ordering` hacia `Payment`
(Location: `LDN`) para HTTPS, puerto TCP `443`, para que Ordering
pueda seguir alcanzando a Payment una vez que este ringfenced.
