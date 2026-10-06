// Read-only: returns the real Console sidebar as a tree of
// {l: label, r: route, i: icon, c: children}. Collapsed groups are read
// from textContent, so nothing needs to be expanded.
(() => {
  const iconOf = e => { const s = e.querySelector('[data-tid^="comp-icon"]'); return s ? s.getAttribute('data-tid').split(' ').pop().replace('comp-icon-', '') : ''; };
  const clean = s => s.trim().replace(/\s+/g, ' ');
  function item(li) {
    const a = li.querySelector(':scope > a');
    if (a) return { l: clean(a.textContent), r: (a.getAttribute('href') || '').split('?')[0].split('#/')[1] || '', i: iconOf(a) };
    const ul = li.querySelector(':scope > ul');
    return ul ? group(ul) : null;
  }
  function group(ul) {
    const lis = [...ul.children];
    return { l: clean(lis[0].textContent), i: iconOf(lis[0]), c: lis.slice(1).map(item).filter(Boolean) };
  }
  const first = document.querySelector('a[data-tid~="comp-sidenav-item"]') || document.querySelector('[data-tid~="comp-sidenav-item"]');
  let root = first;
  while (root && !(root.tagName === 'UL' && root.parentElement && !root.parentElement.closest('ul'))) root = root.parentElement;
  return [...root.children].map(item).filter(Boolean);
})()
