---
slug: magic-link
id: lojirpslefq0
type: challenge
title: 26.x Select Exam (ES)
teaser: Accede a la Consola de Illumio
notes:
- type: text
  contents: |-
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
      .splash-wrap { font-family: 'Montserrat', sans-serif; color: #d4d4d4; background: #141720; padding: 3% 4% 4% 4%; box-sizing: border-box; width: min(90vw, 1300px); position: relative; left: 50%; transform: translateX(-50%); }
      .splash-logo { width: 444px; max-width: 70%; height: auto; display: block; margin: 0 0 2.2em; }
      .splash-wrap h1 { font-family: 'Montserrat', sans-serif; font-size: 1.6em; font-weight: 700; line-height: 1.25; margin: 0 0 0.8em; white-space: nowrap; }
      .splash-wrap p { margin: 0 0 0.4em; font-size: 1em; }
      .splash-wrap ul { margin: 0 0 1.2em; padding: 0; list-style: none; }
      .splash-wrap li { margin: 0 0 0.35em; font-size: 0.8em; white-space: nowrap; }
      .splash-wrap li::before { content: "- "; }
      .splash-contact { margin: 0 0 1.4em; font-size: 1em; line-height: 1.5; }
      .splash-cta { font-size: 1em; font-weight: 700; }
      .splash-time { font-size: 1.1em; font-weight: 700; margin: -0.4em 0 1.2em; }
    </style>
    <div class="splash-wrap">
      <img class="splash-logo" src="../assets/illumio-logo-splash.png" alt="Illumio" />
      <h1>Bienvenido a tu examen Select</h1>
      <div class="splash-time">Tiempo disponible: 2 horas 30 minutos</div>
      <p>Esta es tu oportunidad para:</p>
      <ul>
        <li>Demostrar tus habilidades de Zero Trust Segmentation</li>
        <li>Cada tarea plantea un reto que debes completar</li>
        <li>Completar 10 tareas prácticas, cada una calificada automáticamente</li>
      </ul>
      <div class="splash-contact">
        Illumio Training<br>
        training@illumio.com
      </div>
      <div class="splash-cta">Haz clic en &rsaquo; para ver un breve vídeo sobre cómo usar Instruqt</div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: ih5c7boxboop
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: swq5fcbmnrph
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
![Illumio](../assets/illumio-logo-banner.png)

> [!IMPORTANT]
> Tienes un máximo de **2 horas 30 minutos** para completar el examen.

**Ten en cuenta:**
- **La primera tarea (emparejar los workloads) debe completarse y no se puede omitir.**
- Cualquier otra tarea se puede omitir, pero omitirla cuenta en contra de tu puntuación. Para aprobar necesitas una puntuación de al menos **80%** (8 de 10 respuestas correctas).
- No es necesario provisionar ninguna de las reglas ni de los objetos de este examen.
- Todas las políticas predeterminadas que ya existen en esta organización se deshabilitan automáticamente antes de empezar: solo están activas las políticas que crees como parte de las tareas del examen. No necesitas hacer nada con ellas.
- Asegúrate de que el nombre de cada Policy que crees sea correcto y no contenga espacios adicionales.
- Los nombres de los objetos (labels, Policies, Services, etc.) y de los menús de la Consola se mantienen en inglés. Escríbelos exactamente como aparecen en cada tarea.

**1 )** Abre el siguiente enlace en una nueva pestaña del navegador

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

O haz clic aquí: [Abrir la Consola de Illumio]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Comprueba que el panel (dashboard) de la Consola de Illumio es visible

**3 )** Cuando hayas iniciado sesión en la Consola, vuelve a esta ventana del laboratorio y pulsa **NEXT** para empezar. ¡Buena suerte!

---

Avanzado
===

> [!WARNING]
> Opciones avanzadas. Normalmente se usan para solucionar problemas:

Para mostrar las credenciales de la PCE y de la Cloud API de esta cuenta,
ejecuta lo siguiente en la pestaña **cloud console**:

```run
echo "PCE_FQDN=$AUTOACCOUNT_PCE_FQDN"
echo "ORG_ID=$AUTOACCOUNT_ORG_ID"
echo "APIKEY_ID=$AUTOACCOUNT_APIKEY_ID"
echo "APIKEY_SECRET=$AUTOACCOUNT_APIKEY_SECRET"
echo "SAKEYID=$AUTOACCOUNT_SAAPIKEY_KEYID"
echo "SASECRET=$AUTOACCOUNT_SAAPIKEY_SECRET"
echo "TENANT=$AUTOACCOUNT_TENANT_ID"
```

Para comprobar que la REST API de la PCE funciona (HTTP 200 = correcto):

```run
curl -s -o /dev/null -w "PCE API: HTTP %{http_code}\n" -u "api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}" "https://${AUTOACCOUNT_PCE_FQDN}/api/v2/orgs/${AUTOACCOUNT_ORG_ID}/workloads?max_results=1"
```

Para comprobar que la API de CloudSecure funciona (HTTP 200 = correcto):

```run
curl -s -o /dev/null -w "Cloud API: HTTP %{http_code}\n" -u "${AUTOACCOUNT_SAAPIKEY_KEYID}:${AUTOACCOUNT_SAAPIKEY_SECRET}" -H "X-Tenant-Id: ${AUTOACCOUNT_TENANT_ID}" "https://cloud.illum.io/api/v1/integrations"
```
