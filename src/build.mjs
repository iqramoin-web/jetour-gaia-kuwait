// Static site generator: node src/build.mjs  ->  writes site/en/**, site/ar/**, site/index.html
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from './config.mjs';
import { ctxFor, doc } from './components.mjs';
import * as A from './pages-a.mjs';
import * as B from './pages-b.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const PAGES = { ...A, ...B };
let n = 0;

for (const lang of ['en', 'ar']) {
  for (const key of Object.keys(ROUTES)) {
    const fn = PAGES[key];
    if (!fn) throw new Error('Missing page function: ' + key);
    const c = ctxFor(lang, key);
    const page = fn(c);
    let html = doc(c, page);
    if (page.bodyClass) html = html.replace(`<body data-page="${key}">`, `<body data-page="${key}" class="${page.bodyClass}">`);
    const file = join(OUT, lang, ROUTES[key], 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    n++;
  }
}

// Root: pick language from saved choice or browser, default English.
writeFileSync(join(OUT, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>JETOUR GAIA Kuwait</title>
<script>var l='en';try{l=localStorage.getItem('gaia_lang')||((navigator.language||'').toLowerCase().indexOf('ar')===0?'ar':'en')}catch(e){}location.replace('/'+l+'/'+location.search);</script>
<meta http-equiv="refresh" content="0;url=/en/"></head><body style="background:#1F1F22"></body></html>`);

writeFileSync(join(OUT, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Not found | JETOUR GAIA</title><link rel="stylesheet" href="/assets/css/main.css"></head><body><main class="notfound"><p class="eyebrow">404</p><h1 class="display-2">Off the map.</h1><p class="lead" dir="rtl">الصفحة غير موجودة.</p><div class="btn-row center"><a class="btn" href="/en/"><span>Home</span></a><a class="btn btn-ghost" href="/ar/"><span>الرئيسية</span></a></div></main></body></html>`);

console.log(`Built ${n} pages into ${OUT}`);
