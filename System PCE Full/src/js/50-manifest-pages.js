
 // ---- Console pages generated from the captured real-PCE manifest ----
 // Every sidebar leaf without a hand-built page renders from PCE_MANIFEST
 // (capture/pce-manifest.json, injected by build.mjs). Templates:
 //   list         captured grid: banner, tabs, toolbar, filter, columns, sample rows
 //   static       Dashboard + Cloud: the default view, nothing clickable
 //   blank-map    Explore > Map: empty canvas with only the filter boxes
 //   detail       settings-style pages: banner + captured section headings
 //   placeholder  Insights, Explore > Traffic / Mesh, pages unavailable in the source org
 const PCE_MANIFEST=@@MANIFEST@@;
 const MF_ICONS={add:'plus',remove:'minus',refresh:'refresh',export:'export',provision:'upload',revert:'revert'};
 function mfKind(btn){
  const r=btn.dataset.route,label=btn.dataset.label,top=btn.dataset.top;
  if(top==='Insights'||!r)return 'placeholder';
  if(top==='Explore')return label==='Map'?'blank-map':'placeholder';
  const p=PCE_MANIFEST.pages[r];
  if(p&&p.staticImage&&PCE_MANIFEST.shots[p.staticImage])return 'image';
  if(top==='Dashboard'||top==='Cloud')return 'static';
  if(!p||(p.route&&p.route!==r&&!p.route.startsWith(r+'/')))return 'placeholder';   // redirected in the source org
  return p.columns&&p.columns.length?'list':'detail';
 }
 function mfButton(b){
  const btn=el('button');const k=(b.label||'').toLowerCase();const ic=MF_ICONS[k];
  if(ic&&I[ic])btn.append(ico(ic));btn.append(document.createTextNode(b.label||''));
  if(!b.label&&b.icons&&b.icons.length)btn.setAttribute('aria-label',b.icons[0]);
  btn.disabled=k==='add'?false:(!!b.disabled||/^(remove|provision|revert|delete|edit)$/i.test(b.label||''));
  if(k==='add')btn.className='primary';
  btn.addEventListener('click',()=>message(k==='add'?'Adding items is not available on this page in this lab.':''));
  return btn;
 }
 function mfBanner(p,box){
  if(!p.banner||!(p.banner.title||p.banner.text))return;
  const b=el('div','intro');const d=el('div');
  if(p.banner.title)d.append(el('h2','',p.banner.title));
  if(p.banner.text)d.append(el('p','',p.banner.text));
  const lm=el('button','learn-more');lm.disabled=true;lm.append(ico('book'),document.createTextNode('Learn more'));d.append(lm);
  b.append(d);box.append(b);
 }
 function mfPagination(n){return n?'1 – '+n+' of '+n+' Total':'0 Total';}
 function mfList(p,box){
  mfBanner(p,box);
  if(p.tabs&&p.tabs.length){const t=el('div','ptabs');p.tabs.forEach((x,i)=>{const b=el('button','ptab'+((x.active||(!p.tabs.some(y=>y.active)&&i===0))?' active':''),x.label);b.disabled=!(x.active||(!p.tabs.some(y=>y.active)&&i===0));t.append(b);});box.append(t);}
  const tb=el('div','toolbar');
  (p.toolbar||[]).filter(b=>!/^(refresh|export|open)$/i.test(b.label||'')&&b.label).forEach(b=>tb.append(mfButton(b)));
  tb.append(el('span','spacer'));
  (p.toolbar||[]).filter(b=>/^(refresh|export|open)$/i.test(b.label||'')).forEach(b=>tb.append(mfButton({...b,label:/^open$/i.test(b.label)?'Export':b.label})));
  box.append(tb);
  const fb=el('div','filter-bar');const fi=el('input');fi.disabled=true;fi.placeholder=p.filter||'Select properties to filter view';fi.setAttribute('aria-label','Filter (not available)');fb.append(fi);box.append(fb);
  const cols=(p.columns||[]).filter(c=>!/selection|checkbox/i.test(c.key));const rows=p.rows||[];
  const frame=el('div','table-frame');const meta=el('div','pol-meta');meta.append(el('span','','Customize columns ⌄'),el('span','','50 per page ⌄'),el('span','',mfPagination(rows.length)));frame.append(meta);
  const sc=el('div','table-scroll');const t=el('table','pol-table mf-table');const th=t.createTHead().insertRow();
  const cbh=el('input');cbh.type='checkbox';cbh.disabled=true;cbh.setAttribute('aria-label','Select all');th.appendChild(el('th')).append(cbh);
  cols.forEach(c=>th.appendChild(el('th','',c.label)));
  if(p.columnGroups&&p.columnGroups.length)t.title=p.columnGroups.join(', ');
  const body=t.createTBody();
  if(!rows.length){const r=body.insertRow();r.className='empty-row';const c=r.insertCell();c.colSpan=cols.length+1;c.textContent='No '+(p.title||'items')+' to display';}
  rows.forEach(row=>{const r=body.insertRow();const cb=el('input');cb.type='checkbox';cb.disabled=true;cb.setAttribute('aria-label','Select row');r.insertCell().append(cb);
   cols.forEach((c,i)=>{const v=row[c.key]||'';const cell=r.insertCell();
    if(/@illumio-lab\.invalid/.test(v))cell.append(emailLink(v));
    else if(c.key==='name'||(i===0&&!/status/i.test(c.key)))cell.append(el('span','link-text',v));
    else cell.textContent=v;});});
  sc.append(t);frame.append(sc);box.append(frame);
 }
 function mfStatic(p,box,label){
  mfBanner(p||{},box);
  const secs=((p&&p.sections)||[]).filter(s=>s.heading);
  const grid=el('div','mf-tiles');
  (secs.length?secs:[{heading:label}]).forEach(s=>{const c=el('div','mf-tile');c.append(el('h3','',s.heading));
   const body=el('div','mf-tile-body');(s.labels||[]).slice(0,6).forEach(l=>body.append(el('div','mf-tile-line',l)));if(!(s.labels||[]).length)body.append(el('div','mf-chart'));c.append(body);grid.append(c);});
  box.append(grid);
 }
 function mfBlankMap(box){
  const tb=el('div','toolbar mf-map-bar');
  const fi=el('div','filter-bar mf-map-filter');const inp=el('input');inp.disabled=true;inp.placeholder='Select properties to filter view';inp.setAttribute('aria-label','Filter (not available)');fi.append(inp);
  const tr=el('button','',null);tr.disabled=true;tr.textContent='Last 24 Hours ⌄';const pd=el('button','',null);pd.disabled=true;pd.textContent='Policy Decision ⌄';
  tb.append(fi,tr,pd);box.append(tb,el('div','mf-map-canvas'));
 }
 function mfDetail(p,box){
  mfBanner(p,box);
  if(p.tabs&&p.tabs.length){const t=el('div','ptabs');p.tabs.forEach((x,i)=>{const b=el('button','ptab'+(i===0?' active':''),x.label);b.disabled=i!==0;t.append(b);});box.append(t);}
  const tb=el('div','toolbar');(p.toolbar||[]).filter(b=>b.label).forEach(b=>tb.append(mfButton(b)));if(tb.childNodes.length)box.append(tb);
  if(p.attributes&&p.attributes.length){p.attributes.forEach(s=>{const sec=el('section','section');if(s.section)sec.append(el('h2','',s.section));const at=el('div','attributes');
   s.rows.forEach(rw=>{const row=el('div','row');row.append(el('span','label',rw.label),el('div','value',rw.value||'—'));at.append(row);});sec.append(at);box.append(sec);});return;}
  const secs=(p.sections||[]).filter(s=>s.heading);
  if(!secs.length){box.append(el('div','ph-card mf-empty','No settings to display.'));return;}
  secs.forEach(s=>{const sec=el('section','section');sec.append(el('h2','',s.heading));const at=el('div','attributes');
   (s.labels||[]).forEach(l=>{const r=el('div','row');r.append(el('span','label',l),el('div','value','—'));at.append(r);});sec.append(at);box.append(sec);});
 }
 function openRoute(btn){
  if(OBJ_TYPES[btn.dataset.route]){openObjects(btn);return;}
  const r=btn.dataset.route,label=btn.dataset.label,kind=mfKind(btn);
  if(kind==='placeholder'){openArea(label);markNav(btn);return;}
  const p=PCE_MANIFEST.pages[r]||{};const box=$('manifestScreen');box.replaceChildren();message();
  const title=kind==='blank-map'?label:(p.title||label);
  if(kind==='image'){const im=el('img','mf-shot');im.src=PCE_MANIFEST.shots[p.staticImage];im.alt=title;im.draggable=false;box.append(im);}
  else if(kind==='list')mfList(p,box);else if(kind==='static')mfStatic(p,box,label);else if(kind==='blank-map')mfBlankMap(box);else mfDetail(p,box);
  show('manifestScreen',title);
  const bc=(p.breadcrumbs&&p.breadcrumbs.length?p.breadcrumbs:['Home',...(btn.dataset.path||'').split(' > ').filter(Boolean)]);
  $('crumbServers').hidden=bc.length<2;$('crumbSection').textContent=bc[1]||'';
  $('breadcrumbProfiles').textContent=bc[2]||title;$('breadcrumbSuffix').hidden=true;
  markNav(btn);
 }
 function markNav(btn){
  document.querySelectorAll('.side-nav button').forEach(b=>{b.classList.remove('active');b.removeAttribute('aria-current');});
  btn.classList.add('active');btn.setAttribute('aria-current','page');
  let p=btn.parentElement;while(p&&p.classList.contains('nav-children')){if(p.hidden){p.hidden=false;const h=document.querySelector('[aria-controls="'+p.id+'"]');if(h){h.setAttribute('aria-expanded','true');const ch=h.querySelector('.chevron');if(ch)ch.textContent='⌄';}}p=p.parentElement;}
 }
 document.querySelectorAll('.side-nav [data-group]').forEach(h=>h.addEventListener('click',()=>{
  const c=$(h.getAttribute('aria-controls'));const open=c.hidden;c.hidden=!open;h.setAttribute('aria-expanded',String(open));const ch=h.querySelector('.chevron');if(ch)ch.textContent=open?'⌄':'›';
 }));
 document.querySelectorAll('.side-nav [data-route]').forEach(b=>b.addEventListener('click',()=>openRoute(b)));
 // account menu (top right) opens Reset lab
 {const av=document.querySelector('.user-avatar');if(av){av.disabled=false;av.setAttribute('aria-label','Account menu');av.title='Reset lab';av.addEventListener('click',()=>$('resetDialog').showModal());}}
