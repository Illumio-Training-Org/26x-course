// Read-only page capture for the real Illumio PCE Console.
// Runs inside a Console page (Playwright page.evaluate, or the browser
// console) and returns a structural description of the current view:
// title, breadcrumbs, banner, tabs, toolbar buttons, filter, grid columns,
// a few sample rows, pagination and detail-page sections. It only READS the
// DOM - it never clicks anything.
//
// Hooks are the Console's own stable data-tid attributes, e.g.
// comp-navbar-label, comp-breadcrumbs, comp-toolbar, comp-button,
// comp-selector, comp-grid-column-<key>, comp-pagination.
(() => {
  const T = e => (e ? e.innerText || e.textContent || '' : '').replace(/\s+/g, ' ').trim();
  const tid = e => (e.getAttribute('data-tid') || '').split(' ');
  const all = sel => [...document.querySelectorAll(sel)];
  const visible = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const inMain = e => !e.closest('nav,[role=navigation],[role=menu]') && e.getBoundingClientRect().left > 180;
  const MAX_ROWS = 5;

  const out = { route: location.hash.split('?')[0].replace(/^#\//, ''), capturedAt: new Date().toISOString() };

  // title + breadcrumbs
  out.title = T(document.querySelector('[data-tid~="comp-navbar-label"]')) || T(document.querySelector('h1'));
  const bc = document.querySelector('[data-tid~="comp-breadcrumbs"]');
  out.breadcrumbs = bc ? all('[data-tid^="comp-breadcrumbs-item"]').map(T).filter(Boolean) : [];

  // intro banner: the block holding a "Learn more" control (skip trial/read-only notices)
  const learn = all('button,a').find(b => /^learn more$/i.test(T(b)) && inMain(b));
  if (learn) {
    let box = learn.parentElement;
    for (let i = 0; i < 4 && box && T(box).length < 40; i++) box = box.parentElement;
    const head = box && box.querySelector('h1,h2,h3,h4,strong,[class*="title" i]');
    out.banner = { title: T(head), text: T(box).replace(T(head), '').replace(/learn more/i, '').trim().slice(0, 600) };
  }

  // tabs
  out.tabs = all('[role=tab],[data-tid*="comp-tab"]').filter(e => inMain(e) && visible(e)).map(e => ({
    label: T(e), active: e.getAttribute('aria-selected') === 'true' || /active|selected/i.test(e.className),
  })).filter(t => t.label && !['Columns', 'Filters'].includes(t.label));   // skip AG Grid side-bar panels

  // toolbar buttons (main area only)
  out.toolbar = all('[data-tid~="comp-toolbar"] [data-tid~="comp-button"], [data-tid~="comp-toolbar"] button').filter(inMain)
    .filter((e, i, a) => a.indexOf(e) === i && visible(e)).map(b => ({
      label: T(b) || b.getAttribute('aria-label') || b.getAttribute('title') || '',
      disabled: b.disabled || b.getAttribute('aria-disabled') === 'true',
      icons: [...b.querySelectorAll('[data-tid^="comp-icon"]')].map(i => tid(i).pop().replace('comp-icon-', '')),
    })).filter(b => b.label || b.icons.length);

  // filter / selector placeholder
  const sel = document.querySelector('[data-tid~="comp-selector"]');
  if (sel && inMain(sel)) {
    const inp = sel.querySelector('input,textarea');
    out.filter = (inp && inp.getAttribute('placeholder')) || T(sel.querySelector('[data-tid~="comp-selector-legend"]')) || T(sel);
  }

  // grid: header row gives the columns; each body row is read on its own so
  // empty cells can't shift values into the wrong row
  const grid = document.querySelector('[data-tid~="comp-grid"]');
  if (grid) {
    const keyOf = c => tid(c).find(t => t.startsWith('comp-grid-column-')).replace('comp-grid-column-', '');
    const head = grid.querySelector('[data-tid~="comp-grid-header-row"]');
    out.columns = head ? [...head.querySelectorAll('[data-tid^="comp-grid-column-"]')].map(c => ({ key: keyOf(c), label: T(c) })) : [];
    const rowEls = [...grid.querySelectorAll('[data-tid~="comp-grid-row"]')];
    out.rows = rowEls.slice(0, MAX_ROWS).map(r => { const o = {}; [...r.querySelectorAll('[data-tid^="comp-grid-column-"]')].forEach(c => { o[keyOf(c)] = T(c).slice(0, 160); }); return o; });
    out.rowCount = rowEls.length;
    out.pagination = T(document.querySelector('[data-tid~="comp-pagination"]'));
  }

  // newer pages use AG Grid (e.g. Labels, Label Types, Users): merge the
  // pinned + centre containers by row-index, and keep column-group headers
  const ag = !grid && document.querySelector('.ag-root-wrapper');
  if (ag) {
    const seen = new Set();
    out.grid = 'ag-grid';
    out.columns = [...ag.querySelectorAll('.ag-header-cell[col-id]')].filter(h => { const k = h.getAttribute('col-id'); if (seen.has(k)) return false; seen.add(k); return true; })
      .map(h => ({ key: h.getAttribute('col-id'), label: T(h.querySelector('.ag-header-cell-text')) || T(h) }));
    out.columnGroups = [...ag.querySelectorAll('.ag-header-group-cell')].map(T).filter(Boolean);
    const byIdx = {};
    [...ag.querySelectorAll('.ag-row')].forEach(r => { const i = r.getAttribute('row-index'); byIdx[i] = byIdx[i] || {}; [...r.querySelectorAll('.ag-cell[col-id]')].forEach(c => { byIdx[i][c.getAttribute('col-id')] = T(c).slice(0, 160); }); });
    const idx = Object.keys(byIdx).map(Number).sort((a, b) => a - b);
    out.rows = idx.slice(0, MAX_ROWS).map(i => byIdx[i]);
    out.rowCount = idx.length;
    out.pagination = T(document.querySelector('.ag-paging-panel')) || T(document.querySelector('[data-tid~="comp-pagination"]'));
  }

  // detail-style pages: section headings with their field labels
  if (!grid && !ag) {
    out.sections = all('h2,h3,[data-tid*="section-title"],[class*="sectionTitle" i]').filter(e => inMain(e) && visible(e)).slice(0, 20).map(h => {
      const sec = h.closest('section,[class*="section" i]') || h.parentElement;
      const labels = sec ? all('[class*="label" i], dt, label').filter(l => sec.contains(l) && visible(l)).map(T).filter(s => s && s.length < 60) : [];
      return { heading: T(h), labels: [...new Set(labels)].slice(0, 25) };
    });
  }

  // anonymise e-mail addresses in captured text
  return JSON.parse(JSON.stringify(out).replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, 'admin@illumio-lab.invalid'));
})()
