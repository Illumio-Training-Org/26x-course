 // ---- System PCE additions: clickable navigation + workload terminal ----
 const PCE='pce.illumio-lab.invalid:443';
 const serverAreas=['Applications','Reports'];
 let currentArea='';
 const areaText={
  'Dashboard':'An overview of your organization, such as workload counts, VEN health and policy status.',
  'Insights':'Insights into risk and traffic across your environment.',
  'Quarantine':'Isolate a compromised workload from the rest of the network.',
  'Explore':'Tools such as the Map and Traffic to investigate traffic flows between workloads.',
  'Segmentation':'Rulesets, rules and policy objects such as services and IP lists.',
  'Label Management':'Labels and label groups used to describe workloads.',
  'Applications':'Workloads grouped by their Application label.',
  'Reports':'Scheduled and on-demand reports.',
  'Cloud':'Cloud accounts and the cloud resources discovered in them.',
  'Usage':'Licence and workload usage for the organization.',
  'Access':'Users, roles and API keys.',
  'Settings':'Organization-wide settings, such as VEN and event settings.','Deny Rules':'All Deny Rules across your policies.','Drafts & Versions':'Draft policy changes and provisioned policy versions.',
  'Support':'Support reports and product documentation.'
 };
 function openArea(area){currentArea=area;message();$('phHeading').textContent=area;$('phText').textContent=(areaText[area]||'')+' This area is not available in this lab.';$('phReset').hidden=area!=='Settings';show('placeholderScreen',area);}
 document.querySelectorAll('.side-nav button[data-area]').forEach(b=>b.addEventListener('click',()=>openArea(b.dataset.area)));
 $('phBack').addEventListener('click',()=>{message();renderProfiles();show('profilesScreen','Pairing Profiles');});

 function fakeCode(){const a=new Uint8Array(41);crypto.getRandomValues(a);return ('1'+Array.from(a,b=>b.toString(16).padStart(2,'0')).join('')).slice(0,81);}

 const PROMPT={linux:['root@linux-ven-01',':~# '],windows:['','PS C:\\Windows\\system32> '],aix:['','root@aix-ven-01:/ # ']};
 function promptNodes(os){const a=document.createElement('span');a.className='term-user';a.textContent=PROMPT[os][0];const b=document.createElement('span');b.className='term-prompt';b.textContent=PROMPT[os][1];return [a,b];}
 const BANNER={
  linux:[],
  windows:[['','Windows PowerShell'],['','Copyright (C) Microsoft Corporation. All rights reserved.'],['','']],
  aix:[['','AIX Version 7.3'],['','']]
 };
 const term={os:'linux',busy:false,hist:[],hi:0,buf:{linux:null,windows:null,aix:null}};
 const shortHost=os=>hostnames[os].split('.')[0];
 const venVersion=p=>((p&&p.version||'').match(/\d+\.\d+\.\d+-\d+/)||['24.2.20-2091'])[0];

