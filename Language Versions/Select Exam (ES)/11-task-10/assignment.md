---
slug: task-10
id: 7gxkltesnxmv
type: challenge
title: 10-Cloud Application Onboarding
tabs:
- id: synz2wdb534k
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
difficulty: ""
timelimit: 0
enhanced_loading: null
---
La cuenta de AWS en la region `us-east-1` ya ha sido incorporada a
Illumio Cloud.

Crea una **Application Discovery Rule** que identifique e incorpore la
aplicacion que se ejecuta dentro de la cuenta de AWS.

Configura la regla para:

- Usar **Cloud Tags**
- Coincidir con la clave de tag: `app`
- Habilitar **Auto Approve**

Verifica que la aplicacion detectada se haya incorporado
correctamente.
