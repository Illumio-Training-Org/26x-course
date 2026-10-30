---
slug: task-4
type: challenge
title: 04-Einfache Deny-Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Aufgabe
==========

Erstellen Sie eine Policy ohne Scope (scopeless) mit dem Namen
`Task4-DenyPolicy`.

Erstellen Sie in dieser Policy eine Regel, die **SSH**-Traffic von
allen Workloads zu Workloads mit den folgenden Labels verweigert:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Dies sind dieselben Labels, die Sie `linux-vm` in Aufgabe 2
zugewiesen haben. Die Regel muss als normales **Deny** konfiguriert
werden und darf **kein** **Override Deny** verwenden.

> [!NOTE]
> Belassen Sie `Task4-DenyPolicy` im Status **Draft**. Provisionieren
> Sie die Policy nicht.

> [!NOTE]
> Sie können den integrierten Service **SSH** verwenden. Wenn Sie
> stattdessen Port 22 manuell definieren, muss er sowohl für **TCP**
> als auch für **UDP** konfiguriert werden.

🔑 Von der Console abgemeldet?
==========

Nur erforderlich, wenn die Illumio Console Sie abgemeldet hat (das geschieht nach 10-15 Minuten Inaktivität). Wenn Sie noch angemeldet sind, ignorieren Sie diesen Hinweis und arbeiten Sie im geöffneten Console-Tab weiter.

**[Hier klicken, um sich erneut anzumelden]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - Ihre Arbeit bleibt erhalten.

Falls sich der Link nicht öffnet, kopieren Sie dies in einen neuen Browser-Tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
