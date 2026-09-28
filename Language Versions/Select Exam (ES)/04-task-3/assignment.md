---
slug: task-3
id: edhxtqw8bnz4
type: challenge
title: 03-Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea una Policy independiente llamada `Task3-CoreServices`.

Configura una allow rule que permita a la aplicacion de monitorizacion
Nagios comunicarse con la aplicacion `portal` usando **Nagios NRPE**,
puerto **TCP** `5666`, para que el trafico de monitorizacion no sea
denegado una vez que la aplicacion este ringfenced.

Usa el Map para identificar la instancia de Nagios en California y
confirma sus labels antes de crear la regla.

El origen debe definirse usando sus labels de Location, Environment,
Application y Role, incluyendo:

- Role: `nagios`

El destino debe incluir:

- Application: `portal`
- Environment: `Production`
- Location: `ca`

La regla debe permitir el puerto **TCP** `5666` o el servicio
**Nagios NRPE**.
