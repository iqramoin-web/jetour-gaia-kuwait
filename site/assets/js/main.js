/* JETOUR GAIA Kuwait: site behaviour. No framework. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const lang = document.documentElement.lang;
  const isAr = lang === 'ar';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };
  const loadScript = (src, mod) => new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement('script');
    s.src = src; if (mod) s.type = 'module';
    s.onload = res; s.onerror = rej; document.head.appendChild(s);
  });
  const loadCss = (href) => { if (!$(`link[href="${href}"]`)) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l); } };
  const fmt = (n) => Math.round(n).toLocaleString(isAr ? 'ar-KW' : 'en-US');

  /* ---- Campaign source (UTM) captured once per session for lead tagging ---- */
  try {
    const q = new URLSearchParams(location.search);
    if (q.get('utm_source') && !sessionStorage.getItem('gaia_utm')) {
      sessionStorage.setItem('gaia_utm', JSON.stringify(Object.fromEntries([...q].filter(([k]) => k.startsWith('utm_') || k === 'gclid'))));
    }
  } catch (e) { /* ignore */ }

  /* ---- Language choice ---- */
  $$('[data-lang-switch]').forEach((a) => a.addEventListener('click', () => { try { localStorage.setItem('gaia_lang', a.dataset.langSwitch); } catch (e) { /* ignore */ } }));

  /* ---- Header ---- */
  const header = $('[data-header]');
  const mobileCta = $('[data-mobile-cta]');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-solid', y > 40);
    const menuOpen = header.classList.contains('menu-open') || $('.nav-item.is-open');
    header.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY && !$('[data-subnav]'));
    if (mobileCta) mobileCta.classList.toggle('is-shown', y > innerHeight * 0.7 && !mobileCta.hasAttribute('data-hide'));
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Hide mobile CTA while a form section is on screen.
  const formSecs = $$('#book, #form, #register, #visit');
  if (mobileCta && formSecs.length) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { mobileCta.toggleAttribute('data-hide', e.isIntersecting); onScroll(); }), { threshold: 0.15 });
    formSecs.forEach((s) => io.observe(s));
  }

  // Mega menu
  const items = $$('[data-nav-item]');
  const closeAll = (except) => items.forEach((it) => { if (it !== except) { it.classList.remove('is-open'); $('.nav-btn', it).setAttribute('aria-expanded', 'false'); } });
  items.forEach((it) => {
    const b = $('.nav-btn', it);
    let t;
    const open = () => { clearTimeout(t); closeAll(it); it.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); };
    const close = () => { t = setTimeout(() => { it.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false'); }, 160); };
    b.addEventListener('click', () => (it.classList.contains('is-open') ? (it.classList.remove('is-open'), b.setAttribute('aria-expanded', 'false')) : open()));
    if (matchMedia('(hover: hover)').matches) { it.addEventListener('mouseenter', open); it.addEventListener('mouseleave', close); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAll(); toggleDrawer(false); } });
  document.addEventListener('click', (e) => { if (!e.target.closest('[data-nav-item]')) closeAll(); });

  // Drawer
  const burger = $('[data-burger]');
  const drawer = $('[data-drawer]');
  function toggleDrawer(force) {
    if (!drawer) return;
    const open = force ?? !drawer.classList.contains('is-open');
    drawer.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger?.addEventListener('click', () => toggleDrawer());

  /* ---- Reveal on scroll ---- */
  const rio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => rio.observe(el));

  // Light parallax on manifesto
  const mbg = $('.manifesto-bg');
  if (mbg && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addEventListener('scroll', () => { const r = mbg.parentElement.getBoundingClientRect(); mbg.style.setProperty('--py', `${(r.top / innerHeight) * -60}px`); }, { passive: true });
  }

  /* ---- Hero film ---- */
  const vid = $('[data-hero-video]');
  const ft = $('[data-film-toggle]');
  if (vid && ft) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { vid.pause(); ft.setAttribute('aria-pressed', 'true'); }
    const ring = $('[data-film-ring]', ft);
    vid.addEventListener('timeupdate', () => { if (vid.duration) ring.style.strokeDashoffset = String(100 - (vid.currentTime / vid.duration) * 100); });
    ft.addEventListener('click', () => {
      const paused = !vid.paused; paused ? vid.pause() : vid.play();
      ft.setAttribute('aria-pressed', String(paused));
      ft.setAttribute('aria-label', paused ? (isAr ? 'تشغيل الفيلم' : 'Play film') : (isAr ? 'إيقاف الفيلم' : 'Pause film'));
    });
  }

  /* ---- Colour pickers ---- */
  const swapImg = (img, src) => { if (img.getAttribute('src') === src) return; img.classList.add('is-swapping'); const pre = new Image(); pre.onload = () => { img.src = src; img.classList.remove('is-swapping'); }; pre.src = src; };
  $$('[data-colour-picker]').forEach((p) => {
    const img = $('[data-colour-img]', p); const name = $('[data-colour-name]', p);
    $$('.swatch', p).forEach((s) => {
      new Image().src = s.dataset.src; // warm cache
      s.addEventListener('click', () => {
        $$('.swatch', p).forEach((x) => x.setAttribute('aria-checked', String(x === s)));
        swapImg(img, s.dataset.src); name.textContent = s.dataset.name;
      });
    });
    radioKeys($('.swatches', p), '.swatch');
  });
  function radioKeys(group, sel) {
    if (!group) return;
    group.addEventListener('keydown', (e) => {
      const opts = $$(sel, group); const i = opts.indexOf(document.activeElement); if (i < 0) return;
      const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!dir) return;
      e.preventDefault(); const n = opts[(i + (isAr && e.key.startsWith('Arrow') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') ? -dir : dir) + opts.length) % opts.length]; n.focus(); n.click();
    });
  }

  /* ---- 360 spin ---- */
  $$('[data-spin]').forEach((el) => {
    const frames = JSON.parse(el.dataset.spin); const img = $('[data-spin-img]', el);
    frames.forEach((f) => { new Image().src = f; });
    let i = 0, startX = 0, startI = 0, down = false;
    const set = (n) => { i = ((n % frames.length) + frames.length) % frames.length; img.src = frames[i]; };
    el.addEventListener('pointerdown', (e) => { down = true; startX = e.clientX; startI = i; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', (e) => { if (down) set(startI + Math.round((startX - e.clientX) / (el.clientWidth / (frames.length * 1.2)))); });
    ['pointerup', 'pointercancel'].forEach((t) => el.addEventListener(t, () => { down = false; }));
    el.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') set(i - 1); if (e.key === 'ArrowRight') set(i + 1); });
  });

  /* ---- Interior 360 (Pannellum, loaded on demand) ---- */
  const PNLM = 'https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/';
  async function startPano(el, src) {
    loadCss(PNLM + 'pannellum.css'); await loadScript(PNLM + 'pannellum.js');
    if (el._viewer) el._viewer.destroy();
    el.innerHTML = '';
    el._viewer = window.pannellum.viewer(el, { type: 'equirectangular', panorama: src, autoLoad: true, showControls: true, showFullscreenCtrl: true, showZoomCtrl: false, compass: false, hfov: 105, autoRotate: -2, autoRotateInactivityDelay: 4000, mouseZoom: false });
    el.dataset.started = '1';
  }
  $$('[data-pano-wrap]').forEach((w) => {
    const pano = $('[data-pano]', w);
    $('[data-pano-start]', w)?.addEventListener('click', () => startPano(pano, pano.dataset.pano));
    $$('[data-pano-src]', w).forEach((chip) => chip.addEventListener('click', () => {
      $$('[data-pano-src]', w).forEach((x) => x.setAttribute('aria-checked', String(x === chip)));
      pano.dataset.pano = chip.dataset.panoSrc;
      if (pano.dataset.started) startPano(pano, chip.dataset.panoSrc);
      else { const p = $('.pano-poster', pano); if (p) p.style.backgroundImage = `url(${chip.dataset.panoSrc})`; }
    }));
  });

  /* ---- Showcase: rotating exterior + interior 360 ---- */
  $$('[data-showcase]').forEach((sc) => {
    const img = $('[data-sc-img]', sc); const name = $('[data-sc-name]', sc); const pano = $('[data-pano]', sc);
    const stage = $('[data-sc-view=ext]', sc); const N = +sc.dataset.frames; const base = sc.dataset.base;
    let colour = $('[data-sc-pill=ext] [aria-checked=true]', sc).dataset.colour, f = 0, raf = 0, auto = true;
    const cache = {};
    const src = (k, i) => `${base}${k}/${i}.webp`;
    const preload = (k) => { if (cache[k]) return cache[k]; cache[k] = Promise.all(Array.from({ length: N }, (_, i) => new Promise((r) => { const im = new Image(); im.onload = im.onerror = r; im.src = src(k, i); }))); return cache[k]; };
    const show = (i) => { f = ((i % N) + N) % N; img.src = src(colour, f); };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Gentle continuous turn once frames are ready, until the visitor drags.
    const spinLoop = () => { let last = 0; const step = (t) => { if (!auto) return; if (t - last > 90) { show(f + 1); last = t; } raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); };
    const vio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { preload(colour); } else cancelAnimationFrame(raf); }), { threshold: 0.2 });
    vio.observe(stage);
    let down = false, sx = 0, sf = 0;
    stage.addEventListener('pointerdown', (e) => { down = true; auto = false; cancelAnimationFrame(raf); sx = e.clientX; sf = f; stage.setPointerCapture(e.pointerId); stage.classList.add('is-drag'); });
    stage.addEventListener('pointermove', (e) => { if (down) show(sf + Math.round((sx - e.clientX) / (stage.clientWidth / (N * 1.1)))); });
    ['pointerup', 'pointercancel'].forEach((t) => stage.addEventListener(t, () => { down = false; stage.classList.remove('is-drag'); }));
    stage.tabIndex = 0;
    stage.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { auto = false; cancelAnimationFrame(raf); show(f + (e.key === 'ArrowRight' ? 1 : -1)); } });
    const names = { ext: name.textContent, int: $('[data-sc-pill=int] [aria-checked=true]', sc).dataset.name };
    $$('[data-sc-tab]', sc).forEach((t) => t.addEventListener('click', () => {
      const k = t.dataset.scTab;
      $$('[data-sc-tab]', sc).forEach((x) => x.setAttribute('aria-selected', String(x === t)));
      $$('[data-sc-view]', sc).forEach((v) => { v.hidden = v.dataset.scView !== k; });
      $$('[data-sc-pill]', sc).forEach((p) => { p.hidden = p.dataset.scPill !== k; });
      sc.classList.toggle('is-int', k === 'int');
      name.textContent = names[k];
      if (k === 'int' && !pano.dataset.started) startPano(pano, pano.dataset.pano);
    }));
    $$('[data-sc-pill=ext] .swatch', sc).forEach((s) => s.addEventListener('click', () => {
      $$('[data-sc-pill=ext] .swatch', sc).forEach((x) => x.setAttribute('aria-checked', String(x === s)));
      colour = s.dataset.colour; names.ext = name.textContent = s.dataset.name; img.alt = 'G700 ' + s.dataset.name;
      const pre = new Image(); pre.onload = () => show(f); pre.src = src(colour, f); preload(colour);
    }));
    $$('[data-sc-pill=int] .swatch', sc).forEach((s) => s.addEventListener('click', () => {
      $$('[data-sc-pill=int] .swatch', sc).forEach((x) => x.setAttribute('aria-checked', String(x === s)));
      names.int = name.textContent = s.dataset.name; pano.dataset.pano = s.dataset.panoSrc; startPano(pano, s.dataset.panoSrc);
    }));
    radioKeys($('[data-sc-pill=ext]', sc), '.swatch'); radioKeys($('[data-sc-pill=int]', sc), '.swatch');
  });

  /* ---- 3D model (model-viewer, loaded when visible) ---- */
  const MV = 'https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';
  function mountModel(box, src) {
    src = src || box.dataset.model;
    if (box.dataset.mounted === src) return box.querySelector('model-viewer');
    box.dataset.mounted = src;
    if (!self.ModelViewerElement) self.ModelViewerElement = { meshoptDecoderLocation: 'https://unpkg.com/meshoptimizer@0.20.0/meshopt_decoder.js' };
    loadScript(MV, true);
    box.innerHTML = `<model-viewer src="${src}" alt="${box.dataset.modelAlt || ''}" camera-controls touch-action="pan-y" auto-rotate auto-rotate-delay="2500" rotation-per-second="12deg" shadow-intensity="1" exposure="1" environment-image="neutral" camera-orbit="35deg 78deg auto" interaction-prompt="auto"></model-viewer><p class="viewer-loading" data-mv-loading>${isAr ? 'جارٍ تحميل النموذج…' : 'Loading 3D model…'}</p>`;
    const mv = box.querySelector('model-viewer');
    mv.addEventListener('load', () => { box.querySelector('[data-mv-loading]')?.remove(); box.dispatchEvent(new CustomEvent('model-ready', { detail: mv })); }, { once: true });
    mv.addEventListener('error', () => { const l = box.querySelector('[data-mv-loading]'); if (l) l.textContent = isAr ? 'تعذّر تحميل النموذج' : '3D model unavailable'; });
    return mv;
  }
  const mio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && e.target.offsetParent !== null) { mountModel(e.target); mio.unobserve(e.target); } }), { rootMargin: '200px' });
  $$('.viewer3d').forEach((b) => { if (!b.closest('[data-configurator]')) mio.observe(b); });

  /* ---- Tabs ---- */
  $$('[data-tabs]').forEach((t) => {
    const tabs = $$('[role=tab]', t);
    tabs.forEach((b) => b.addEventListener('click', () => {
      tabs.forEach((x) => { const on = x === b; x.setAttribute('aria-selected', String(on)); $('#' + x.getAttribute('aria-controls')).hidden = !on; });
      const p = $('#' + b.getAttribute('aria-controls'));
      const v = $('.viewer3d', p); if (v) mountModel(v);
    }));
  });

  /* ---- Pillars accordion ---- */
  $$('[data-pillars]').forEach((wrap) => {
    const ps = $$('.pillar', wrap);
    const open = (p) => ps.forEach((x) => x.classList.toggle('is-open', x === p));
    ps.forEach((p) => { p.addEventListener('mouseenter', () => matchMedia('(hover: hover)').matches && open(p)); p.addEventListener('click', () => open(p)); p.addEventListener('focus', () => open(p)); });
  });

  /* ---- Sub-nav active section ---- */
  const sub = $('[data-subnav]');
  if (sub) {
    const links = $$('a[href^="#"]', sub);
    const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((l) => { const s = $(l.getAttribute('href')); if (s) sio.observe(s); });
  }

  /* ---- Events filter ---- */
  $$('[data-filter]').forEach((f) => {
    $$('[data-filter-btn]', f).forEach((b) => b.addEventListener('click', () => {
      $$('[data-filter-btn]', f).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const k = b.dataset.filterBtn; $$('[data-cat]').forEach((e) => e.classList.toggle('is-filtered', k !== 'all' && e.dataset.cat !== k));
    }));
  });
  $$('[data-event-pick]').forEach((a) => a.addEventListener('click', () => { const s = $('select[name=event]'); if (s) s.value = a.dataset.eventPick; }));

  /* ---- Build state shared across pages ---- */
  const getBuild = () => store.get('gaia_build', null);
  const buildText = (b) => {
    if (!b) return '';
    const d = b.labels || {};
    return [b.model?.toUpperCase(), d.colour, d.interior, (d.acc || []).length ? (d.acc || []).join(', ') : null, b.sig ? `“${b.sig}”` : null].filter(Boolean).join(' · ');
  };

  /* ---- Forms ---- */
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  $$('[data-min-today]').forEach((i) => { i.min = today.toISOString().slice(0, 10); });

  $$('[data-lead-form]').forEach((form) => {
    // Show build on test-drive form
    const att = $('[data-build-attach]', form); const b = getBuild();
    if (att && b) { att.hidden = false; $('[data-build-summary]', att).textContent = buildText(b); const m = $('select[name=model]', form); if (m && b.model) m.value = b.model.toUpperCase(); }
    // Conditional fields
    $$('[data-show-if]', form).forEach((el) => {
      const [n, v] = el.dataset.showIf.split('=');
      const upd = () => { el.hidden = (form.elements[n]?.value) !== v; };
      $$(`[name=${n}]`, form).forEach((r) => r.addEventListener('change', upd)); upd();
    });
    // Preselect from URL (?model=F700, ?place=home)
    const q = new URLSearchParams(location.search);
    ['model', 'place', 'centre', 'event'].forEach((k) => { if (q.get(k) && form.elements[k]) { try { form.elements[k].value = q.get(k).toUpperCase() === 'F700' || q.get(k).toUpperCase() === 'G700' ? q.get(k).toUpperCase() : q.get(k); } catch (e) { /* ignore */ } } });

    const digitsOnly = $('input[name=mobile]', form);
    digitsOnly?.addEventListener('input', () => { digitsOnly.value = digitsOnly.value.replace(/\D/g, '').slice(0, 8); });

    form.addEventListener('input', (e) => { const f = e.target.closest('.field, .check'); if (f && e.target.checkValidity()) f.classList.remove('is-invalid'); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      $$('input, select, textarea', form).forEach((el) => {
        if (el.closest('[hidden]')) return;
        const valid = el.checkValidity();
        el.closest('.field, .check')?.classList.toggle('is-invalid', !valid);
        if (!valid && ok) { ok = false; el.focus(); }
      });
      $('[data-form-error]', form).hidden = ok;
      if (!ok) return;
      const data = Object.fromEntries(new FormData(form));
      if (data.mobile) data.mobile = '+965' + data.mobile;
      let audience = form.dataset.audience;
      if (form.dataset.type === 'club' && data.status === 'prospect') audience = 'prospect';
      if (form.dataset.type === 'testdrive' && store.get('gaia_tradein', false)) audience = 'tseries';
      const lead = { type: form.dataset.type, audience, source: form.dataset.source, lang, utm: (() => { try { return JSON.parse(sessionStorage.getItem('gaia_utm') || 'null'); } catch (x) { return null; } })(), build: ['testdrive', 'build'].includes(form.dataset.type) ? getBuild() : undefined, data, ts: new Date().toISOString() };
      const leads = store.get('gaia_leads', []); leads.push(lead); store.set('gaia_leads', leads);
      if (form.dataset.type === 'tradein') store.set('gaia_tradein', true);
      // TODO: POST `lead` to the Al Mulla CRM endpoint once confirmed.
      window.dispatchEvent(new CustomEvent('gaia:lead', { detail: lead }));
      try { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'lead_submit', lead_type: lead.type, lead_audience: lead.audience, lead_source: lead.source }); } catch (x) { /* ignore */ }
      $('.form-body', form).hidden = true; $('.form-head', form)?.setAttribute('hidden', '');
      const s = $('[data-form-success]', form); s.hidden = false; s.focus({ preventScroll: true });
      s.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  /* ---- Finance calculator ---- */
  const calc = $('[data-calc]');
  if (calc) {
    const kd = calc.dataset.kd;
    const inp = (k) => $(`[data-in=${k}]`, calc); const out = (k) => $$(`[data-out=${k}]`, calc);
    const set = (k, v) => out(k).forEach((o) => { o.textContent = v; });
    const run = () => {
      const price = +inp('price').value, downPct = +inp('down').value, term = +inp('term').value, rate = +inp('rate').value;
      const down = (price * downPct) / 100, fin = price - down, profit = fin * (rate / 100) * (term / 12), total = fin + profit, monthly = total / term;
      set('price', `${fmt(price)} ${kd}`); set('down', `${downPct}%`); set('term', `${term} ${isAr ? 'شهراً' : 'months'}`); set('rate', `${rate}%`);
      set('monthly', `${fmt(monthly)} ${kd}`); set('downKD', `${fmt(down)} ${kd}`); set('fin', `${fmt(fin)} ${kd}`); set('total', `${fmt(total + down)} ${kd}`);
      calc._v = { price, down, term, model: $('[name=calc-model]:checked', calc).dataset.model };
    };
    $$('input', calc).forEach((i) => i.addEventListener('input', run));
    $$('[name=calc-model]', calc).forEach((r) => r.addEventListener('change', () => { inp('price').value = r.value; run(); }));
    run();
    $('[data-calc-apply]', calc).addEventListener('click', () => {
      const f = $('[data-type=finance]'); if (!f) return; const v = calc._v;
      f.elements.model.value = v.model; f.elements.down.value = Math.round(v.down); f.elements.term.value = String(v.term);
    });
  }

  /* ---- Configurator ---- */
  const cfg = $('[data-configurator]');
  if (cfg) {
    const D = JSON.parse($('[data-cfg-data]', cfg).textContent);
    const q = new URLSearchParams(location.search);
    const saved = getBuild();
    let st = { model: 'g700', colour: null, interior: 'black-beige', acc: [], sig: '' };
    if (saved && !q.get('preset') && !q.get('model')) st = { ...st, ...saved };
    if (q.get('model') === 'f700') st.model = 'f700';
    const pre = D.presets[q.get('preset')];
    if (pre) Object.assign(st, { model: 'g700', colour: pre.colour, interior: pre.interior, acc: [...pre.acc] });

    const img = $('[data-cfg-img]', cfg); const sw = $('[data-cfg-colours]', cfg);
    const pano = $('[data-cfg-view=interior] [data-pano]', cfg);
    const viewer = $('[data-cfg-view="3d"] .viewer3d', cfg);
    let view = 'photo';

    const renderColours = () => {
      const m = D.models[st.model];
      if (!m.colours.some((c) => c.k === st.colour)) st.colour = m.colours[0].k;
      sw.innerHTML = m.colours.map((c) => `<button class="swatch" role="radio" aria-checked="${c.k === st.colour}" aria-label="${c.n}" style="--sw:${c.hex}" data-k="${c.k}"></button>`).join('');
      $$('.swatch', sw).forEach((b) => { new Image().src = `/assets/${st.model}/colours/${b.dataset.k}.webp`; b.addEventListener('click', () => { st.colour = b.dataset.k; update(); }); });
    };
    const tintModel = () => {
      const mv = $('model-viewer', viewer); if (!mv || !mv.model) return;
      const c = D.models[st.model].colours.find((x) => x.k === st.colour); if (!c) return;
      const hex = c.hex.replace('#', ''); const rgb = [0, 2, 4].map((i) => (parseInt(hex.slice(i, i + 2), 16) / 255) ** 2.2);
      mv.model.materials.forEach((mat) => { if (/paint|body|car_?paint|exterior|shell/i.test(mat.name)) mat.pbrMetallicRoughness.setBaseColorFactor([...rgb, 1]); });
    };
    viewer?.addEventListener('model-ready', tintModel);
    const update = () => {
      const m = D.models[st.model];
      $('[data-cfg-name]', cfg).textContent = m.name;
      $('[data-cfg-price]', cfg).textContent = `${D.t.from} ${D.t.kd} ${m.from}*`;
      $$('[name=cfg-model]', cfg).forEach((r) => { r.checked = r.value === st.model; });
      renderColours();
      const col = m.colours.find((c) => c.k === st.colour);
      $('[data-cfg-colour-name]', cfg).textContent = col.n;
      swapImg(img, `/assets/${st.model}/colours/${st.colour}.webp`);
      img.alt = `${m.name} ${col.n}`;
      $$('[data-cfg-interior]', cfg).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.cfgInterior === st.interior)));
      $$('[data-cfg-acc]', cfg).forEach((c) => { c.checked = st.acc.includes(c.value); });
      $('[data-cfg-sig]', cfg).value = st.sig;
      const sp = $('[data-cfg-sig-preview]', cfg); sp.hidden = !st.sig; sp.textContent = st.sig;
      const pSrc = `/assets/${st.model}/interior/${st.interior}.webp`;
      if (pano.dataset.pano !== pSrc) { pano.dataset.pano = pSrc; if (view === 'interior') startPano(pano, pSrc); }
      if (viewer && view === '3d') { const mv = mountModel(viewer, `/assets/models/${st.model}.glb`); if (mv?.model) tintModel(); }
      const labels = { colour: col.n, interior: D.interiors.find((i) => i.k === st.interior).n, acc: st.acc.map((a) => D.acc[a]) };
      $('[data-cfg-summary]', cfg).innerHTML = [
        [isAr ? 'الطراز' : 'Model', m.name], [isAr ? 'اللون' : 'Colour', labels.colour], [isAr ? 'المقصورة' : 'Interior', labels.interior],
        [isAr ? 'الإكسسوارات' : 'Accessories', labels.acc.length ? labels.acc.join(isAr ? '، ' : ', ') : D.t.none], [D.t.sig, st.sig || D.t.none],
      ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
      store.set('gaia_build', { ...st, labels });
    };

    $$('[name=cfg-model]', cfg).forEach((r) => r.addEventListener('change', () => { st.model = r.value; update(); }));
    $$('[data-cfg-interior]', cfg).forEach((b) => b.addEventListener('click', () => { st.interior = b.dataset.cfgInterior; update(); }));
    $$('[data-cfg-acc]', cfg).forEach((c) => c.addEventListener('change', () => { st.acc = $$('[data-cfg-acc]:checked', cfg).map((x) => x.value); update(); }));
    $('[data-cfg-sig]', cfg).addEventListener('input', (e) => { st.sig = e.target.value; update(); });
    $$('[data-cfg-show]', cfg).forEach((b) => b.addEventListener('click', () => {
      view = b.dataset.cfgShow;
      $$('[data-cfg-show]', cfg).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
      $$('[data-cfg-view]', cfg).forEach((v) => { v.hidden = v.dataset.cfgView !== view; });
      if (view === 'interior') startPano(pano, pano.dataset.pano);
      if (view === '3d') { const mv = mountModel(viewer, `/assets/models/${st.model}.glb`); if (mv?.model) tintModel(); }
    }));
    radioKeys(sw, '.swatch');

    const modal = $('[data-cfg-modal]');
    $('[data-cfg-send]', cfg).addEventListener('click', () => modal.showModal());
    $('[data-modal-close]', modal).addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
    update();
  }
})();
