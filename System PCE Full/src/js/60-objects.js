
 // ---- Working object pages: Labels, Label Groups, Services, IP Lists ----
 // Stored in state (synced across tabs and reported like everything else) and
 // used by the policy rule pickers. Columns/banner come from the captured
 // manifest page; rows come from the store. System objects can't be changed.
 const OBJ_TYPES={labels:'labels',labelgroups:'labelGroups',services:'services',iplists:'ipLists'};
 const LABEL_KEYS=[['role','Role'],['app','Application'],['env','Environment'],['loc','Location']];
 let objSeq=Date.now();
 const newId=p=>p+'-'+(objSeq++).toString(36);
 function seedObjects(){
  const t=timestamp(),sys='System',by='admin@illumio-lab.invalid';
  const capLabels=((PCE_MANIFEST.pages.labels||{}).rows||[]).filter(r=>r.name&&r.type==='Application').map(r=>['app',r.name]);
  const labels=[...LABELS,...capLabels].filter((l,i,a)=>a.findIndex(x=>x[0]===l[0]&&x[1].toLowerCase()===l[1].toLowerCase())===i)
   .map(([key,value])=>({id:newId('lbl'),key,value,created:t}));
  const capSvc=((PCE_MANIFEST.pages.services||{}).rows||[]).filter(r=>r.name&&r.name!=='All Services').map(r=>({name:r.name,ports:r.portprotos||'',desc:r.desc||''}));
  const services=[{id:'svc-all',name:'All Services',ports:'ALL',desc:'',system:true,modified:t,by:sys},
   ...[...capSvc,...SERVICES.map(([name,ports])=>({name,ports,desc:''}))].filter((s,i,a)=>a.findIndex(x=>x.name.toLowerCase()===s.name.toLowerCase())===i)
    .map(s=>({id:newId('svc'),...s,modified:t,by}))];
  const ipLists=[{id:'ipl-any',name:'Any (0.0.0.0/0 and ::/0)',ranges:['0.0.0.0/0','::/0'],desc:'',system:true,modified:t,by:sys},
   {id:newId('ipl'),name:'Corporate Network',ranges:['10.0.0.0/8','172.16.0.0/12'],desc:'Internal corporate address space',modified:t,by},
   {id:newId('ipl'),name:'Guest Wi-Fi',ranges:['192.168.100.0/24'],desc:'',modified:t,by}];
  return {labels,labelGroups:[],services,ipLists};
 }
 function ensureObjects(){const s=seedObjects();['labels','labelGroups','services','ipLists'].forEach(k=>{if(!Array.isArray(state[k]))state[k]=s[k];});}
 // pickers read the store
 const storeLabels=()=>{ensureObjects();return state.labels.map(l=>[l.key,l.value]);};
 const storeServices=()=>{ensureObjects();return state.services.filter(s=>!s.system).map(s=>[s.name,s.ports]);};
 function storeExtras(q){ensureObjects();const m=s=>!q||s.toLowerCase().includes(q);
  return [...state.labelGroups.filter(g=>m(g.name)).map(g=>({kind:'labelgroup',key:g.key,name:g.name})),
          ...state.ipLists.filter(i=>!i.system&&m(i.name)).map(i=>({kind:'iplist',name:i.name}))];}
 const usedIn=pred=>pols().some(p=>['override','allow','deny'].some(t=>(p.rules[t]||[]).some(r=>[...r.sources,...r.destinations,...(r.services||[]),...(r.srcServices||[])].some(pred))));

 // ---- list page ----
 let objRoute=null;
 const OBJ_ROWS={
  labels:l=>({name:l.value,type:(LABEL_KEYS.find(k=>k[0]===l.key)||[])[1]||l.key,policy:usedIn(i=>i.kind==='label'&&i.key===l.key&&i.value===l.value)?'Policies':'',
   labelGroups:state.labelGroups.some(g=>g.members.includes(l.id))?'Label Groups':''}),
  labelgroups:g=>({name:g.name,type:(LABEL_KEYS.find(k=>k[0]===g.key)||[])[1]||'',rulesets:usedIn(i=>i.kind==='labelgroup'&&i.name===g.name)?'Policies':'',updatedat:g.modified,updatedby:g.by}),
  services:s=>({name:s.name,portprotos:s.ports,updatedat:s.modified,updatedby:s.by,desc:s.desc}),
  iplists:i=>({name:i.name,iprange:i.ranges[0]+(i.ranges.length>1?' +'+(i.ranges.length-1)+' more':''),updatedat:i.modified,updatedby:i.by,desc:i.desc}),
 };
 function objItems(r){ensureObjects();return state[OBJ_TYPES[r]];}
 function renderObjects(){
  const r=objRoute,p=PCE_MANIFEST.pages[r]||{},box=$('manifestScreen');box.replaceChildren();
  mfBanner(p,box);
  const tb=el('div','toolbar');
  const add=el('button','primary');add.append(ico('plus'),document.createTextNode('Add'));add.addEventListener('click',()=>openObjDialog(r,null));
  const rem=el('button');rem.id='objRemove';rem.disabled=true;rem.append(ico('minus'),document.createTextNode('Remove'));rem.addEventListener('click',()=>removeSelected(r));
  tb.append(add);
  if(r!=='labels'){const pv=el('button','primary');pv.disabled=true;pv.append(ico('upload'),document.createTextNode('Provision'));const rv=el('button');rv.disabled=true;rv.append(ico('revert'),document.createTextNode('Revert'));tb.append(pv,rv);}
  tb.append(rem,el('span','spacer'));
  const rf=el('button');rf.append(ico('refresh'),document.createTextNode('Refresh'));rf.addEventListener('click',renderObjects);
  const ex=el('button');ex.disabled=true;ex.append(ico('export'),document.createTextNode('Export'));tb.append(rf,ex);box.append(tb);
  const fb=el('div','filter-bar');const fi=el('input');fi.id='objFilter';fi.placeholder=p.filter||'Select properties to filter view';fi.setAttribute('aria-label','Filter by name');fb.append(fi);box.append(fb);
  const frame=el('div','table-frame');const meta=el('div','pol-meta');const count=el('span');meta.append(el('span','','Customize columns ⌄'),el('span','','50 per page ⌄'),count);frame.append(meta);
  const cols=(p.columns||[]).filter(c=>!/selection|checkbox/i.test(c.key));
  const sc=el('div','table-scroll');const t=el('table','pol-table mf-table');const th=t.createTHead().insertRow();
  const all=el('input');all.type='checkbox';all.setAttribute('aria-label','Select all');th.appendChild(el('th')).append(all);cols.forEach(c=>th.appendChild(el('th','',c.label)));
  const body=t.createTBody();sc.append(t);frame.append(sc);box.append(frame);
  function fill(){
   const q=fi.value.trim().toLowerCase();const items=objItems(r).filter(o=>!q||(o.name||o.value||'').toLowerCase().includes(q));
   body.replaceChildren();count.textContent=items.length?'1 – '+items.length+' of '+items.length+' Total':'0 Total';all.checked=false;$('objRemove').disabled=true;
   if(!items.length){const tr=body.insertRow();tr.className='empty-row';const c=tr.insertCell();c.colSpan=cols.length+1;c.textContent='No '+(p.title||'items')+' to display';return;}
   items.forEach(o=>{const v=OBJ_ROWS[r](o);const tr=body.insertRow();const cb=el('input');cb.type='checkbox';cb.dataset.id=o.id;cb.disabled=!!o.system;cb.setAttribute('aria-label','Select '+(o.name||o.value));
    cb.addEventListener('change',()=>{$('objRemove').disabled=!body.querySelector('input:checked');});tr.insertCell().append(cb);
    cols.forEach(c=>{const cell=tr.insertCell();const val=v[c.key]||'';
     if(c.key==='status'){if(o.pending){const b=el('span','pbadge');b.append(ico('plus'),el('span','','Pending'));cell.append(b);}}
     else if(c.key==='name'){if(o.system)cell.append(el('span','',val));else{const a=el('button','link',val);a.addEventListener('click',()=>openObjDialog(r,o));cell.append(a);}}
     else if(/@illumio-lab\.invalid/.test(val))cell.append(emailLink(val));else cell.textContent=val;});});
  }
  fi.addEventListener('input',fill);all.addEventListener('change',()=>{body.querySelectorAll('input[type=checkbox]:not(:disabled)').forEach(c=>c.checked=all.checked);$('objRemove').disabled=!body.querySelector('input:checked');});
  fill();
 }
 function openObjects(btn){objRoute=btn.dataset.route;message();renderObjects();const p=PCE_MANIFEST.pages[objRoute]||{};show('manifestScreen',p.title||btn.dataset.label);
  const bc=p.breadcrumbs&&p.breadcrumbs.length?p.breadcrumbs:['Home'];$('crumbServers').hidden=bc.length<2;$('crumbSection').textContent=bc[1]||'';$('breadcrumbProfiles').textContent=bc[2]||p.title||'';$('breadcrumbSuffix').hidden=true;markNav(btn);}
 function removeSelected(r){
  const ids=[...document.querySelectorAll('#manifestScreen tbody input:checked')].map(c=>c.dataset.id);const items=objItems(r).filter(o=>ids.includes(o.id));if(!items.length)return;
  const inUse=items.filter(o=>r==='labels'?usedIn(i=>i.kind==='label'&&i.key===o.key&&i.value===o.value):r==='services'?usedIn(i=>i.kind==='service'&&i.name===o.name):r==='iplists'?usedIn(i=>i.kind==='iplist'&&i.name===o.name):usedIn(i=>i.kind==='labelgroup'&&i.name===o.name));
  if(inUse.length){message('Cannot remove '+inUse.map(o=>o.name||o.value).join(', ')+': in use by a policy rule.');return;}
  const names=items.map(o=>o.name||o.value);
  confirmRemove('Remove','Are you sure you want to remove '+names.join(', ')+'?',()=>{const k=OBJ_TYPES[r];state[k]=state[k].filter(o=>!ids.includes(o.id));
   if(r==='labels')state.labelGroups.forEach(g=>g.members=g.members.filter(m=>!ids.includes(m)));save();renderObjects();message('Removed: '+names.join(', '));});
 }

 // ---- add / edit dialog ----
 const objDlg=document.createElement('dialog');objDlg.className='pol-dialog';objDlg.setAttribute('aria-labelledby','odTitle');
 objDlg.innerHTML='<div class="pd-head"><h2 id="odTitle"></h2><button id="odClose" class="pd-x" aria-label="Close">✕</button></div><div id="odBody" class="pd-body"></div>'+
  '<div class="pd-foot"><button id="odCancel">Cancel</button><button id="odSave" class="primary">Save</button></div>';
 document.body.append(objDlg);
 let odCtx=null;
 function odField(label,input,required){const w=el('div');const l=el('label','pd-label'+(required?' req':''));if(required)l.append(el('span','star','*'),document.createTextNode(' '));l.append(document.createTextNode(label));input.classList.add('pd-input');w.append(l,input);return w;}
 function openObjDialog(r,o){
  odCtx={r,o};const names={labels:'Label',labelgroups:'Label Group',services:'Service',iplists:'IP List'};
  $('odTitle').textContent=(o?'Edit ':'Add ')+names[r];const b=$('odBody');b.replaceChildren();
  const name=el('input');name.id='odName';name.value=o?(o.name||o.value||''):'';name.placeholder='Type a name';
  b.append(odField('Name',name,true));
  if(r==='labels'||r==='labelgroups'){const ty=el('select');ty.id='odType';LABEL_KEYS.forEach(([k,n])=>{const op=el('option','',n);op.value=k;ty.append(op);});ty.value=o?o.key:'app';if(o)ty.disabled=true;b.append(odField('Type',ty,true));
   if(r==='labelgroups'){const box=el('div','od-members');box.id='odMembers';b.append(odField('Labels',box,false));const fillM=()=>{box.replaceChildren();state.labels.filter(l=>l.key===ty.value).forEach(l=>{const lab=el('label','od-check');const cb=el('input');cb.type='checkbox';cb.value=l.id;cb.checked=!!(o&&o.members.includes(l.id));lab.append(cb,document.createTextNode(' '+l.value));box.append(lab);});};ty.addEventListener('change',fillM);fillM();}}
  if(r==='services'||r==='iplists'){const d=el('textarea');d.id='odDesc';d.value=o?o.desc||'':'';d.placeholder='Type a description';b.append(odField('Description',d,false));}
  if(r==='services'){const pp=el('input');pp.id='odPorts';pp.value=o?o.ports:'';pp.placeholder='e.g. 443 TCP, 8080-8090 TCP, 53 UDP';b.append(odField('Port/Protocol',pp,true));}
  if(r==='iplists'){const ip=el('textarea');ip.id='odRanges';ip.value=o?o.ranges.join('\n'):'';ip.placeholder='One IP address, CIDR block or range per line';b.append(odField('IP Addresses',ip,true));}
  const err=el('div','pd-error');err.id='odError';err.hidden=true;b.append(err);
  objDlg.showModal();name.focus();
 }
 const odErr=m=>{$('odError').textContent=m;$('odError').hidden=false;};
 $('odClose').addEventListener('click',()=>objDlg.close());$('odCancel').addEventListener('click',()=>objDlg.close());
 $('odSave').addEventListener('click',()=>{
  const {r,o}=odCtx;const name=$('odName').value.trim();if(!name)return odErr('Name is required.');
  const k=OBJ_TYPES[r];const now=timestamp(),by='admin@illumio-lab.invalid';
  if(r==='labels'){const key=$('odType').value;
   if(state.labels.some(l=>l!==o&&l.key===key&&l.value.toLowerCase()===name.toLowerCase()))return odErr('A label with this name and type already exists.');
   if(o){const old=o.value;pols().forEach(p=>['override','allow','deny'].forEach(t=>(p.rules[t]||[]).forEach(rl=>[...rl.sources,...rl.destinations].forEach(i=>{if(i.kind==='label'&&i.key===o.key&&i.value===old)i.value=name;}))));o.value=name;}
   else state.labels.push({id:newId('lbl'),key,value:name,created:now});}
  else{
   if(state[k].some(x=>x!==o&&(x.name||'').toLowerCase()===name.toLowerCase()))return odErr('An item with this name already exists.');
   const rec=o||{id:newId(r)};rec.name=name;rec.modified=now;rec.by=by;rec.pending=true;
   if(r==='labelgroups'){rec.key=o?o.key:$('odType').value;rec.members=[...$('odMembers').querySelectorAll('input:checked')].map(c=>c.value);}
   if(r==='services'){const pp=$('odPorts').value.trim();if(!/^\d{1,5}(-\d{1,5})?\s+(TCP|UDP)(\s*,\s*\d{1,5}(-\d{1,5})?\s+(TCP|UDP))*$/i.test(pp))return odErr('Enter ports like "443 TCP" or "8080-8090 TCP, 53 UDP".');rec.ports=pp.replace(/\s*,\s*/g,', ').replace(/(tcp|udp)/gi,x=>x.toUpperCase());rec.desc=$('odDesc').value.trim();}
   if(r==='iplists'){const lines=$('odRanges').value.split(/[\n,]+/).map(s=>s.trim()).filter(Boolean);const ip4='(25[0-5]|2[0-4]\\d|1?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|1?\\d?\\d)){3}';
    const ok=new RegExp('^'+ip4+'(\\/([0-9]|[12]\\d|3[0-2]))?$|^'+ip4+'-'+ip4+'$|^[0-9a-f:]+(\\/\\d{1,3})?$','i');const bad=lines.filter(x=>!ok.test(x));
    if(!lines.length)return odErr('Enter at least one IP address.');if(bad.length)return odErr('Not a valid IP address, CIDR block or range: '+bad.join(', '));rec.ranges=lines;rec.desc=$('odDesc').value.trim();}
   if(!o)state[k].push(rec);}
  save();objDlg.close();renderObjects();message((o?'Updated ':'Added ')+name+'.');
 });
 $('confirmReset').addEventListener('click',()=>{['labels','labelGroups','services','ipLists'].forEach(k=>state[k]=null);ensureObjects();});
 ensureObjects();
