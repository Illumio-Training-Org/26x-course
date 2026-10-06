
 function termLine(cls,text,extra){
  const line=document.createElement('span');if(cls)line.className=cls;line.textContent=text;
  const frag=document.createDocumentFragment();frag.append(line);
  if(extra){const e=document.createElement('span');e.className=extra[0];e.textContent=extra[1];frag.append(e);}
  frag.append(document.createTextNode('\n'));$('termOut').append(frag);$('termBody').scrollTop=$('termBody').scrollHeight;
 }
 function termEcho(cmd){const p=document.createDocumentFragment();p.append(...promptNodes(term.os));const c=document.createElement('span');c.className='cmd';c.textContent=cmd;$('termOut').append(p,c,document.createTextNode('\n'));}
 function termSave(){term.buf[term.os]=$('termOut').innerHTML;try{localStorage.setItem(STORE+'-term-'+term.os,term.buf[term.os]);}catch(_){}}
 function termLoad(os){
  term.os=os;state.os=os;$('termHost').value=os;document.querySelectorAll('.term-tab').forEach(t=>{const on=t.dataset.os===os;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on));});$('termPrompt').replaceChildren(...promptNodes(os));$('termOut').replaceChildren();
  if(term.buf[os]!==null)$('termOut').innerHTML=term.buf[os];else BANNER[os].forEach(l=>termLine(l[0],l[1]));
  $('termBody').scrollTop=$('termBody').scrollHeight;
 }
 function openTerm(os){
  $('termDrawer').hidden=false;document.body.classList.add('term-open');
  if(!term.busy&&(term.os!==os||!$('termOut').childNodes.length)){termSave();termLoad(os);}
  $('termInput').focus();
 }
 function closeTerm(){termSave();$('termDrawer').hidden=true;document.body.classList.remove('term-open');$('openTraining').focus();}
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 async function stream(lines,slow,onPair){
  for(const l of lines){
   if(l.pair){if(onPair)onPair();continue;}
   if(l.dots){const span=document.createElement('span');span.textContent=l.label;$('termOut').append(span);
    for(let i=0;i<l.n;i++){await wait(l.ms/l.n);span.textContent+='.';$('termBody').scrollTop=$('termBody').scrollHeight;}
    $('termOut').append(document.createTextNode('\n'));continue;}
   termLine(l[0],l[1],l[2]);await wait(l[1]===''?60:slow?120+Math.random()*180:60+Math.random()*80);
  }
 }
 function notFound(cmd){
  const w=cmd.split(/\s+/)[0];
  if(term.os==='windows')return [['err',w+" : The term '"+w+"' is not recognized as the name of a cmdlet, function, script file, or operable program."],['err','Check the spelling of the name, or if a path was included, verify that the path is correct and try again.']];
  if(term.os==='aix')return [['err','ksh: '+w+':  not found.']];
  return [['err','bash: '+w+': command not found']];
 }
 function pairWorkload(os,key){
  const p=state.profiles.find(pr=>pr.id===key.profileId)||selected();
  const w={hostname:hostnames[os],os,profile:p.name,labels:[...p.labels],enforcement:p.enforcement,visibility:p.visibility,version:p.version,nodeType:p.nodeType,paired:timestamp()};
  state.workloads.push(w);key.uses++;p.lastUsed=w.paired;
  if(state.key===key)$('keyRemaining').textContent=p.limited?String(Math.max(0,p.maxUses-key.uses)):'Unlimited';
  renderProfiles();renderWorkloads();save();return p;
 }
 async function runCommand(raw){
  const cmd=raw.trim();termEcho(raw);if(!cmd)return;load();
  term.hist.push(cmd);term.hi=term.hist.length;
  const os=term.os,ps=/pair\.ps1|^PowerShell\b/i.test(cmd),sh=/pair\.sh\b/.test(cmd);
  const code=(cmd.match(/-activation-code\s+([A-Za-z0-9-]+)/)||[])[1];
  if(/^(clear|cls|clear-host)$/i.test(cmd)){$('termOut').replaceChildren();return;}
  if(/^hostname$/i.test(cmd)){termLine('',os==='windows'?shortHost(os).toUpperCase():shortHost(os));return;}
  if(os!=='windows'&&/^ls(\s|$)/.test(cmd)){termLine('',os==='linux'?'anaconda-ks.cfg':'smit.log  smit.script');return;}
  if(os!=='windows'&&/^pwd$/.test(cmd)){termLine('',os==='linux'?'/root':'/');return;}
  if(os==='linux'&&/^uname(\s|$)/.test(cmd)){termLine('',/-a/.test(cmd)?'Linux linux-ven-01 5.14.0-427.13.1.el9_4.x86_64 #1 SMP PREEMPT_DYNAMIC x86_64 x86_64 x86_64 GNU/Linux':'Linux');return;}
  if(/^whoami$/i.test(cmd)){termLine('',os==='windows'?'nt authority\\system':'root');return;}
  if(/illumio-ven-ctl(\.ps1)?'?\s+status/i.test(cmd)){
   if(state.workloads.some(w=>w.os===os)){await stream(venStatus(os),false);}
   else await stream(notFound(os==='windows'?'illumio-ven-ctl':'illumio-ven-ctl'),false);
   return;
  }
  if(ps&&os!=='windows'){await stream(os==='aix'?[['err','ksh: PowerShell:  not found.']]:[['err','bash: PowerShell: command not found']],false);return;}
  if(sh&&os==='windows'){await stream([['err','At line:1 char:33'],['err','+ rm -fr /opt/illumio_ven_data/tmp && umask 026 && mkdir -p /opt/illumi ...'],['err','+                                 ~~'],['err',"The token '&&' is not a valid statement separator in this version."],['err','    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException'],['err','    + FullyQualifiedErrorId : InvalidEndOfLine']],false);return;}
  if(sh&&/\bnscurl\b/.test(cmd)&&os!=='windows'){await stream(os==='aix'?[['err','ksh: nscurl:  not found.']]:[['err','bash: nscurl: command not found']],false);return;}
  if((ps||sh)&&code){
   if(state.workloads.some(w=>w.os===os)){await stream(venAlreadyPaired(os),false);return;}
   const key=state.keys.find(k=>k.value===code);
   const kp=key&&state.profiles.find(pr=>pr.id===key.profileId);
   const valid=key&&kp&&!kp.stopped&&(key.expires===null||Date.now()<=key.expires)&&!(kp.limited&&key.uses>=kp.maxUses);
   if(!valid){await stream(venKeyRejected(),true);return;}
   await stream(venSuccess(os,kp),true,()=>pairWorkload(os,key));
   return;
  }
  await stream(notFound(cmd),false);
 }
 $('termInput').addEventListener('keydown',async e=>{
  if(e.key==='ArrowUp'&&term.hi>0){term.hi--;$('termInput').value=term.hist[term.hi];e.preventDefault();return;}
  if(e.key==='ArrowDown'){term.hi=Math.min(term.hist.length,term.hi+1);$('termInput').value=term.hist[term.hi]||'';e.preventDefault();return;}
  if(e.key!=='Enter'||term.busy)return;
  e.preventDefault();const v=$('termInput').value;$('termInput').value='';
  term.busy=true;$('termRow').hidden=true;$('termHost').disabled=true;
  try{await runCommand(v);}finally{term.busy=false;$('termRow').hidden=false;$('termHost').disabled=false;termSave();$('termBody').scrollTop=$('termBody').scrollHeight;$('termInput').focus();}
 });
 $('termBody').addEventListener('click',()=>{if(!window.getSelection().toString())$('termInput').focus();});
 document.querySelectorAll('.term-tab').forEach(t=>t.addEventListener('click',()=>{if(term.busy||t.dataset.os===term.os)return;$('termHost').value=t.dataset.os;$('termHost').dispatchEvent(new Event('change'));}));
 $('termHost').addEventListener('change',()=>{termSave();termLoad($('termHost').value);$('termInput').focus();});
 $('termClear').addEventListener('click',()=>{$('termOut').replaceChildren();termSave();$('termInput').focus();});
 $('termClose').addEventListener('click',closeTerm);
 $('confirmReset').addEventListener('click',()=>{state.resets=(state.resets||0)+1;state.policies=[];save();});


