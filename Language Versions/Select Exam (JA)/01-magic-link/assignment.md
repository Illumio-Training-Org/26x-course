---
slug: magic-link
id: bq8fpthj2euy
type: challenge
title: 26.x Select Exam (JA)
teaser: Illumio Consoleにアクセスする
notes:
- type: text
  contents: |-
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
      .splash-wrap { position: relative; font-family: 'Montserrat', sans-serif; }
      .splash-img { width: 100%; display: block; }
      .splash-overlay { position: absolute; top: 0; left: 0; width: 66%; height: 100%; box-sizing: border-box; padding: 18% 4% 4% 7.2%; color: #fff; display: flex; flex-direction: column; justify-content: flex-start; }
      .splash-overlay h1 { font-size: 1.15em; font-weight: 700; line-height: 1.4; margin: 0 0 0.5em; white-space: normal; }
      .splash-overlay p { margin: 0 0 0.3em; font-size: 0.78em; }
      .splash-overlay ul { margin: 0 0 0.6em; padding: 0; list-style: none; }
      .splash-overlay li { margin: 0 0 0.25em; font-size: 0.78em; white-space: normal; }
      .splash-overlay li::before { content: "- "; }
      .splash-contact { margin-top: 0.5em; font-size: 0.78em; }
      .splash-cta { margin-top: 1em; font-size: 0.78em; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,.5); }
    </style>
    <div class="splash-wrap">
      <img class="splash-img" src="../assets/splashscreenblank.png" alt="Illumio training splash background" />
      <div class="splash-overlay">
        <h1>Select Examへようこそ</h1>
        <p>これはあなたにとって次のような機会です:</p>
        <ul>
          <li>Zero Trust Segmentationのスキルを実証する</li>
          <li>自動採点される10の実践課題を完了する</li>
          <li>自分の力で取り組む — 手順書はありません</li>
        </ul>
        <div class="splash-contact">
          Illumio Training<br>
          training@illumio.com
        </div>
        <div class="splash-cta">画面右側の &rsaquo; をクリックすると、Instruqtの使い方を紹介する動画が表示されます</div>
      </div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: rppzqngmxm3m
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: eww7k9kxstv6
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
**26.x Select Exam** へようこそ。

> [!IMPORTANT]
> この試験の制限時間は **150分(2時間30分)** です。

**注意事項:**
- **最初の課題(ワークロードのペアリング)は必ず完了する必要があり、スキップできません。**
- それ以外の課題はスキップできますが、スキップするとスコアに影響します。合格するには、少なくとも **80%**(10問中8問正解)のスコアが必要です。
- この試験では、ルールやオブジェクトをプロビジョニングする必要はありません。
- この組織に既存のデフォルトポリシーは開始前にすべて自動的に無効化されます - 試験の課題として作成したポリシーのみが有効になります。これについて特に対応する必要はありません。
- 作成するPolicyの名前が正しく、余分なスペースが含まれていないことを確認してください。

**1)** 以下のリンクを新しいブラウザタブで開いてください

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

またはこちらをクリック: [Illumio Consoleを開く]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2)** Illumio Consoleのダッシュボードが表示されることを確認してください

**3)** Consoleにログインしたら、このラボのウィンドウに戻り、**NEXT** を押して開始してください。頑張ってください!

---

詳細設定
===

> [!WARNING]
> 以下は詳細設定のオプションです。通常はトラブルシューティングに使用します:

このアカウントのPCEおよびCloud APIの認証情報を表示するには、**cloud console** タブで以下を実行してください:

```run
echo "PCE_FQDN=$AUTOACCOUNT_PCE_FQDN"
echo "ORG_ID=$AUTOACCOUNT_ORG_ID"
echo "APIKEY_ID=$AUTOACCOUNT_APIKEY_ID"
echo "APIKEY_SECRET=$AUTOACCOUNT_APIKEY_SECRET"
echo "SAKEYID=$AUTOACCOUNT_SAAPIKEY_KEYID"
echo "SASECRET=$AUTOACCOUNT_SAAPIKEY_SECRET"
echo "TENANT=$AUTOACCOUNT_TENANT_ID"
```

PCEのREST APIが稼働しているか確認するには(HTTP 200 = 正常):

```run
curl -s -o /dev/null -w "PCE API: HTTP %{http_code}\n" -u "api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}" "https://${AUTOACCOUNT_PCE_FQDN}/api/v2/orgs/${AUTOACCOUNT_ORG_ID}/workloads?max_results=1"
```

CloudSecureのAPIが稼働しているか確認するには(HTTP 200 = 正常):

```run
curl -s -o /dev/null -w "Cloud API: HTTP %{http_code}\n" -u "${AUTOACCOUNT_SAAPIKEY_KEYID}:${AUTOACCOUNT_SAAPIKEY_SECRET}" -H "X-Tenant-Id: ${AUTOACCOUNT_TENANT_ID}" "https://cloud.illum.io/api/v1/integrations"
```
