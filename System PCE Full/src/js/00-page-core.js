
'use strict';
(() => {
 const $=id=>document.getElementById(id);
 const screens=['policiesScreen','policyScreen','placeholderScreen','profilesScreen','detailScreen','formScreen','keyScreen','workloadsScreen','workloadDetailScreen'];
 const labelIds=['roleLabel','appLabel','envLabel','locLabel'];
 const overrideIds=['overrideRole','overrideApp','overrideEnv','overrideLoc'];
 const labelNames=['Role','Application','Environment','Location'];
 const labelClasses=['role','app','env','loc'];
 const osNames={aix:'AIX',linux:'Linux',windows:'Windows'};
 const hostnames={aix:'aix-ven-01',linux:'linux-ven-01',windows:'windows-ven-01'};
 const sampleDate=(()=>{const d=new Date(Date.now()-180000);return d.toLocaleDateString('en-GB')+', '+d.toLocaleTimeString('en-GB');})();
 const nodeHint='Activate server VENs with pairing keys generated via this pairing profile. VENs that do not support server mode cannot be activated using this pairing profile. VENs cannot be activated using a command-line option to specify endpoint mode with this pairing profile.';
 function seeds(){
  return ['Default (Endpoints)','Default (Servers)','Default-Endpoints','Default-Servers'].map((name,i)=>({
   id:'sample-profile-'+(i+1),name,description:i<2?name:'',nodeType:i%2?'Server VEN':'Endpoint VEN',
   enforcement:'Visibility Only',visibility:'Enhanced Data Collection',version:'Default (24.2.20-2091)',
   labels:['','','',''],limited:false,maxUses:1,unlimitedAge:true,days:1,lockPolicy:true,lockLabels:true,
   overrides:[false,false,false,false],created:sampleDate,modified:sampleDate,by:'admin@illumio-lab.invalid',lastUsed:'',lastKey:''
  }));
 }
 let state={profiles:seeds(),selectedId:'sample-profile-2',key:null,serial:0,os:'linux',workloads:[],nextProfile:5,keys:[],resets:0};
 let editing=false;
 const selected=()=>state.profiles.find(p=>p.id===state.selectedId);
 function message(text=''){ $('pageMessage').textContent=text;$('pageMessage').hidden=!text; }
 function error(id,text=''){ $(id).textContent=text;$(id).hidden=!text; }
 function timestamp(){const d=new Date();return d.toLocaleDateString('en-GB')+', '+d.toLocaleTimeString('en-GB');}
 function closeSidebar(focus=false){$('sidebar').classList.remove('open');$('mobileMenu').setAttribute('aria-expanded','false');if(focus)$('mobileMenu').focus();}
 function show(id,title){
  screens.forEach(screen=>$(screen).hidden=screen!==id);$('pageTitle').textContent=title;
  const workloads=id==='workloadsScreen'||id==='workloadDetailScreen';
  const area=id==='placeholderScreen'?currentArea:'';document.querySelectorAll('.side-nav button').forEach(b=>{b.classList.remove('active');b.removeAttribute('aria-current');});
  const pol=id==='policiesScreen'||id==='policyScreen';const navBtn=pol?$('navAllPolicies'):area?document.querySelector('.side-nav button[data-area="'+area+'"]'):$(workloads?'navWorkloads':'navProfiles');navBtn.classList.add('active');navBtn.setAttribute('aria-current','page');$('crumbServers').hidden=!pol&&!!area&&!serverAreas.includes(area);$('crumbSection').textContent=pol?'Segmentation':'Servers and Endpoints';
  $('breadcrumbProfiles').textContent=pol?'Policies':area||(workloads?'Workloads':'Pairing Profiles');
  const suffix=id==='policyScreen'?' / '+title:id==='detailScreen'?' / '+selected().name:id==='keyScreen'?' / Pairing Key':id==='formScreen'?' / '+(editing?'Edit':'Add'):id==='workloadDetailScreen'?' / '+title:'';
  $('breadcrumbSuffix').textContent=suffix;$('breadcrumbSuffix').hidden=!suffix;
  closeSidebar();$('pageTitle').focus();window.scrollTo({top:0});if(id==='keyScreen')fitScripts();
 }
 function fitScripts(){['sampleAix','sampleLinux','sampleWindows','sampleMac'].forEach(id=>{const t=$(id);if(!t)return;t.style.blockSize='auto';t.style.blockSize=(t.scrollHeight+2)+'px';});}
 window.addEventListener('resize',()=>{if(!$('keyScreen').hidden)fitScripts();});
 function chips(id,labels){
  $(id).replaceChildren();labels.forEach((value,i)=>{if(!value)return;
   const chip=document.createElement('span');chip.className='chip';const kind=document.createElement('b');kind.className=labelClasses[i];kind.textContent=labelNames[i];const text=document.createElement('span');text.textContent=value;chip.append(kind,text);$(id).append(chip);
  });
 }
 function statusCell(row,text){const span=document.createElement('span');span.className='table-status';const dot=document.createElement('span');dot.className='status-dot';dot.setAttribute('aria-hidden','true');span.append(dot,document.createTextNode(text));row.insertCell().append(span);}
 function checkboxCell(row,label){const input=document.createElement('input');input.type='checkbox';input.disabled=true;input.setAttribute('aria-label',label+' (not available)');row.insertCell().append(input);}
 function renderProfiles(){
  const body=$('profilesBody');body.replaceChildren();$('profilePagination').textContent='1 – '+state.profiles.length+' of '+state.profiles.length+' Total';
  state.profiles.forEach(p=>{
   const row=body.insertRow();checkboxCell(row,'Select profile');statusCell(row,p.stopped?'Stopped':'Running');row.insertCell().textContent=p.nodeType;
   const link=document.createElement('button');link.className='link';link.textContent=p.name;link.addEventListener('click',()=>openProfile(p.id));row.insertCell().append(link);
   row.insertCell().textContent=p.enforcement;row.insertCell().textContent=p.labels.filter(Boolean).join(' · ');row.insertCell().textContent=p.modified;row.insertCell().append(emailLink(p.by));row.insertCell().textContent=p.lastUsed||'Never';row.insertCell().textContent=p.description;
  });
 }
 function initialValues(prefix,p){
  $(prefix+'Enforcement').textContent=p.enforcement;$(prefix+'EnforcementHint').textContent=p.enforcement==='Visibility Only'?'No traffic is denied by policy':p.enforcement==='Idle'?'Policy and traffic collection are idle':(p.enforcement==='Full Enforcement'?'Traffic that is not allowed by policy is blocked':'Policy is enforced only where enforcement boundaries apply');
  $(prefix+'Visibility').textContent=p.visibility;$(prefix+'VisibilityHint').textContent=p.visibility==='Enhanced Data Collection'?'VEN logs byte counts in addition to connection details for traffic which is allowed, denied or has no rule':p.visibility==='Off'?'Traffic visibility is off':(p.visibility==='Blocked'?'VEN logs connection details for blocked traffic only':'VEN logs connection details for allowed and blocked traffic');
  $(prefix+'Version').textContent=p.version;$(prefix+'NodeType').textContent=p.nodeType;$(prefix+'NodeHint').textContent=p.nodeType==='Server VEN'?nodeHint:'Activate endpoint VENs with pairing keys generated via this pairing profile. VENs that do not support endpoint mode cannot be activated using this pairing profile.';
  chips(prefix+'Labels',p.labels);
 }
 function renderDetail(){
  const p=selected();$('detailName').textContent=p.name;$('detailUri').textContent='/orgs/'+ORG_ID+'/pairing_profiles/'+profileNum(p);$('detailDescription').textContent=p.description;
  $('detailCreated').textContent=at(p.created);$('detailModified').replaceChildren(document.createTextNode(at(p.modified)+' by '),emailLink(p.by));$('detailLastKey').textContent=at(p.lastKey)||'Not generated';renderPairingState(p);$('lastKeyRow').hidden=!p.lastKey;
  initialValues('detail',p);$('detailUsage').textContent=p.limited?String(p.maxUses):'Unlimited';$('detailUsageHint').textContent=p.limited?p.maxUses+' Workload(s) can be paired per key':'Unlimited Workloads can be paired using this Pairing Profile';
  $('detailAge').textContent=p.unlimitedAge?'Unlimited':p.days+' Day(s)';$('detailAgeHint').textContent=p.unlimitedAge?'No time limit set for pairing Workloads with this Pairing Profile':'Pairing keys expire after the configured age';
  $('detailLockPolicy').textContent=p.lockPolicy?'Locked':'Unlocked';$('detailLockPolicyHint').textContent=p.lockPolicy?'Deny Enforcement changes during script execution':'Allow Enforcement changes during script execution';
  $('detailLockLabels').textContent=p.lockLabels?'Lock Label assignment':'Allow custom label assignments';$('detailLockLabelsHint').textContent=p.lockLabels?'Deny Workload Label assignment during script execution':labelNames.filter((_,i)=>p.overrides[i]).join(', ')||'No label dimensions selected';
 }
 function openProfile(id=state.selectedId){state.selectedId=id;message();renderDetail();show('detailScreen',selected().name);}
 function syncForm(){
  $('maxUses').disabled=!document.querySelector('input[name=usage][value=limited]').checked;
  $('ageDays').disabled=!document.querySelector('input[name=age][value=custom]').checked;
  overrideIds.forEach(id=>$(id).disabled=$('lockLabels').checked);
 }
 function openForm(isEdit){
  editing=isEdit;$('profileForm').reset();error('formError');message();const p=isEdit?selected():null;
  if(p){$('profileName').value=p.name;$('profileDescription').value=p.description;$('enforcement').value=p.enforcement;$('visibility').value=p.visibility;$('venVersion').value=p.version;$('nodeType').value=p.nodeType;labelIds.forEach((id,i)=>$(id).value=p.labels[i]);
   document.querySelector('input[name=usage][value='+ (p.limited?'limited':'unlimited') +']').checked=true;document.querySelector('input[name=age][value='+ (p.unlimitedAge?'unlimited':'custom') +']').checked=true;
   $('maxUses').value=p.maxUses;$('ageDays').value=p.days;$('lockPolicy').checked=p.lockPolicy;$('lockLabels').checked=p.lockLabels;overrideIds.forEach((id,i)=>$(id).checked=p.overrides[i]);
  }
  syncForm();show('formScreen',isEdit?'Edit Pairing Profile':'Add Pairing Profile');$('profileName').focus();
 }
 function sample(os){
  const p=selected();if(!p||!state.key)return '';
  const pid=profileNum(p),code=state.key.value;
  if(os==='windows')return 'PowerShell -Command "& {Set-ExecutionPolicy -Scope process remotesigned -Force; Start-Sleep -s 3; Set-Variable -Name ErrorActionPreference -Value SilentlyContinue; [System.Net.ServicePointManager]::SecurityProtocol=[Enum]::ToObject([System.Net.SecurityProtocolType], 3072); Set-Variable -Name ErrorActionPreference -Value Continue; (New-Object System.Net.WebClient).DownloadFile(\'https://'+PCE+'/api/v26/software/ven/image?pair_script=pair.ps1&profile_id='+pid+'\', (echo $env:windir\\temp\\pair.ps1)); & $env:windir\\temp\\pair.ps1 -management-server '+PCE+' -activation-code '+code+';}"';
  return 'rm -fr /opt/illumio_ven_data/tmp && umask 026 && mkdir -p /opt/illumio_ven_data/tmp && curl --tlsv1 "https://'+PCE+'/api/v26/software/ven/image?pair_script=pair.sh&profile_id='+pid+'" -o /opt/illumio_ven_data/tmp/pair.sh && chmod +x /opt/illumio_ven_data/tmp/pair.sh && /opt/illumio_ven_data/tmp/pair.sh --management-server '+PCE+' --activation-code '+code;
 }
 function renderKey(){
  const p=selected();$('keyProfile').replaceChildren();state.profiles.forEach(profile=>{const option=document.createElement('option');option.value=profile.id;option.textContent=profile.name;$('keyProfile').append(option);});$('keyProfile').value=p.id;
  $('keySourceProfile').textContent=p.name;initialValues('key',p);$('fakeKey').value=state.key.value;{const ep=p.nodeType==='Endpoint VEN';document.querySelector('.aix-script').hidden=ep;document.querySelector('.linux-script').hidden=ep;document.querySelector('.mac-script').hidden=!ep;$('sampleMac').value=sampleMac();}
  ['aix','linux','windows'].forEach(os=>{$('sample'+osNames[os][0]+osNames[os].slice(1).toLowerCase()).value=sample(os);$('copy'+osNames[os][0]+osNames[os].slice(1).toLowerCase()+'Status').hidden=true;});
  $('keyGenerated').textContent=at(state.key.generated);$('keyLifespan').textContent=p.unlimitedAge?'Unlimited':p.days+' Day(s)';$('keyRemaining').textContent=p.limited?String(Math.max(0,p.maxUses-state.key.uses)):'Unlimited';
 }
 function generateKey(){
  const p=selected();state.serial++;const now=Date.now();state.key={value:fakeCode(),profileId:p.id,generated:timestamp(),expires:p.unlimitedAge?null:now+p.days*86400000,uses:0};state.keys.push(state.key);
  p.lastKey=state.key.generated;$('trainingPanel').open=false;$('executionInput').value='';$('executionOutput').hidden=true;$('viewWorkloads').hidden=!state.workloads.length;error('executionError');message();renderKey();show('keyScreen','Pairing Key');
save();
 }
 async function copySample(os){
  state.os=os;const title=osNames[os][0]+osNames[os].slice(1).toLowerCase();const area=$('sample'+title);const output=$('copy'+title+'Status');const key=state.key.value;let copied=false;
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(area.value);copied=true;}}catch(_){}
  if(!copied){area.focus();area.select();try{copied=document.execCommand('copy');}catch(_){}}
  if(!state.key||key!==state.key.value)return;
  output.hidden=false;output.textContent=copied?osNames[os]+' script copied. Open the '+osNames[os]+' tab and paste it at the prompt.':'Copying is blocked here. The script is selected: press Ctrl+C or ⌘C, then open the '+osNames[os]+' tab and paste it.';
 }
 function openTraining(){openTerm(state.os);}
 function simulate(){}
 function renderWorkloads(){
  const body=$('workloadsBody');body.replaceChildren();$('workloadCount').textContent=state.workloads.length+' workload'+(state.workloads.length===1?'':'s');$('verifiedMessage').hidden=true;
  if(!state.workloads.length){const row=body.insertRow();const cell=row.insertCell();cell.colSpan=6;cell.className='empty';cell.textContent='No workloads.';}
  state.workloads.forEach(w=>{const row=body.insertRow();checkboxCell(row,'Select workload');const link=document.createElement('button');link.className='link';link.textContent=w.hostname;link.addEventListener('click',()=>openWorkload(w));row.insertCell().append(link);statusCell(row,'Online');row.insertCell().textContent=w.enforcement;row.insertCell().textContent=w.labels.filter(Boolean).join(' · ');row.insertCell().textContent=osNames[w.os];});
 }
 function openWorkloads(){message();renderWorkloads();show('workloadsScreen','Workloads');}
 function openWorkload(w){curWorkload=w;message();$('workloadHost').textContent=w.hostname;$('workloadOS').textContent=osNames[w.os];$('workloadEnforcement').textContent=w.enforcement;$('workloadVisibility').textContent=w.visibility;$('workloadVersion').textContent=w.version;$('workloadNodeType').textContent=w.nodeType;$('workloadProfile').textContent=w.profile;$('workloadPaired').textContent=w.paired;chips('workloadLabels',w.labels);show('workloadDetailScreen',w.hostname);}
 $('serversMenu').addEventListener('click',()=>{const open=$('serversChildren').hidden;$('serversChildren').hidden=!open;$('serversMenu').setAttribute('aria-expanded',String(open));$('serversChevron').textContent=open?'⌄':'›';});
 $('navProfiles').addEventListener('click',()=>{message();renderProfiles();show('profilesScreen','Pairing Profiles');});$('navWorkloads').addEventListener('click',openWorkloads);
 $('breadcrumbProfiles').addEventListener('click',()=>{if($('navAllPolicies').classList.contains('active')){openPolicies();return;}if($('navWorkloads').classList.contains('active'))openWorkloads();else{message();renderProfiles();show('profilesScreen','Pairing Profiles');}});
 $('mobileMenu').addEventListener('click',()=>{const open=!$('sidebar').classList.contains('open');$('sidebar').classList.toggle('open',open);$('mobileMenu').setAttribute('aria-expanded',String(open));if(open)$('serversMenu').focus();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('sidebar').classList.contains('open')){closeSidebar(true);e.preventDefault();}});
 document.addEventListener('click',e=>{if($('sidebar').classList.contains('open')&&!$('sidebar').contains(e.target)&&!$('mobileMenu').contains(e.target))closeSidebar();});
 $('addProfile').addEventListener('click',()=>openForm(false));$('editProfile').addEventListener('click',()=>openForm(true));$('cancelForm').addEventListener('click',()=>editing?openProfile():show('profilesScreen','Pairing Profiles'));
 document.querySelectorAll('input[name=usage],input[name=age]').forEach(input=>input.addEventListener('change',syncForm));$('lockLabels').addEventListener('change',syncForm);
 $('profileForm').addEventListener('submit',e=>{
  e.preventDefault();const name=$('profileName').value.trim();if(!name){error('formError','Enter a profile name.');$('profileName').focus();return;}
  if(state.profiles.some(p=>p.name===name&&(!editing||p.id!==state.selectedId))){error('formError','A pairing profile already has this name. Choose another name.');return;}
  const limited=document.querySelector('input[name=usage][value=limited]').checked;const unlimitedAge=document.querySelector('input[name=age][value=unlimited]').checked;const maxUses=Number($('maxUses').value);const days=Number($('ageDays').value);
  if((limited&&(!Number.isInteger(maxUses)||maxUses<1||maxUses>100))||(!unlimitedAge&&(!Number.isInteger(days)||days<1||days>365))){error('formError','Enter whole numbers: 1–100 uses and 1–365 days.');return;}
  const now=timestamp();const base=editing?selected():{id:'sample-profile-'+state.nextProfile++,created:now,lastUsed:'',lastKey:''};
  const p={...base,name,description:$('profileDescription').value.trim(),enforcement:$('enforcement').value,visibility:$('visibility').value,version:$('venVersion').value,nodeType:$('nodeType').value,labels:labelIds.map(id=>$(id).value.trim()),limited,maxUses,unlimitedAge,days,lockPolicy:$('lockPolicy').checked,lockLabels:$('lockLabels').checked,overrides:overrideIds.map(id=>$(id).checked),modified:now,by:'admin@illumio-lab.invalid'};
  if(editing)state.profiles[state.profiles.findIndex(profile=>profile.id===p.id)]=p;else state.profiles.push(p);state.selectedId=p.id;state.key=null;$('trainingPanel').open=false;renderProfiles();openProfile();save();message(editing?'Profile saved.':'Pairing profile created. Select Generate Key. No workload has been paired yet.');
 });
 $('generateKey').addEventListener('click',generateKey);$('keyProfile').addEventListener('change',()=>{state.selectedId=$('keyProfile').value;generateKey();});$('keySourceProfile').addEventListener('click',()=>openProfile());
 ['aix','linux','windows'].forEach(os=>{const title=osNames[os][0]+osNames[os].slice(1).toLowerCase();$('copy'+title).addEventListener('click',()=>copySample(os));});
 $('openTraining').addEventListener('click',openTraining);$('runExecution').addEventListener('click',simulate);$('viewWorkloads').addEventListener('click',openWorkloads);$('backWorkloads').addEventListener('click',openWorkloads);
 $('labGuide').addEventListener('click',()=>$('guideDialog').showModal());$('closeGuide').addEventListener('click',()=>$('guideDialog').close());$('guideDone').addEventListener('click',()=>$('guideDialog').close());
 $('resetLab').addEventListener('click',()=>$('resetDialog').showModal());$('cancelReset').addEventListener('click',()=>$('resetDialog').close());$('confirmReset').addEventListener('click',()=>{
  $('resetDialog').close();state={profiles:seeds(),selectedId:'sample-profile-2',key:null,serial:0,os:'linux',workloads:[],nextProfile:5,keys:[],resets:state.resets};editing=false;$('trainingPanel').open=false;$('executionInput').value='';$('executionOutput').hidden=true;$('viewWorkloads').hidden=true;error('executionError');error('formError');$('profileForm').reset();syncForm();renderProfiles();renderWorkloads();show('profilesScreen','Pairing Profiles');message('Lab reset. The four sample profiles are restored.');
 });
 
