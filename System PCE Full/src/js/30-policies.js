 // ---- Segmentation: All Policies, policy page and rules ----
 const I2={"pencil": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 2.5l3 3L6 13H3v-3z\"/></svg>", "more": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"3.5\" r=\"1.3\" fill=\"currentColor\"/><circle cx=\"8\" cy=\"8\" r=\"1.3\" fill=\"currentColor\"/><circle cx=\"8\" cy=\"12.5\" r=\"1.3\" fill=\"currentColor\"/></svg>"};
 const I={"plus": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" cx=\"8\" cy=\"8\" r=\"6\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 5.5v5M5.5 8h5\"/></svg>", "minus": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" cx=\"8\" cy=\"8\" r=\"6\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.5 8h5\"/></svg>", "upload": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 10.5V3m0 0L5 6m3-3 3 3M2.5 10.5v1.75c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V10.5\"/></svg>", "revert": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.5 3.5 3 6l2.5 2.5M3 6h7a3 3 0 0 1 0 6H6\"/></svg>", "toggle": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><rect fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" x=\"1.5\" y=\"4.5\" width=\"13\" height=\"7\" rx=\"3.5\"/><circle cx=\"5\" cy=\"8\" r=\"2\" fill=\"currentColor\"/></svg>", "check": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 8.5 6.5 12 13 4.5\"/></svg>", "checkc": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" cx=\"8\" cy=\"8\" r=\"6\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.5 8.2 7.2 10l3.3-3.7\"/></svg>", "refresh": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13 4v3h-3M3 12V9h3M12.6 7A5 5 0 0 0 3.8 5.5M3.4 9a5 5 0 0 0 8.8 1.5\"/></svg>", "export": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.5 2.5H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h5.5M7 8h7m0 0-2.5-2.5M14 8l-2.5 2.5\"/></svg>", "book": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2.5 3.5h4a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 0-1.5-1.5h-4zM13.5 3.5h-4A1.5 1.5 0 0 0 8 5v8.5A1.5 1.5 0 0 1 9.5 12h4z\"/></svg>", "warn": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 2.5 14 13H2zM8 6.5v3M8 11.25v.25\"/></svg>", "target": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" cx=\"8\" cy=\"8\" r=\"6\"/><circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" cx=\"8\" cy=\"8\" r=\"3\"/><circle cx=\"8\" cy=\"8\" r=\"1\" fill=\"currentColor\"/></svg>", "save": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M2 2h9.5L14 4.5V14H2z\" fill=\"currentColor\"/><rect x=\"4.5\" y=\"2\" width=\"6\" height=\"3.5\" fill=\"#fff\"/><rect x=\"4\" y=\"9\" width=\"8\" height=\"5\" rx=\".5\" fill=\"#fff\"/></svg>", "ban": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.8\" cx=\"8\" cy=\"8\" r=\"6\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.8\" d=\"M3.8 12.2 12.2 3.8\"/></svg>", "label": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"6.5\" fill=\"currentColor\"/><path d=\"M8 1.5v13M1.5 8h13M3.2 3.8c2.6 1.4 7 1.4 9.6 0M3.2 12.2c2.6-1.4 7-1.4 9.6 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1\"/></svg>", "gear": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle cx=\"6\" cy=\"8\" r=\"4.5\" fill=\"#9aa9b8\"/><circle cx=\"6\" cy=\"8\" r=\"1.6\" fill=\"#fff\"/><circle cx=\"11.5\" cy=\"11\" r=\"3\" fill=\"#b6c3cf\"/><circle cx=\"11.5\" cy=\"11\" r=\"1\" fill=\"#fff\"/></svg>", "globe": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><circle fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" cx=\"8\" cy=\"8\" r=\"6\"/><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 5.5h10M3 10.5h10M8 2a9 9 0 0 1 0 12M8 2a9 9 0 0 0 0 12\"/></svg>", "doc": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 2.5h5.5L12 5v8.5H4zM6 8h4M6 10.5h4\"/></svg>", "shield": "<svg class=\"icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 2 13 4v4c0 3-2.2 5.2-5 6-2.8-.8-5-3-5-6V4z\"/></svg>"};
 const ART={allow:"<svg viewBox=\"0 0 220 180\" aria-hidden=\"true\"><path d=\"M48 58C70 0 150 0 172 58\" fill=\"none\" stroke=\"#3ccf6b\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M36 46l14 20 10-22z\" fill=\"#3ccf6b\"/><path d=\"M184 46l-14 20-10-22z\" fill=\"#3ccf6b\"/><g transform=\"translate(18 0)\"><path d=\"M0 72l32-16 32 16v58l-32 16-32-16z\" fill=\"#d3dbe6\" stroke=\"#5c6f84\" stroke-width=\"3\"/><path d=\"M0 72l32 16 32-16M32 88v58M0 101l32 16 32-16\" fill=\"none\" stroke=\"#5c6f84\" stroke-width=\"3\"/><circle cx=\"10\" cy=\"92\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"96\" r=\"3\" fill=\"#fff\"/><circle cx=\"10\" cy=\"121\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"125\" r=\"3\" fill=\"#fff\"/></g><g transform=\"translate(138 0)\"><path d=\"M0 72l32-16 32 16v58l-32 16-32-16z\" fill=\"#9fc4ff\" stroke=\"#2366ed\" stroke-width=\"3\"/><path d=\"M0 72l32 16 32-16M32 88v58M0 101l32 16 32-16\" fill=\"none\" stroke=\"#2366ed\" stroke-width=\"3\"/><circle cx=\"10\" cy=\"92\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"96\" r=\"3\" fill=\"#fff\"/><circle cx=\"10\" cy=\"121\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"125\" r=\"3\" fill=\"#fff\"/></g><rect x=\"22\" y=\"152\" width=\"56\" height=\"16\" rx=\"3\" fill=\"#3b4757\"/><text x=\"50\" y=\"163\" font-size=\"8\" fill=\"#fff\" text-anchor=\"middle\" font-family=\"Arial\">SOURCE</text><rect x=\"132\" y=\"152\" width=\"76\" height=\"16\" rx=\"3\" fill=\"#3b4757\"/><text x=\"170\" y=\"163\" font-size=\"8\" fill=\"#fff\" text-anchor=\"middle\" font-family=\"Arial\">DESTINATION</text></svg>",deny:"<svg viewBox=\"0 0 220 180\" aria-hidden=\"true\"><path d=\"M48 58C70 0 150 0 172 58\" fill=\"none\" stroke=\"#e5484d\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M36 46l14 20 10-22z\" fill=\"#e5484d\"/><path d=\"M184 46l-14 20-10-22z\" fill=\"#e5484d\"/><path d=\"M100 18l20 20M120 18l-20 20\" stroke=\"#e5484d\" stroke-width=\"7\" stroke-linecap=\"round\"/><g transform=\"translate(18 0)\"><path d=\"M0 72l32-16 32 16v58l-32 16-32-16z\" fill=\"#d3dbe6\" stroke=\"#5c6f84\" stroke-width=\"3\"/><path d=\"M0 72l32 16 32-16M32 88v58M0 101l32 16 32-16\" fill=\"none\" stroke=\"#5c6f84\" stroke-width=\"3\"/><circle cx=\"10\" cy=\"92\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"96\" r=\"3\" fill=\"#fff\"/><circle cx=\"10\" cy=\"121\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"125\" r=\"3\" fill=\"#fff\"/></g><g transform=\"translate(138 0)\"><path d=\"M0 72l32-16 32 16v58l-32 16-32-16z\" fill=\"#9fc4ff\" stroke=\"#2366ed\" stroke-width=\"3\"/><path d=\"M0 72l32 16 32-16M32 88v58M0 101l32 16 32-16\" fill=\"none\" stroke=\"#2366ed\" stroke-width=\"3\"/><circle cx=\"10\" cy=\"92\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"96\" r=\"3\" fill=\"#fff\"/><circle cx=\"10\" cy=\"121\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"125\" r=\"3\" fill=\"#fff\"/></g><rect x=\"22\" y=\"152\" width=\"56\" height=\"16\" rx=\"3\" fill=\"#3b4757\"/><text x=\"50\" y=\"163\" font-size=\"8\" fill=\"#fff\" text-anchor=\"middle\" font-family=\"Arial\">SOURCE</text><rect x=\"132\" y=\"152\" width=\"76\" height=\"16\" rx=\"3\" fill=\"#3b4757\"/><text x=\"170\" y=\"163\" font-size=\"8\" fill=\"#fff\" text-anchor=\"middle\" font-family=\"Arial\">DESTINATION</text></svg>",override:"<svg viewBox=\"0 0 220 180\" aria-hidden=\"true\"><path d=\"M48 58C70 0 150 0 172 58\" fill=\"none\" stroke=\"#3ccf6b\" stroke-width=\"9\" stroke-linecap=\"round\"/><path d=\"M36 46l14 20 10-22z\" fill=\"#3ccf6b\"/><path d=\"M184 46l-14 20-10-22z\" fill=\"#3ccf6b\"/><g transform=\"translate(18 0)\"><path d=\"M0 72l32-16 32 16v58l-32 16-32-16z\" fill=\"#d3dbe6\" stroke=\"#5c6f84\" stroke-width=\"3\"/><path d=\"M0 72l32 16 32-16M32 88v58M0 101l32 16 32-16\" fill=\"none\" stroke=\"#5c6f84\" stroke-width=\"3\"/><circle cx=\"10\" cy=\"92\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"96\" r=\"3\" fill=\"#fff\"/><circle cx=\"10\" cy=\"121\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"125\" r=\"3\" fill=\"#fff\"/></g><g transform=\"translate(138 0)\"><path d=\"M0 72l32-16 32 16v58l-32 16-32-16z\" fill=\"#9fc4ff\" stroke=\"#2366ed\" stroke-width=\"3\"/><path d=\"M0 72l32 16 32-16M32 88v58M0 101l32 16 32-16\" fill=\"none\" stroke=\"#2366ed\" stroke-width=\"3\"/><circle cx=\"10\" cy=\"92\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"96\" r=\"3\" fill=\"#fff\"/><circle cx=\"10\" cy=\"121\" r=\"3\" fill=\"#fff\"/><circle cx=\"18\" cy=\"125\" r=\"3\" fill=\"#fff\"/></g><rect x=\"22\" y=\"152\" width=\"56\" height=\"16\" rx=\"3\" fill=\"#3b4757\"/><text x=\"50\" y=\"163\" font-size=\"8\" fill=\"#fff\" text-anchor=\"middle\" font-family=\"Arial\">SOURCE</text><rect x=\"132\" y=\"152\" width=\"76\" height=\"16\" rx=\"3\" fill=\"#3b4757\"/><text x=\"170\" y=\"163\" font-size=\"8\" fill=\"#fff\" text-anchor=\"middle\" font-family=\"Arial\">DESTINATION</text></svg>"};
 const LABELS=[['env','Development'],['env','Production'],['env','Staging'],['app','ordering'],['app','payment'],['app','crm'],['role','web'],['role','app'],['role','db'],['loc','ca'],['loc','us'],['loc','uk']];
 const LABEL_TYPE={role:'Role',app:'Application',env:'Environment',loc:'Location'};
 const SERVICES=[['S-HTTP','80 TCP'],['S-HTTPS','443 TCP'],['S-SSH','22 TCP'],['S-RDP','3389 TCP'],['S-SMB','445 TCP'],['S-8443','8443 TCP'],['S-BGP','179 TCP'],['S-DHCP-CLIENT','68 UDP, 68 TCP'],['S-DHCP-SERVER','67 UDP, 67 TCP'],['S-BIND-RNDC','953 TCP'],['S-DNS','53 TCP, 53 UDP']];
 const RULE_NAME={override:'Override Deny Rule',allow:'Allow Rule',deny:'Deny Rule',iptables:'Custom IP Table Rule'};
 const SECTION_NAME={override:'Override Deny Rules',allow:'Allow Rules',deny:'Deny Rules'};
 let curPolicyId=null,draft=null,rmSel=null,edit=null;
 const pols=()=>state.policies||(state.policies=[]);
 const curPolicy=()=>pols().find(p=>p.id===curPolicyId);
 function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}
 function ico(name){const s=document.createElement('span');s.style.display='inline-flex';s.innerHTML=I[name]||I2[name];return s.firstChild;}
 function itemStr(i){return i.kind==='label'?i.key+':'+i.value:i.kind==='all'?'All Workloads':i.kind==='any'?'Any':i.name;}
 function polSummary(){return pols().map(p=>({name:p.name,rules:['override','allow','deny'].flatMap(t=>(p.rules[t]||[]).map(r=>({type:t,enabled:r.enabled!==false,sources:r.sources.map(itemStr),destinations:r.destinations.map(itemStr),services:r.services.map(itemStr)})))}));}
 function pchip(item,onRemove){
  const c=el('span','pchip'+(item.kind==='label'?' lbl-'+item.key:''));
  if(item.kind==='label')c.append(ico('label'));else if(item.kind==='service'&&item.name==='All Services')c.append(ico('gear'));
  c.append(el('span','',item.kind==='label'?item.value:item.name));
  if(onRemove){const x=el('button','pchip-x','×');x.type='button';x.setAttribute('aria-label','Remove');x.addEventListener('mousedown',e=>{e.preventDefault();e.stopPropagation();onRemove();});c.append(x);}
  return c;
 }
 function sameItem(a,b){return a.kind===b.kind&&a.key===b.key&&a.value===b.value&&a.name===b.name;}
 function picker(kind,list,placeholder,onChange){
  const wrap=el('div','picker'+(kind==='svc'?' svc':''));const box=el('div','picker-box');const chips=el('span','picker-chips');
  const input=el('input','picker-input');input.placeholder=placeholder;input.setAttribute('aria-label',placeholder);
  box.append(chips,input,el('span','picker-caret','⌄'));const dd=el('div','picker-dd');dd.hidden=true;wrap.append(box,dd);
  let hi=0,opts=[];
  function draw(){chips.replaceChildren(...list.map((it,i)=>pchip(it,()=>{list.splice(i,1);draw();if(!dd.hidden)render();})));input.placeholder=list.length?'':placeholder;if(onChange)onChange();}
  function options(){
   const q=input.value.trim().toLowerCase();let o;
   if(kind==='svc'){o=storeServices().filter(s=>!q||s[0].toLowerCase().includes(q)||s[1].toLowerCase().includes(q)).map(s=>({kind:'service',name:s[0],ports:s[1]}));if(!q||'all services'.includes(q))o.push({kind:'service',name:'All Services',pin:true});}
   else{o=storeLabels().filter(l=>!q||l[1].toLowerCase().includes(q)).map(l=>({kind:'label',key:l[0],value:l[1]})).concat(storeExtras(q));o.push({kind:'all',name:'All Workloads',pin:true},{kind:'any',name:'Any (0.0.0.0/0 and ::/0)',pin:true});}
   return o.filter(a=>!list.some(b=>sameItem(a,b)));
  }
  function render(){
   opts=options();hi=Math.max(0,Math.min(hi,opts.length-1));dd.replaceChildren();
   const main=el('div','dd-main'),lst=el('div','dd-list'),pin=el('div','dd-pinned');
   opts.forEach((o,i)=>{
    const b=el('button','dd-opt'+(i===hi?' hi':''));b.type='button';b.tabIndex=-1;
    if(o.kind==='label'){b.append(pchip(o),el('span','dd-type',LABEL_TYPE[o.key]));}
    else if(o.kind==='labelgroup'||o.kind==='iplist'){b.append(pchip(o),el('span','dd-type',o.kind==='iplist'?'IP List':'Label Group'));}
    else if(o.kind==='service'&&!o.pin){const c=el('span','pchip svc-chip');c.append(ico('gear'));const t=el('span','svc-text');t.append(el('b','',o.name),el('span','',o.ports));c.append(t);b.append(c);b.style.justifyContent='flex-start';}
    else{b.append(pchip(o));b.style.justifyContent='flex-start';}
    b.addEventListener('mousedown',e=>{e.preventDefault();pick(o);});
    (o.pin?pin:lst).append(b);
   });
   if(!lst.childNodes.length)lst.append(el('div','dd-empty',kind==='svc'?'No matching services':'No matching labels'));
   main.append(lst);if(pin.childNodes.length)main.append(pin);
   const foot=el('div','dd-foot');
   if(kind==='svc'){
    const side=el('div','dd-side');side.append(el('div','dd-side-item active','Policy Services'),el('div','dd-side-item','Port/Port Range'));
    const add=el('div','dd-side-item add');add.append(ico('plus'),el('span','','Add a new Service'));side.append(add);
    const row=el('div','dd-row');row.append(main,side);dd.append(row);
    foot.append(el('span','dd-tip','? Filtering Tips(cmd+i)'),el('span','dd-key','↓↑'),el('span','','to navigate'),el('span','dd-key','↵'),el('span','','to select'),el('span','dd-key','esc'),el('span','','to close'));
   }else{
    dd.append(main);const adv=el('label','dd-adv');const cb=el('input');cb.type='checkbox';cb.disabled=true;adv.append(cb,document.createTextNode('Advanced Options(cmd+a)'));
    foot.append(adv,el('span','dd-tip','? Filtering Tips(cmd+i)'));
   }
   dd.append(foot);
   const h=dd.querySelector('.dd-opt.hi');if(h)h.scrollIntoView({block:'nearest'});
  }
  function pick(o){const v={kind:o.kind};if(o.key)v.key=o.key;if(o.value)v.value=o.value;if(o.name)v.name=o.name;list.push(v);input.value='';draw();hi=0;render();place();wrap.classList.remove('invalid');}
  function place(){const b=box.getBoundingClientRect();const below=window.innerHeight-b.bottom-8,above=b.top-8;if(below<300&&above>below){dd.style.insetBlockStart='auto';dd.style.insetBlockEnd=(window.innerHeight-b.top)+'px';dd.style.maxBlockSize=above+'px';}else{dd.style.insetBlockEnd='auto';dd.style.insetBlockStart=b.bottom+'px';dd.style.maxBlockSize=below+'px';}const w=Math.max(b.width,kind==='svc'?520:340);dd.style.inlineSize=w+'px';dd.style.insetInlineStart=Math.max(8,Math.min(b.left,window.innerWidth-w-8))+'px';}
  function open(){document.querySelectorAll('.picker.open').forEach(p=>{if(p!==wrap)p._close();});wrap.classList.add('open');opts=options();hi=kind==='svc'?opts.length-1:0;render();place();dd.hidden=false;}
  function close(){wrap.classList.remove('open');dd.hidden=true;input.value='';}
  wrap._close=close;wrap._place=place;
  box.addEventListener('mousedown',e=>{if(e.target!==input){e.preventDefault();input.focus();}});
  input.addEventListener('focus',open);
  input.addEventListener('input',()=>{hi=0;render();place();dd.hidden=false;wrap.classList.add('open');});
  input.addEventListener('keydown',e=>{
   if(e.key==='ArrowDown'){hi=Math.min(opts.length-1,hi+1);render();e.preventDefault();}
   else if(e.key==='ArrowUp'){hi=Math.max(0,hi-1);render();e.preventDefault();}
   else if(e.key==='Enter'){if(opts[hi])pick(opts[hi]);e.preventDefault();}
   else if(e.key==='Escape'){close();input.blur();}
   else if(e.key==='Backspace'&&!input.value&&list.length){list.pop();draw();render();}
  });
  input.addEventListener('blur',()=>setTimeout(()=>{if(!wrap.contains(document.activeElement))close();},150));
  draw();return wrap;
 }
 function renderPolicies(){
  const body=$('policiesBody');body.replaceChildren();const ps=pols();$('polRemove').disabled=true;$('polSelectAll').checked=false;
  $('policiesCount').textContent=ps.length?'1 – '+ps.length+' of '+ps.length+' Total':'0 Total';
  if(!ps.length){const r=body.insertRow();r.className='empty-row';const c=r.insertCell();c.colSpan=7;c.textContent='No Policies';return;}
  ps.forEach(p=>{
   const r=body.insertRow();const cb=el('input');cb.type='checkbox';cb.dataset.id=p.id;cb.addEventListener('change',updPolRemove);cb.setAttribute('aria-label','Select policy '+p.name);r.insertCell().append(cb);
   const b=el('span','pbadge');b.append(ico('plus'),el('span','','Pending'));r.insertCell().append(b);
   const st=el('span','pstatus enabled');st.append(ico('checkc'),el('span','','Enabled'));r.insertCell().append(st);
   const a=el('button','link',p.name);a.addEventListener('click',()=>openPolicy(p.id));r.insertCell().append(a);
   const sc=el('span','scope-chip');sc.append(ico('globe'),el('span','','All'));r.insertCell().append(sc);
   r.insertCell().textContent=p.modified;r.insertCell().append(emailLink(p.by));
  });
 }
 function closeMenus(){$('addPolicyMenu').hidden=true;$('addRuleMenu').hidden=true;}
 function expandSeg(){$('segChildren').hidden=false;$('segMenu').setAttribute('aria-expanded','true');$('segChevron').textContent='⌄';}
 function openPolicies(){curPolicyId=null;draft=null;edit=null;message();closeMenus();expandSeg();renderPolicies();show('policiesScreen','Policies');}
 function openPolicy(id){curPolicyId=id;draft=null;edit=null;message();closeMenus();renderPolicy();show('policyScreen',curPolicy().name);}
 function ruleHeader(full){
  const h=el('div','rrow rhead'+(full?'':' short'));let firstDone=false;
  (full?['','Provision Status','No.','Status','Sources','Source Process / Service','→','Destinations','Destination Services','Rule Options','']
       :['','Provision Status','No.','Status','Sources','→','Destinations','Destination Services','Rule Options','']).forEach(t=>{
   const c=el('div',t==='Destinations'||t==='Destination Services'?'dst':t==='→'?'arrow':'',t);if(full&&!firstDone){firstDone=true;const cb=el('input');cb.type='checkbox';cb.disabled=true;cb.setAttribute('aria-label','Select all rules');c.append(cb);c.style.textAlign='center';}h.append(c);});
  return h;
 }
 function chipsCell(list){const d=el('div');list.forEach(it=>d.append(pchip(it)));d.style.display='flex';d.style.flexWrap='wrap';d.style.gap='4px';return d;}
 function kindLabel(t){const k=el('span','kind '+t);k.append(ico(t==='allow'?'check':'ban'),el('span','',t==='allow'?'Allow':t==='deny'?'Deny':'Override Deny'));return k;}
 function pendingCell(){const b=el('span','pbadge');b.append(ico('plus'),el('span','','Pending'));const d=el('div');d.append(b);return d;}
 function stripRule(r){return {sources:r.sources,srcServices:r.srcServices||[],destinations:r.destinations,services:r.services,enabled:true};}
 const copyRule=r=>JSON.parse(JSON.stringify(stripRule(r)));
 function savedRow(t,r,i){
  const row=el('div','rrow saved');
  const fc=el('div','first-cell');const cb=el('input');cb.type='checkbox';cb.dataset.t=t;cb.dataset.i=String(i);cb.addEventListener('change',updRuleRemove);cb.setAttribute('aria-label','Select rule');fc.append(el('span','handle','⠿'),cb);
  const st=el('span','pstatus enabled');st.append(ico('checkc'),el('span','','Enabled'));const sc=el('div');sc.append(st);
  row.append(fc,pendingCell(),el('div','',String(i+1)),sc,chipsCell(r.sources),chipsCell(r.srcServices||[]),el('div','arrow','→'),chipsCell(r.destinations),chipsCell(r.services),el('div'));
  const act=el('div','ract');act.append(kindLabel(t));
  const ed=el('button','row-btn');ed.type='button';ed.title='Edit';ed.setAttribute('aria-label','Edit rule');ed.append(ico('pencil'));
  const more=el('button','row-btn');more.type='button';more.title='More';more.setAttribute('aria-label','More actions (not available)');more.append(ico('more'));
  ed.addEventListener('click',()=>{if(draft)return;edit={type:t,i,rule:copyRule(r),orig:JSON.stringify(stripRule(r))};renderPolicy();});
  act.append(ed,more);row.append(act);return row;
 }
 function editableRow(t,r,mode){
  const row=el('div','rrow '+(mode==='new'?'draft':'editing'));
  row.append(el('span','handle','⠿'),mode==='new'?el('div'):pendingCell(),el('div'),el('div'));
  let sv=null;const changed=()=>{if(mode==='edit'&&sv)sv.disabled=JSON.stringify(stripRule(r))===edit.orig;};
  const src=picker('ws',r.sources,'Select Sources',changed),ssvc=picker('svc',r.srcServices,'Select Services',changed),dst=picker('ws',r.destinations,'Select Destinations',changed),svc=picker('svc',r.services,'Select Services',changed);
  const opt=el('div','fake-select');opt.append(el('span','','Select Rule Options'),el('span','','⌄'));
  row.append(src,ssvc,el('div','arrow','→'),dst,svc,opt);
  const act=el('div','ract');act.append(kindLabel(t));
  sv=el('button','save-btn');sv.type='button';sv.title='Save';sv.setAttribute('aria-label','Save rule');sv.append(ico('save'));
  const cn=el('button');cn.type='button';cn.title='Cancel';cn.setAttribute('aria-label','Cancel');cn.append(ico('ban'));
  sv.addEventListener('click',()=>{
   const miss=[[src,r.sources],[dst,r.destinations],[svc,r.services]].filter(([w,l])=>!l.length);
   miss.forEach(([w])=>w.classList.add('invalid'));if(miss.length)return;
   const p=curPolicy();const rule=stripRule(r);p.rules[t]=p.rules[t]||[];
   if(mode==='new'){p.rules[t].push(rule);draft=null;}
   else{p.rules[t][edit.i]=rule;edit=null;}
   p.modified=timestamp();p.provision='Pending';save();renderPolicy();
  });
  cn.addEventListener('click',()=>{if(mode==='new')draft=null;else edit=null;renderPolicy();});
  act.append(sv,cn);row.append(act);changed();row._first=src;return row;
 }
 function renderPolicy(){
  const p=curPolicy();if(!p)return;let first=null;$('ruleRemove').disabled=true;
  ['override','allow','deny'].forEach(t=>{
   const sec=$('sec-'+t),body=sec.querySelector('.sec-body');body.replaceChildren();
   const rules=p.rules[t]||[],hasDraft=!!(draft&&draft.type===t),full=rules.length>0||hasDraft;
   const cnt=sec.querySelector('.sec-count');cnt.textContent=String(rules.length);cnt.hidden=!rules.length;
   const wrap=el('div','rscroll'),tbl=el('div','rtable'+(full?'':' short')+(rules.length?' framed':''));tbl.append(ruleHeader(full));
   rules.forEach((r,i)=>{if(edit&&edit.type===t&&edit.i===i){edit.rule.srcServices=edit.rule.srcServices||[];tbl.append(editableRow(t,edit.rule,'edit'));}else tbl.append(savedRow(t,r,i));});
   if(hasDraft){const d=editableRow(t,draft.rule,'new');tbl.append(d);first=d._first;}
   wrap.append(tbl);body.append(wrap);
   if(!full)body.append(el('div','rempty','There are no '+SECTION_NAME[t]+' defined'));
  });
  if(first)setTimeout(()=>first.querySelector('input').focus(),0);
 }
 function rmPreview(t){const k=t==='iptables'?'allow':t;$('rmTitle').textContent=(RULE_NAME[t]||'Allow Rule')+' No Scope';$('rmArt').innerHTML=ART[k];}
 $('segMenu').addEventListener('click',()=>{const open=$('segChildren').hidden;$('segChildren').hidden=!open;$('segMenu').setAttribute('aria-expanded',String(open));$('segChevron').textContent=open?'⌄':'›';});
 $('navAllPolicies').addEventListener('click',openPolicies);
 $('addPolicyBtn').addEventListener('click',e=>{e.stopPropagation();$('addPolicyMenu').hidden=!$('addPolicyMenu').hidden;});
 $('addFromTemplate').addEventListener('click',()=>{closeMenus();message('Policy templates are not available in this lab. Select Add from Scratch.');});
 function apValidate(){const v=$('apName').value.trim();$('apNameLabel').classList.toggle('invalid',!v);$('apName').classList.toggle('invalid',!v);$('apSave').disabled=!v;$('apError').hidden=true;}
 $('addFromScratch').addEventListener('click',()=>{apEditId=null;$('apTitle').textContent='Add Policy';closeMenus();$('apName').value='';$('apDesc').value='';apValidate();$('addPolicyDialog').showModal();$('apName').focus();});
 $('apName').addEventListener('input',apValidate);
 ['apClose','apCancel'].forEach(id=>$(id).addEventListener('click',()=>$('addPolicyDialog').close()));
 $('apSave').addEventListener('click',()=>{
  const name=$('apName').value.trim();if(!name)return;
  if(apEditId){const p=pols().find(o=>o.id===apEditId);if(pols().some(o=>o.id!==apEditId&&o.name.toLowerCase()===name.toLowerCase())){$('apError').textContent='A Policy with this name already exists.';$('apError').hidden=false;return;}p.name=name;p.description=$('apDesc').value.trim();p.modified=timestamp();save();$('addPolicyDialog').close();openPolicy(p.id);message('Policy updated.');return;}
  if(pols().some(p=>p.name.toLowerCase()===name.toLowerCase())){$('apError').textContent='A Policy with this name already exists.';$('apError').hidden=false;return;}
  const now=timestamp();const p={id:'pol-'+Date.now(),name,description:$('apDesc').value.trim(),scope:'All',created:now,modified:now,by:'admin@illumio-lab.invalid',provision:'Pending',rules:{override:[],allow:[],deny:[]}};
  pols().push(p);save();$('addPolicyDialog').close();openPolicy(p.id);
 });
 $('apName').addEventListener('keydown',e=>{if(e.key==='Enter'&&!$('apSave').disabled){e.preventDefault();$('apSave').click();}});
 $('addRuleBtn').addEventListener('click',e=>{e.stopPropagation();const m=$('addRuleMenu');m.hidden=!m.hidden;if(!m.hidden){rmSel=null;document.querySelectorAll('.rm-type').forEach(b=>b.classList.remove('sel'));$('rmAdd').disabled=true;rmPreview('allow');}});
 $('addRuleMenu').addEventListener('click',e=>e.stopPropagation());
 document.querySelectorAll('.rm-type').forEach(b=>{
  b.addEventListener('mouseenter',()=>rmPreview(b.dataset.type));
  b.addEventListener('mouseleave',()=>rmPreview(rmSel||'allow'));
  b.addEventListener('click',()=>{rmSel=b.dataset.type;document.querySelectorAll('.rm-type').forEach(x=>x.classList.toggle('sel',x===b));$('rmAdd').disabled=false;rmPreview(rmSel);});
  b.addEventListener('dblclick',()=>{rmSel=b.dataset.type;$('rmAdd').click();});
 });
 $('rmCancel').addEventListener('click',closeMenus);
 $('rmAdd').addEventListener('click',()=>{
  if(!rmSel)return;closeMenus();
  if(rmSel==='iptables'){message('Custom IP Table Rules are not available in this lab.');return;}
  edit=null;draft={type:rmSel,rule:{sources:[],srcServices:[],destinations:[],services:[]}};
  document.querySelector('#sec-'+rmSel).classList.remove('collapsed');renderPolicy();
 });
 document.querySelectorAll('.sec-head').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('collapsed')));
 document.addEventListener('click',e=>{if(!e.target.closest('.add-wrap'))closeMenus();});
 document.addEventListener('scroll',e=>{if(e.target.closest&&e.target.closest('.picker-dd'))return;document.querySelectorAll('.picker.open').forEach(p=>p._place());},true);
 window.addEventListener('resize',()=>document.querySelectorAll('.picker.open').forEach(p=>p._place()));

