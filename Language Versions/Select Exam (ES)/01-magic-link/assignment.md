---
slug: magic-link
id: hjxobnhuc6xj
type: challenge
title: 26.x Select Exam (ES)
teaser: Accede a la Consola de Illumio
notes:
- type: text
  contents: |-
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
      .splash-wrap { position: relative; font-family: 'Montserrat', sans-serif; }
      .splash-img { width: 100%; display: block; }
      .splash-overlay { position: absolute; top: 0; left: 0; width: 66%; height: 100%; box-sizing: border-box; padding: 18% 4% 4% 7.2%; color: #fff; display: flex; flex-direction: column; justify-content: flex-start; }
      .splash-overlay h1 { font-size: 1.25em; font-weight: 700; line-height: 1.25; margin: 0 0 0.5em; white-space: nowrap; }
      .splash-overlay p { margin: 0 0 0.3em; font-size: 0.78em; }
      .splash-overlay ul { margin: 0 0 0.6em; padding: 0; list-style: none; }
      .splash-overlay li { margin: 0 0 0.25em; font-size: 0.78em; white-space: nowrap; }
      .splash-overlay li::before { content: "- "; }
      .splash-contact { margin-top: 0.5em; font-size: 0.78em; }
      .splash-cta { margin-top: 1em; font-size: 0.78em; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,.5); }
    </style>
    <div class="splash-wrap">
      <img class="splash-img" src="../assets/splashscreenblank.png" alt="Illumio training splash background" />
      <div class="splash-overlay">
        <h1>Bienvenido a tu Select Exam</h1>
        <p>Esta es tu oportunidad para:</p>
        <ul>
          <li>Demostrar tus habilidades de Segmentacion Zero Trust</li>
          <li>Completar 10 tareas practicas, cada una calificada automaticamente</li>
          <li>Trabajar de forma independiente — sin instrucciones paso a paso</li>
        </ul>
        <div class="splash-contact">
          Illumio Training<br>
          training@illumio.com
        </div>
        <div class="splash-cta">Haz clic en el &rsaquo; en el lado derecho de la pantalla para ver un video introductorio sobre como usar Instruqt</div>
      </div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: de7xmi9yzqhy
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: qs4rcnt2kghs
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Bienvenido a tu **26.x Select Exam**.

> [!IMPORTANT]
> Este examen dura **150 minutos (2 horas 30)**.

**Ten en cuenta:**
- **La primera tarea (emparejar los workloads) debe completarse y no se puede omitir.**
- Cualquier otra tarea se puede omitir, pero omitirla cuenta en contra de tu puntuacion. Para aprobar, necesitas una puntuacion de al menos **80%** (8 de 10 respuestas correctas).
- No es necesario provisionar ninguna de las reglas u objetos en este examen.
- Todas las politicas predeterminadas ya existentes en esta organizacion se deshabilitan automaticamente antes de empezar - solo las politicas que crees como parte de las tareas del examen estan activas. No necesitas hacer nada al respecto.
- Asegurate de que el nombre de cualquier Policy que crees sea correcto y no tenga espacios adicionales en su nombre.

**1 )** Abre el siguiente enlace en una nueva pestana del navegador

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

O haz clic aqui: [Abrir la Consola de Illumio]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Verifica que el panel de la Consola de Illumio sea visible

**3 )** Una vez que hayas iniciado sesion en la Consola, regresa a esta ventana del laboratorio y pulsa **NEXT** para comenzar. ¡Buena suerte!

---

Avanzado
===

> [!WARNING]
> Opciones avanzadas a continuacion. Normalmente usadas para solucionar problemas:

Para mostrar las credenciales de la PCE y de la API Cloud de esta cuenta, ejecuta lo siguiente en la pestana **cloud console**:

```run
echo "PCE_FQDN=$AUTOACCOUNT_PCE_FQDN"
echo "ORG_ID=$AUTOACCOUNT_ORG_ID"
echo "APIKEY_ID=$AUTOACCOUNT_APIKEY_ID"
echo "APIKEY_SECRET=$AUTOACCOUNT_APIKEY_SECRET"
echo "SAKEYID=$AUTOACCOUNT_SAAPIKEY_KEYID"
echo "SASECRET=$AUTOACCOUNT_SAAPIKEY_SECRET"
echo "TENANT=$AUTOACCOUNT_TENANT_ID"
```

Para comprobar que la API REST de la PCE esta activa (HTTP 200 = saludable):

```run
curl -s -o /dev/null -w "PCE API: HTTP %{http_code}\n" -u "api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}" "https://${AUTOACCOUNT_PCE_FQDN}/api/v2/orgs/${AUTOACCOUNT_ORG_ID}/workloads?max_results=1"
```

Para comprobar que la API de CloudSecure esta activa (HTTP 200 = saludable):

```run
curl -s -o /dev/null -w "Cloud API: HTTP %{http_code}\n" -u "${AUTOACCOUNT_SAAPIKEY_KEYID}:${AUTOACCOUNT_SAAPIKEY_SECRET}" -H "X-Tenant-Id: ${AUTOACCOUNT_TENANT_ID}" "https://cloud.illum.io/api/v1/integrations"
```
