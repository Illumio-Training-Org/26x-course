---
slug: magic-link
id: 5dcv27qvxfq2
type: challenge
title: 26.x Select Exam (PT-BR/EN)
teaser: Acesse o Console da Illumio / Access the Illumio Console
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
      <h1>Bem-vindo ao seu exame Select</h1>
      <div class="splash-time">Tempo disponível: 2 horas e 30 minutos</div>
      <p>Esta é sua oportunidade para:</p>
      <ul>
        <li>Demonstrar suas habilidades de Zero Trust Segmentation</li>
        <li>Cada tarefa apresenta um desafio a ser concluído</li>
        <li>Concluir 10 tarefas práticas, cada uma corrigida automaticamente</li>
      </ul>
      <div class="splash-contact">
        Illumio Training<br>
        training@illumio.com
      </div>
      <div class="splash-cta">Clique em &rsaquo; para ver um vídeo curto sobre como usar o Instruqt</div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: 72w66y9lxxnc
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: g0v9irffkfft
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
![Illumio](../assets/illumio-logo-banner.png)

> [!IMPORTANT]
> Você tem no máximo **2 horas e 30 minutos** para concluir o exame.

**Atenção:**
- **A primeira tarefa (parear os workloads) deve ser concluída e não pode ser pulada.**
- Qualquer outra tarefa pode ser pulada, mas pular conta contra a sua pontuação. Para ser aprovado, você precisa de uma pontuação de pelo menos **80%** (8 de 10 respostas corretas).
- Não é necessário provisionar nenhuma das regras ou objetos deste exame.
- Todas as políticas padrão que já existem nesta organização são desativadas automaticamente antes de você começar: somente as políticas que você criar como parte das tarefas do exame ficam ativas. Você não precisa fazer nada com elas.
- Certifique-se de que o nome de cada Policy que você criar esteja correto e não contenha espaços extras.
- Os nomes dos objetos (labels, Policies, Services etc.) e dos menus do Console permanecem em inglês. Digite-os exatamente como aparecem em cada tarefa.

**1 )** Abra o link a seguir em uma nova aba do navegador

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Ou clique aqui: [Abrir o Console da Illumio]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Verifique se o painel (dashboard) do Console da Illumio está visível

**3 )** Depois de entrar no Console, volte para esta janela do laboratório e clique em **NEXT** para começar. Boa sorte!

---

🇬🇧 **English**

> [!IMPORTANT]
> You have a maximum of **2 hours 30 minutes** to complete the exam.

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

---

Avançado
===

> [!WARNING]
> Opções avançadas. Normalmente usadas para solução de problemas:

Para exibir as credenciais da PCE e da Cloud API desta conta, execute o seguinte na aba **cloud console**:

```run
echo "PCE_FQDN=$AUTOACCOUNT_PCE_FQDN"
echo "ORG_ID=$AUTOACCOUNT_ORG_ID"
echo "APIKEY_ID=$AUTOACCOUNT_APIKEY_ID"
echo "APIKEY_SECRET=$AUTOACCOUNT_APIKEY_SECRET"
echo "SAKEYID=$AUTOACCOUNT_SAAPIKEY_KEYID"
echo "SASECRET=$AUTOACCOUNT_SAAPIKEY_SECRET"
echo "TENANT=$AUTOACCOUNT_TENANT_ID"
```

Para verificar se a REST API da PCE está funcionando (HTTP 200 = OK):

```run
curl -s -o /dev/null -w "PCE API: HTTP %{http_code}\n" -u "api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}" "https://${AUTOACCOUNT_PCE_FQDN}/api/v2/orgs/${AUTOACCOUNT_ORG_ID}/workloads?max_results=1"
```

Para verificar se a API do CloudSecure está funcionando (HTTP 200 = OK):

```run
curl -s -o /dev/null -w "Cloud API: HTTP %{http_code}\n" -u "${AUTOACCOUNT_SAAPIKEY_KEYID}:${AUTOACCOUNT_SAAPIKEY_SECRET}" -H "X-Tenant-Id: ${AUTOACCOUNT_TENANT_ID}" "https://cloud.illum.io/api/v1/integrations"
```

Advanced (English)
===

> [!WARNING]
> Advanced options below. Typically used in troubleshooting:

To show the PCE and Cloud API credentials for this account, run the
following in the **cloud console** tab:

```run
echo "PCE_FQDN=$AUTOACCOUNT_PCE_FQDN"
echo "ORG_ID=$AUTOACCOUNT_ORG_ID"
echo "APIKEY_ID=$AUTOACCOUNT_APIKEY_ID"
echo "APIKEY_SECRET=$AUTOACCOUNT_APIKEY_SECRET"
echo "SAKEYID=$AUTOACCOUNT_SAAPIKEY_KEYID"
echo "SASECRET=$AUTOACCOUNT_SAAPIKEY_SECRET"
echo "TENANT=$AUTOACCOUNT_TENANT_ID"
```

To check the PCE REST API is up (HTTP 200 = healthy):

```run
curl -s -o /dev/null -w "PCE API: HTTP %{http_code}\n" -u "api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}" "https://${AUTOACCOUNT_PCE_FQDN}/api/v2/orgs/${AUTOACCOUNT_ORG_ID}/workloads?max_results=1"
```

To check the CloudSecure API is up (HTTP 200 = healthy):

```run
curl -s -o /dev/null -w "Cloud API: HTTP %{http_code}\n" -u "${AUTOACCOUNT_SAAPIKEY_KEYID}:${AUTOACCOUNT_SAAPIKEY_SECRET}" -H "X-Tenant-Id: ${AUTOACCOUNT_TENANT_ID}" "https://cloud.illum.io/api/v1/integrations"
```
