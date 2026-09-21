---
slug: task-3
id: edhxtqw8bnz4
type: challenge
title: 03-Create a Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea una Policy llamada `Task3-CoreServices` con una allow rule desde
Role: `nagios` hacia la aplicacion `portal` (Application: `portal`,
Environment: `Production`, Location: `ca`) para el servicio Nagios
NRPE, puerto TCP `5666`, para que el trafico de monitorizacion no sea
denegado una vez que la aplicacion este ringfenced.

Usa el Map para encontrar la instancia correcta de Nagios en
California y confirma sus labels antes de construir la regla. El lado
de origen de la regla debe incluir Location, Environment, Application
y Role.
