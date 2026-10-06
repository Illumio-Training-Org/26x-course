 // ---- remove policies / rules, edit policy ----
 let apEditId=null,pcAction=null;
 function confirmRemove(title,text,fn){$('pcTitle').textContent=title;$('pcText').textContent=text;pcAction=fn;$('polConfirm').showModal();}
 $('pcCancel').addEventListener('click',()=>$('polConfirm').close());
 $('pcOk').addEventListener('click',()=>{$('polConfirm').close();if(pcAction)pcAction();pcAction=null;});
 const polSel=()=>[...document.querySelectorAll('#policiesBody input[type=checkbox]:checked')].map(c=>c.dataset.id);
 function updPolRemove(){const n=polSel().length;$('polRemove').disabled=!n;$('polSelectAll').checked=n>0&&n===pols().length;}
 $('polSelectAll').addEventListener('change',()=>{document.querySelectorAll('#policiesBody input[type=checkbox]').forEach(c=>c.checked=$('polSelectAll').checked);updPolRemove();});
 $('polRemove').addEventListener('click',()=>{
  const ids=polSel();if(!ids.length)return;const names=pols().filter(p=>ids.includes(p.id)).map(p=>p.name);
  confirmRemove(ids.length>1?'Remove Policies':'Remove Policy','Are you sure you want to remove '+(ids.length>1?'these Policies':'this Policy')+'? '+names.join(', '),
   ()=>{state.policies=pols().filter(p=>!ids.includes(p.id));save();renderPolicies();message((ids.length>1?'Policies':'Policy')+' removed: '+names.join(', '));});
 });
 const ruleSel=()=>[...document.querySelectorAll('#policyScreen .rrow.saved input[type=checkbox]:checked')].map(c=>({t:c.dataset.t,i:+c.dataset.i}));
 function updRuleRemove(){$('ruleRemove').disabled=!ruleSel().length;}
 $('ruleRemove').addEventListener('click',()=>{
  const sel=ruleSel();if(!sel.length)return;
  confirmRemove(sel.length>1?'Remove Rules':'Remove Rule','Are you sure you want to remove '+(sel.length>1?'the '+sel.length+' selected rules':'the selected rule')+'?',()=>{
   const p=curPolicy();sel.sort((a,b)=>b.i-a.i).forEach(({t,i})=>p.rules[t].splice(i,1));edit=null;p.modified=timestamp();save();renderPolicy();
   message(sel.length>1?'Rules removed.':'Rule removed.');
  });
 });
 $('editPolicyBtn').addEventListener('click',()=>{
  const p=curPolicy();if(!p)return;apEditId=p.id;$('apTitle').textContent='Edit Policy';$('apName').value=p.name;$('apDesc').value=p.description||'';apValidate();$('addPolicyDialog').showModal();$('apName').focus();
 });
