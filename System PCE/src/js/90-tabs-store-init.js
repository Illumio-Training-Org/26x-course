 // ---- Instruqt tabs: index.html = Console; linux.html / windows.html / aix.html = one terminal each.
 // All four are served from the same host, so they share state via localStorage + BroadcastChannel.
 const STORE='illumio-pce-lab-v1';
 const MODE=(location.pathname.match(/(linux|windows|aix)\.html/)||[])[1]||'console';
 let bc=null;try{bc=new BroadcastChannel(STORE);}catch(_){}
 let curWorkload=null;
 function snapshot(){return JSON.stringify({labels:state.labels,labelGroups:state.labelGroups,services:state.services,ipLists:state.ipLists,policies:state.policies||[],profiles:state.profiles,keys:state.keys,workloads:state.workloads,serial:state.serial,nextProfile:state.nextProfile,resets:state.resets||0,curKey:state.key?state.key.value:null});}
 function report(){try{fetch('api/state',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({workloads:state.workloads.map(w=>w.os),policies:polSummary()}),keepalive:true}).catch(()=>{});}catch(_){}}
 function save(post=true){const s=snapshot();try{localStorage.setItem(STORE,s);}catch(_){}if(post)report();if(bc)try{bc.postMessage(s);}catch(_){}}
 function applySnapshot(s){
  let d;try{d=JSON.parse(s);}catch(_){return false;}if(!d||!d.profiles)return false;
  const prevResets=state.resets||0;
  state.profiles=d.profiles;state.policies=d.policies||[];['labels','labelGroups','services','ipLists'].forEach(k=>{if(Array.isArray(d[k]))state[k]=d[k];});state.keys=d.keys||[];state.workloads=d.workloads||[];state.serial=d.serial||0;state.nextProfile=d.nextProfile||5;state.resets=d.resets||0;
  const cur=MODE==='console'&&state.key?state.key.value:d.curKey;state.key=state.keys.find(k=>k.value===cur)||null;
  if(!state.profiles.some(p=>p.id===state.selectedId))state.selectedId=state.profiles[0].id;
  if(MODE!=='console'&&state.resets!==prevResets){term.buf[term.os]=null;try{localStorage.removeItem(STORE+'-term-'+term.os);}catch(_){}termLoad(term.os);}
  return true;
 }
 function load(){try{const s=localStorage.getItem(STORE);if(s)applySnapshot(s);}catch(_){}}
 function refreshConsole(){
  renderProfiles();renderWorkloads();
  if(!$('keyScreen').hidden&&state.key){const p=state.profiles.find(pr=>pr.id===state.key.profileId);if(p)$('keyRemaining').textContent=p.limited?String(Math.max(0,p.maxUses-state.key.uses)):'Unlimited';}
  if(!$('workloadDetailScreen').hidden&&curWorkload&&!state.workloads.some(w=>w.os===curWorkload.os))openWorkloads();
 }
 function incoming(s){if(applySnapshot(s)&&MODE==='console')refreshConsole();}
 window.addEventListener('storage',e=>{if(e.key===STORE&&e.newValue)incoming(e.newValue);});
 if(bc)bc.onmessage=e=>incoming(e.data);
 $('phReset').addEventListener('click',()=>$('resetDialog').showModal());
 $('unpairWorkload').addEventListener('click',()=>{if(!curWorkload)return;const h=curWorkload.hostname;state.workloads=state.workloads.filter(w=>w.os!==curWorkload.os);curWorkload=null;save();openWorkloads();message(h+' has been unpaired.');});
 load();
 if(MODE!=='console'){
  document.body.classList.add('term-page');document.title=osNames[MODE];
  try{const b=localStorage.getItem(STORE+'-term-'+MODE);if(b)term.buf[MODE]=b;}catch(_){}
  term.os='';openTerm(MODE);
 }else{save(false);}
 renderProfiles();renderWorkloads();syncForm();
})();
