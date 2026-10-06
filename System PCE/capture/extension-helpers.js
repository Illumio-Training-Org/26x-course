// Browser-side helpers for the Claude-in-Chrome capture route (see the
// pce-capture skill). Inject once per Console page load with javascript_tool
// (after also injecting capture-page.js as window.__capFn - see the skill).
// Everything here is READ-ONLY except:
//   - clicking "Continue in Read-Only Mode" on expired-trial notices
//   - hiding banners/pop-ups/toasts in the local DOM for screenshots
//   - a temporary full-screen "copy" button that writes JSON to the clipboard
(() => {
  const ANON = s => s.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, 'admin@illumio-lab.invalid');
  const dismissTrial = () => { const d = [...document.querySelectorAll('button')].find(b => /Continue in Read-Only Mode/i.test(b.innerText || '')); if (d) d.click(); };

  // Before a screenshot: anonymise e-mails in the DOM, hide trial banners and toasts.
  window.__prep = () => {
    dismissTrial();
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) if (/@/.test(n.nodeValue)) n.nodeValue = ANON(n.nodeValue);
    [...document.querySelectorAll('div,section')].filter(e => {
      const t = (e.innerText || '').trim(), r = e.getBoundingClientRect();
      return ((/^Time's up!/.test(t) || /^Read Only/.test(t)) && r.height > 20 && r.height < 70) ||
             (/You're viewing historical data/.test(t) && r.height < 160 && r.width < 500);
    }).forEach(e => { e.style.display = 'none'; });
    return 'prepped';
  };

  // Hide modal dialogs/overlays (never submits them). Keeps the Segmentation
  // Templates "load a file" notice, which is how that page really opens.
  window.__hideModals = () => {
    let n = 0;
    document.querySelectorAll('[role=dialog],[aria-modal=true],dialog[open]').forEach(d => {
      if (/Segmentation Templates/.test(d.innerText || '')) return;
      let p = d; for (let i = 0; i < 3 && p.parentElement && p.parentElement !== document.body; i++) p = p.parentElement;
      p.style.display = 'none'; n++;
    });
    [...document.querySelectorAll('body *')].filter(e => {
      if (getComputedStyle(e).position !== 'fixed') return false;
      const r = e.getBoundingClientRect(); return r.width >= innerWidth * 0.9 && r.height >= innerHeight * 0.9;
    }).forEach(e => { e.style.display = 'none'; n++; });
    return 'hidden ' + n;
  };

  // Capture the current page (needs window.__capFn) and store it under its
  // requested route in localStorage key __pcecap. Returns a one-line summary.
  window.__capNow = route => {
    dismissTrial();
    let p; try { p = window.__capFn(); } catch (e) { p = { route, error: String(e) }; }
    p = JSON.parse(ANON(JSON.stringify(p)));
    const all = JSON.parse(localStorage.getItem('__pcecap') || '{}'); all[route] = p;
    localStorage.setItem('__pcecap', JSON.stringify(all));
    const shape = p.columns ? p.columns.length + ' cols/' + p.rowCount + ' rows' : p.attributes ? p.attributes.length + ' sections' : (p.sections || []).length + ' headings';
    return route + ' -> ' + p.route + ' | ' + p.title + ' [' + shape + ']';
  };

  // Put a JSON string on the clipboard. Clipboard writes need a real click, so
  // this adds a full-screen button: click it with the computer tool at the
  // viewport centre, then read the data locally with `pbpaste`.
  window.__copyOverlay = json => {
    const b = document.createElement('button'); b.id = '__copycap';
    b.textContent = 'Copying capture to clipboard - click';
    b.style.cssText = 'position:fixed;inset:0;z-index:2147483647;font-size:28px;background:rgba(32,38,54,.85);color:#fff;border:0';
    b.onclick = async () => { try { await navigator.clipboard.writeText(json); b.textContent = 'COPIED'; } catch (e) { b.textContent = 'FAILED ' + e; } setTimeout(() => b.remove(), 1200); };
    document.body.append(b); return 'overlay added, ' + json.length + ' chars';
  };

  // Tidy up after a capture run.
  window.__cleanup = () => { localStorage.removeItem('__pcecap'); return 'cleaned'; };
  return 'helpers ready';
})()
