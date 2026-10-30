---
slug: magic-link
type: challenge
title: 26.x Foundation Exam (DE)
teaser: Zugriff auf die Illumio Console
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
      <h1>Willkommen zu Ihrer Foundation-Prüfung</h1>
      <div class="splash-time">Verfügbare Zeit: 1 Stunde 15 Minuten</div>
      <p>Hier haben Sie die Gelegenheit:</p>
      <ul>
        <li>Ihre Kenntnisse in Zero Trust Segmentation zu zeigen</li>
        <li>Jede Aufgabe stellt eine Herausforderung dar</li>
        <li>10 praktische Aufgaben zu lösen, jede automatisch bewertet</li>
      </ul>
      <div class="splash-contact">
        Illumio Training<br>
        training@illumio.com
      </div>
      <div class="splash-cta">Klicken Sie auf &rsaquo; für ein kurzes Video zur Nutzung von Instruqt</div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: wcczym0kmann
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: 4oinq1e62nqj
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
![Illumio](../assets/illumio-logo-banner.png)

> [!IMPORTANT]
> Sie haben maximal **1 Stunde 15 Minuten** Zeit, um die Prüfung abzuschließen.

**Bitte beachten Sie:**
- **Die erste Aufgabe (Pairing der Workloads) muss abgeschlossen werden und kann nicht übersprungen werden.**
- Alle anderen Aufgaben können übersprungen werden, das Überspringen wirkt sich jedoch negativ auf Ihre Punktzahl aus. Zum Bestehen benötigen Sie mindestens **80 %** (8 von 10 richtigen Antworten).
- Sie müssen keine der Regeln oder Objekte in dieser Prüfung provisionieren.
- Alle bereits vorhandenen Standard-Policies in dieser Organisation werden vor Beginn automatisch deaktiviert: Aktiv sind nur die Policies, die Sie im Rahmen der Prüfungsaufgaben erstellen. Sie müssen dafür nichts tun.
- Achten Sie darauf, dass die Namen aller von Ihnen erstellten Policies korrekt sind und keine zusätzlichen Leerzeichen enthalten.
- Objektnamen (Labels, Policies, Services usw.) und die Menüs der Console bleiben auf Englisch. Geben Sie sie genau so ein, wie sie in der jeweiligen Aufgabe stehen.

**1 )** Öffnen Sie den folgenden Link in einem neuen Browser-Tab

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Oder klicken Sie hier: [Illumio Console öffnen]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Prüfen Sie, ob das Dashboard der Illumio Console angezeigt wird

**3 )** Sobald Sie in der Console angemeldet sind, kehren Sie zu diesem Lab-Fenster zurück und klicken Sie auf **NEXT**, um zu beginnen. Viel Erfolg!
