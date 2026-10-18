---
slug: magic-link
id: uu5jmytaywyg
type: challenge
title: 26.x Foundation Exam (ES/EN)
teaser: Accede a la Consola de Illumio / Access the Illumio Console
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
      <h1>Bienvenido a tu examen Foundation</h1>
      <div class="splash-time">Tiempo disponible: 1 hora 15 minutos</div>
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
- id: jt6a8nz5wekl
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: yyp45mv87mjd
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
![Illumio](../assets/illumio-logo-banner.png)

> [!IMPORTANT]
> Tienes un máximo de **1 hora 15 minutos** para completar el examen.

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

🇬🇧 **English**

> [!IMPORTANT]
> You have a maximum of **1 hour 15 minutes** to complete the exam.

**Please note:**
- **The first task (pairing the workloads) must be completed and cannot be skipped.**
- Any other task can be skipped, but skipping counts against your score. To pass, you need a score of at least **80%** (8 out of 10 correct answers).
- There is no requirement to provision any of the rules or objects in this exam.
- All pre-existing default policies in this org are automatically disabled before you start - only policies you create as part of the exam's tasks are active. You don't need to do anything about them.
- Please ensure that the name of any Policies that you create are correct and there are no additional spaces in their names.

**1 )** Open the following link in a new browser tab

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Or click here: [Open the Illumio Console]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Verify the Illumio Console dashboard is visible

**3 )** Once you're logged into the Console, return to this lab window and press **NEXT** to begin. Good luck!
