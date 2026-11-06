import { CONFIG, href } from './config.mjs';

export const A = (p) => `/assets/${p}`;
export const arrow = `<svg class="ico arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
const waIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>`;

export function ctxFor(lang, key) {
  const L = (en, ar) => (lang === 'ar' ? ar : en);
  return { lang, key, L, h: (k, hash) => href(lang, k, hash) };
}

/* ---------- Buttons & small parts ---------- */
export const btn = (url, label, cls = 'btn') => `<a class="${cls}" href="${url}"><span>${label}</span></a>`;
export const btnArrow = (url, label, cls = 'link-arrow') => `<a class="${cls}" href="${url}"><span>${label}</span>${arrow}</a>`;
export const eyebrow = (t) => `<p class="eyebrow">${t}</p>`;

/* ---------- Header / nav ---------- */
function nav(c) {
  const { L, h } = c;
  const sections = [
    { t: L('Models', 'الطرازات'), s: L('The cars', 'السيارات'), img: 'g700/colours/silver-snow.webp', links: [['g700', 'G700'], ['f700', L('F700 · Coming soon', 'F700 · قريباً')], ['build', L('Build your GAIA', 'صمّم GAIA الخاصة بك')]] },
    { t: L('Experience', 'التجربة'), s: L('Try it', 'جرّبها'), img: 'g700/web/p1_2.webp', links: [['testdrive', L('Test drive', 'تجربة القيادة')], ['showroom', L('Showroom', 'صالة العرض')], ['events', L('Events & drives', 'الفعاليات والرحلات')]] },
    { t: L('Ownership', 'الملكية'), s: L('Why trust GAIA', 'لماذا تثق بـ GAIA'), img: 'g700/web/p4_4.webp', links: [['promise', L('Al Mulla Promise', 'وعد الملا')], ['financing', L('Financing & leasing', 'التمويل والتأجير')], ['moveup', L('Moving up from T-Series', 'الانتقال من الفئة T')]] },
    { t: L('Owners', 'الملاك'), s: L('For G700 owners', 'لملاك G700'), img: 'g700/web/p4_2.webp', links: [['owners', L('Owners hub', 'مركز الملاك')], ['register', L('Register my vehicle', 'سجّل مركبتي')], ['service', L('Service booking', 'حجز الصيانة')]] },
    { t: L('GAIA Club', 'نادي GAIA'), s: L('Belong', 'انتمِ'), img: 'g700/web/p2_3.webp', links: [['club', L('Tiers & benefits', 'المستويات والمزايا')], ['academy', L('Off-road academy', 'أكاديمية الطرق الوعرة')], ['join', L('Join the Club', 'انضم إلى النادي')]] },
    { t: L('Discover', 'اكتشف'), s: L('Learn more', 'اعرف المزيد'), img: 'campaign/mall.webp', links: [['stories', L('Stories', 'القصص')], ['about', L('About GAIA', 'عن GAIA')], ['contact', L('Contact & locations', 'التواصل والمواقع')]] },
  ];
  return sections;
}

export function header(c) {
  const { L, h, lang, key } = c;
  const other = lang === 'en' ? 'ar' : 'en';
  const secs = nav(c);
  const menu = secs.map((s, i) => `
      <li class="nav-item" data-nav-item>
        <button class="nav-btn" aria-expanded="false" aria-controls="mega-${i}">${s.t}</button>
        <div class="mega" id="mega-${i}">
          <div class="mega-inner container">
            <div class="mega-head"><p class="eyebrow">${s.s}</p><p class="mega-title">${s.t}</p></div>
            <ul class="mega-links">${s.links.map(([k, t]) => `<li><a href="${h(k)}"${k === key ? ' aria-current="page"' : ''}>${t}${arrow}</a></li>`).join('')}</ul>
            <div class="mega-img" style="background-image:url(${A(s.img)})"></div>
          </div>
        </div>
      </li>`).join('');
  const drawer = secs.map((s) => `
      <details class="drawer-sec"><summary>${s.t}<span class="plus"></span></summary>
        <ul>${s.links.map(([k, t]) => `<li><a href="${h(k)}">${t}</a></li>`).join('')}</ul>
      </details>`).join('');
  return `
<a class="skip" href="#main">${L('Skip to content', 'تخطَّ إلى المحتوى')}</a>
<header class="site-header" data-header>
  <div class="container nav-bar">
    <a class="brand" href="${h('home')}" aria-label="JETOUR GAIA ${L('home', 'الرئيسية')}">
      <img src="${A('brand/jetour-white.png')}" alt="JETOUR" width="120" height="20">
    </a>
    <nav class="main-nav" aria-label="${L('Main', 'الرئيسية')}"><ul>${menu}</ul></nav>
    <div class="nav-cta">
      <a href="${href(other, key)}" class="util-link lang-switch" lang="${other}" hreflang="${other}" data-lang-switch="${other}">${lang === 'en' ? 'العربية' : 'English'}</a>
      <a class="btn btn-sm" href="${h('testdrive')}"><span>${L('Book a test drive', 'احجز تجربة قيادة')}</span></a>
      <button class="burger" aria-label="${L('Menu', 'القائمة')}" aria-expanded="false" data-burger><span></span><span></span></button>
    </div>
  </div>
  <div class="drawer" data-drawer>
    <div class="drawer-body">
      ${drawer}
      <div class="drawer-foot">
        <a class="btn" href="${h('testdrive')}"><span>${L('Book a test drive', 'احجز تجربة قيادة')}</span></a>
        <a class="btn btn-ghost" href="${h('owners')}"><span>${L('I own a G700', 'أملك G700')}</span></a>
        <a class="util-link" href="${href(other, key)}" lang="${other}" data-lang-switch="${other}">${lang === 'en' ? 'العربية' : 'English'}</a>
      </div>
    </div>
  </div>
</header>`;
}

export function footer(c) {
  const { L, h } = c;
  const secs = nav(c);
  return `
<footer class="site-footer">
  <div class="container">
    <div class="foot-top">
      <div class="foot-brand">
        <img src="${A('brand/jetour-slogan-white.png')}" alt="JETOUR" width="180" height="40" loading="lazy">
        <p>${L('JETOUR GAIA is sold, serviced and supported in Kuwait by Al Mulla Auto.', 'تُباع JETOUR GAIA وتُصان وتُدعم في الكويت من قِبل الملا للسيارات.')}</p>
        <div class="foot-actions">
          <a class="btn btn-sm" href="${h('testdrive')}"><span>${L('Book a test drive', 'احجز تجربة قيادة')}</span></a>
          <a class="btn btn-sm btn-ghost" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener"><span>WhatsApp</span></a>
        </div>
      </div>
      <div class="foot-cols">
        ${secs.map((s) => `<div><p class="foot-h">${s.t}</p><ul>${s.links.map(([k, t]) => `<li><a href="${h(k)}">${t}</a></li>`).join('')}</ul></div>`).join('')}
      </div>
    </div>
    <div class="foot-bottom">
      <p>© 2026 Al Mulla Auto · JETOUR GAIA Kuwait</p>
      <p class="foot-legal"><a href="${h('contact', '#privacy')}">${L('Privacy policy', 'سياسة الخصوصية')}</a><a href="${h('contact')}">${L('Terms', 'الشروط')}</a><span>${L('Prices and specifications are indicative and subject to change.', 'الأسعار والمواصفات إرشادية وقابلة للتغيير.')}</span></p>
    </div>
  </div>
</footer>
<a class="wa-fab" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" aria-label="${L('Chat with the GAIA concierge on WhatsApp', 'تحدّث مع كونسيرج GAIA عبر واتساب')}">${waIco}</a>
<div class="mobile-cta" data-mobile-cta>
  <a class="btn" href="${h('testdrive')}"><span>${L('Book a test drive', 'احجز تجربة قيادة')}</span></a>
  <a class="btn btn-ghost" href="${h('owners')}"><span>${L('I own a G700', 'أملك G700')}</span></a>
</div>`;
}

/* ---------- Sections ---------- */
export function pageHero(c, { eyebrow: eb, title, sub, img, video, ctas = [], align = 'bottom', tall = false, note }) {
  const media = video
    ? `<video class="hero-media" autoplay muted loop playsinline preload="metadata" poster="${A(img)}" data-hero-video><source src="${A(video)}" type="video/mp4"></video>`
    : `<img class="hero-media" src="${A(img)}" alt="" fetchpriority="high">`;
  return `
<section class="hero ${tall ? 'hero-tall' : ''} hero-${align}">
  ${media}
  <div class="hero-shade"></div>
  <div class="container hero-content reveal">
    ${eb ? eyebrow(eb) : ''}
    <h1 class="display">${title}</h1>
    ${sub ? `<p class="lead">${sub}</p>` : ''}
    ${ctas.length ? `<div class="btn-row">${ctas.join('')}</div>` : ''}
    ${note ? `<p class="hero-note">${note}</p>` : ''}
  </div>
  ${video ? `<button class="film-toggle" data-film-toggle aria-pressed="false" aria-label="${c.L('Pause film', 'إيقاف الفيلم')}"><svg class="film-ring" viewBox="0 0 36 36" aria-hidden="true"><circle class="ring-bg" cx="18" cy="18" r="16" pathLength="100"/><circle class="ring-fg" cx="18" cy="18" r="16" pathLength="100" data-film-ring/></svg><span class="pause-ico"></span></button>` : ''}
</section>`;
}

export function sectionHead({ eb, title, sub, center = false }) {
  return `<div class="sec-head ${center ? 'center' : ''} reveal">${eb ? eyebrow(eb) : ''}<h2 class="h2">${title}</h2>${sub ? `<p class="lead">${sub}</p>` : ''}</div>`;
}

export function split({ img, eb, title, body, ctas = [], reverse = false, tone = '' }) {
  return `
<section class="section split ${reverse ? 'reverse' : ''} ${tone}">
  <div class="container split-grid">
    <div class="split-media reveal"><img src="${A(img)}" alt="" loading="lazy"></div>
    <div class="split-copy reveal">
      ${eb ? eyebrow(eb) : ''}<h2 class="h2">${title}</h2>
      ${body}
      ${ctas.length ? `<div class="btn-row">${ctas.join('')}</div>` : ''}
    </div>
  </div>
</section>`;
}

export function fullBleed({ img, eb, title, sub, ctas = [] }) {
  return `
<section class="fullbleed">
  <img src="${A(img)}" alt="" loading="lazy">
  <div class="hero-shade"></div>
  <div class="container fullbleed-copy reveal">${eb ? eyebrow(eb) : ''}<h2 class="display-2">${title}</h2>${sub ? `<p class="lead">${sub}</p>` : ''}${ctas.length ? `<div class="btn-row">${ctas.join('')}</div>` : ''}</div>
</section>`;
}

export function ctaBand(c, { title, sub, ctas }) {
  return `
<section class="cta-band">
  <div class="container cta-band-inner reveal">
    <div><h2 class="h2">${title}</h2>${sub ? `<p class="lead">${sub}</p>` : ''}</div>
    <div class="btn-row">${ctas.join('')}</div>
  </div>
</section>`;
}

export function steps(items) {
  return `<ol class="steps">${items.map(([t, d], i) => `<li class="reveal"><span class="step-n">${String(i + 1).padStart(2, '0')}</span><h3 class="h4">${t}</h3><p>${d}</p></li>`).join('')}</ol>`;
}

export function faq(items) {
  return `<div class="faq">${items.map(([q, a]) => `<details class="faq-item"><summary>${q}<span class="plus"></span></summary><div class="faq-a"><p>${a}</p></div></details>`).join('')}</div>`;
}

export function crumbs(c, trail) {
  const { L, h } = c;
  return `<nav class="crumbs container" aria-label="${L('Breadcrumb', 'مسار التنقل')}"><a href="${h('home')}">GAIA</a>${trail.map(([k, t]) => (k ? `<span>/</span><a href="${h(k)}">${t}</a>` : `<span>/</span><span aria-current="page">${t}</span>`)).join('')}</nav>`;
}

/* ---------- Colour picker & spin & 360 ---------- */
export const G700_COLOURS = [
  ['silver-snow', 'Silver Snow', 'فضي ثلجي', '#c9ccce'],
  ['horizon-blue', 'Horizon Blue', 'أزرق الأفق', '#2d4f78'],
  ['dune-orange', 'Dune Orange', 'برتقالي الكثبان', '#c46a2c'],
  ['tundra-grey', 'Tundra Grey', 'رمادي التندرا', '#6f7378'],
  ['nomad-brown', 'Nomad Brown', 'بني الرحّالة', '#6a5444'],
  ['frontier-black', 'Frontier Black', 'أسود الحدود', '#17181a'],
  ['himalaya-white', 'Himalaya White', 'أبيض الهيمالايا', '#eeeeea'],
];
export const F700_COLOURS = [
  ['cosmic-silver', 'Cosmic Silver', 'فضي كوني', '#b9bcc0'],
  ['tundra-grey', 'Tundra Grey', 'رمادي التندرا', '#6f7378'],
  ['nomad-brown', 'Nomad Brown', 'بني الرحّالة', '#6a5444'],
  ['frontier-black', 'Frontier Black', 'أسود الحدود', '#17181a'],
  ['himalaya-white', 'Himalaya White', 'أبيض الهيمالايا', '#eeeeea'],
];
export const INTERIORS = [
  ['black-beige', 'Black and Beige', 'أسود وبيج', '#d9c7a7'],
  ['black-red', 'Black and Red', 'أسود وأحمر', '#8e2b2b'],
  ['black-orange', 'Black and Orange', 'أسود وبرتقالي', '#b8662f'],
];

export function colourPicker(c, model = 'g700', start = 0) {
  const { L } = c;
  const cols = model === 'g700' ? G700_COLOURS : F700_COLOURS;
  const [k0, en0, ar0] = cols[start];
  return `
<div class="colour-picker" data-colour-picker>
  <div class="colour-stage">
    <img src="${A(`${model}/colours/${k0}.webp`)}" alt="${model.toUpperCase()} ${L(en0, ar0)}" data-colour-img>
  </div>
  <div class="colour-bar">
    <p class="colour-name" data-colour-name>${L(en0, ar0)}</p>
    <div class="swatches" role="radiogroup" aria-label="${L('Exterior colour', 'اللون الخارجي')}">
      ${cols.map(([k, en, ar, hex], i) => `<button class="swatch" role="radio" aria-checked="${i === start}" aria-label="${L(en, ar)}" style="--sw:${hex}" data-src="${A(`${model}/colours/${k}.webp`)}" data-name="${L(en, ar)}"></button>`).join('')}
    </div>
  </div>
</div>`;
}

export function spin(c) {
  const frames = Array.from({ length: 9 }, (_, i) => A(`g700/angles/${i}.webp`));
  return `
<div class="spin" data-spin='${JSON.stringify(frames)}' tabindex="0" role="img" aria-label="${c.L('G700, drag or use arrow keys to turn', 'G700، اسحب أو استخدم الأسهم للتدوير')}">
  <img src="${frames[0]}" alt="" draggable="false" data-spin-img>
  <p class="spin-hint"><span class="spin-ico"></span>${c.L('Drag to turn', 'اسحب للتدوير')}</p>
</div>`;
}

export function pano(c, model = 'g700', start = 0) {
  const { L } = c;
  return `
<div class="pano-wrap" data-pano-wrap>
  <div class="pano" data-pano="${A(`${model}/interior/${INTERIORS[start][0]}.webp`)}">
    <div class="pano-poster" style="background-image:url(${A(`${model}/interior/${INTERIORS[start][0]}.webp`)})"></div>
    <button class="btn pano-start" data-pano-start><span>${L('Step inside · 360°', 'ادخل المقصورة · 360°')}</span></button>
  </div>
  <div class="chip-row" role="radiogroup" aria-label="${L('Interior theme', 'لون المقصورة')}">
    ${INTERIORS.map(([k, en, ar, hex], i) => `<button class="chip" role="radio" aria-checked="${i === start}" data-pano-src="${A(`${model}/interior/${k}.webp`)}"><i style="--sw:${hex}"></i>${L(en, ar)}</button>`).join('')}
  </div>
</div>`;
}

/* Showcase: rotating G700 (36 frames per colour) on a light stage + interior 360, with Exterior / Interior tabs */
export const SPIN_COLOURS = [
  ['white', 'White', 'أبيض', 'linear-gradient(180deg,#FFF 0%,#EEE 100%)'],
  ['silver', 'Silver', 'فضي', 'linear-gradient(180deg,#C0C1C5 0%,#B7B8BD 100%)'],
  ['silver_snow', 'Silver Snow', 'فضي ثلجي', 'linear-gradient(180deg,#A4ACB7 0%,#67707F 100%)'],
  ['black', 'Black', 'أسود', 'linear-gradient(180deg,#7F7D7D 0%,#000 100%)'],
  ['blue', 'Blue', 'أزرق', 'linear-gradient(180deg,#6D7CA5 0%,#3D538F 100%)'],
  ['brown', 'Brown', 'بني', 'linear-gradient(180deg,#C0B298 0%,#84775D 100%)'],
  ['orange', 'Orange', 'برتقالي', 'linear-gradient(180deg,#EF844E 0%,#A73712 100%)'],
];
export function showcase(c, model = 'g700', { ctas = [], eb = '', title = '' } = {}) {
  const { L } = c;
  const [k0, en0, ar0] = SPIN_COLOURS[0];
  return `
<div class="showcase sc-dark" data-showcase data-frames="36" data-base="${A('g700/spin/')}">
  ${title ? `<div class="sc-head reveal">${eb ? `<p class="eyebrow">${eb}</p>` : ''}<h2 class="h2">${title}</h2></div>` : ''}
  <div class="sc-stage" data-sc-view="ext">
    <span class="sc-ring" aria-hidden="true"></span>
    <img class="sc-car" src="${A(`g700/spin/${k0}/0.webp`)}" alt="G700 ${L(en0, ar0)}" draggable="false" data-sc-img>
  </div>
  <div class="sc-stage sc-int" data-sc-view="int" hidden><div class="pano pano-fill" data-pano="${A(`${model}/interior/${INTERIORS[0][0]}.webp`)}"></div></div>
  <div class="sc-side">
    <div class="sc-tabs" role="tablist">
      <button role="tab" aria-selected="true" data-sc-tab="ext">${L('Exterior', 'الخارج')}</button>
      <button role="tab" aria-selected="false" data-sc-tab="int">${L('Interior', 'المقصورة')}</button>
    </div>
    ${ctas.join('')}
  </div>
  <p class="sc-name" data-sc-name aria-live="polite">${L(en0, ar0)}</p>
  <div class="sc-pill" data-sc-pill="ext" role="radiogroup" aria-label="${L('Exterior colour', 'اللون الخارجي')}">
    ${SPIN_COLOURS.map(([k, en, ar, g], i) => `<button class="swatch" role="radio" aria-checked="${i === 0}" aria-label="${L(en, ar)}" style="background:${g}" data-colour="${k}" data-name="${L(en, ar)}"></button>`).join('')}
  </div>
  <div class="sc-pill" data-sc-pill="int" role="radiogroup" aria-label="${L('Interior theme', 'لون المقصورة')}" hidden>
    ${INTERIORS.map(([k, en, ar, hex], i) => `<button class="swatch sw-int" role="radio" aria-checked="${i === 0}" aria-label="${L(en, ar)}" style="--sw:${hex}" data-pano-src="${A(`${model}/interior/${k}.webp`)}" data-name="${L(en, ar)}"></button>`).join('')}
  </div>
</div>`;
}

/* ---------- Forms ---------- */
const F = {
  name: (L) => `<label class="field"><span>${L('Full name', 'الاسم الكامل')}</span><input name="name" required autocomplete="name" minlength="2"></label>`,
  mobile: (L) => `<label class="field"><span>${L('Mobile number', 'رقم الهاتف')}</span><div class="tel" dir="ltr"><span class="tel-cc">+965</span><input name="mobile" type="tel" inputmode="numeric" required pattern="[0-9]{8}" maxlength="8" autocomplete="tel-national" dir="ltr" placeholder="5XXXXXXX"></div><small class="hint">${L('Kuwait number, 8 digits', 'رقم كويتي، 8 أرقام')}</small></label>`,
  email: (L) => `<label class="field"><span>${L('Email (optional)', 'البريد الإلكتروني (اختياري)')}</span><input name="email" type="email" autocomplete="email" dir="ltr"></label>`,
  model: (L, sel = 'G700') => `<label class="field"><span>${L('Model', 'الطراز')}</span><select name="model"><option value="G700"${sel === 'G700' ? ' selected' : ''}>G700 · ${L('Flagship luxury off-road SUV', 'سيارة الدفع الرباعي الفاخرة الرائدة')}</option><option value="F700"${sel === 'F700' ? ' selected' : ''}>F700 · ${L('Flagship luxury pickup', 'البيك أب الفاخر الرائد')}</option><option value="undecided">${L('Not sure yet', 'لم أقرر بعد')}</option></select></label>`,
  date: (L, label) => `<label class="field"><span>${label || L('Preferred date', 'التاريخ المفضل')}</span><input name="date" type="date" required data-min-today></label>`,
  time: (L) => radios('time', L('Best time to call', 'أفضل وقت للاتصال'), [['morning', L('Morning', 'صباحاً')], ['afternoon', L('Afternoon', 'ظهراً')], ['evening', L('Evening', 'مساءً')]]),
  lang: (L) => radios('language', L('Preferred language', 'اللغة المفضلة'), [['ar', 'العربية'], ['en', 'English']], L('en', 'ar')),
  consent: (L, h) => `<label class="check"><input type="checkbox" name="consent" required><span>${L(`Al Mulla Auto may contact me about this request by call, WhatsApp or email. See our <a href="${h('contact', '#privacy')}">Privacy policy</a>.`, `أوافق على تواصل الملا للسيارات معي بخصوص هذا الطلب عبر الاتصال أو واتساب أو البريد الإلكتروني. اطّلع على <a href="${h('contact', '#privacy')}">سياسة الخصوصية</a>.`)}</span></label>`,
};
function radios(name, label, opts, def) {
  return `<fieldset class="field radios"><legend>${label}</legend><div class="seg">${opts.map(([v, t], i) => `<label><input type="radio" name="${name}" value="${v}"${(def ? v === def : i === 0) ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div></fieldset>`;
}
const sel = (name, label, opts, req = true) => `<label class="field"><span>${label}</span><select name="${name}"${req ? ' required' : ''}><option value="">—</option>${opts.map((o) => (Array.isArray(o) ? `<option value="${o[0]}">${o[1]}</option>` : `<option>${o}</option>`)).join('')}</select></label>`;
const inp = (name, label, attrs = '') => `<label class="field"><span>${label}</span><input name="${name}" ${attrs}></label>`;

const CENTRES = (L) => [['shuwaikh', L('Shuwaikh service centre', 'مركز خدمة الشويخ')], ['ahmadi', L('Ahmadi service centre', 'مركز خدمة الأحمدي')]];

/**
 * Lead form. type maps to one of the ten capture points in the brief.
 * audience: prospect | owner | tseries
 */
export function leadForm(c, { type, audience = 'prospect', title, sub, submit, model = 'G700', success, extra = '' }) {
  const { L, h, key } = c;
  let fields = '';
  switch (type) {
    case 'interest':
      fields = F.name(L) + F.mobile(L) + F.model(L, model) + F.lang(L);
      break;
    case 'testdrive':
      fields = radios('place', L('Where would you like to drive?', 'أين تفضّل التجربة؟'), [['showroom', L('Showroom', 'صالة العرض')], ['home', L('At home', 'في المنزل')], ['event', L('Off-road event', 'فعالية طرق وعرة')]])
        + `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div><div class="grid-2">${F.model(L, model)}${F.date(L)}</div>` + F.time(L) + F.lang(L)
        + `<div class="build-attach" data-build-attach hidden><p class="eyebrow">${L('Your build travels with your booking', 'تصميمك يُرفق مع حجزك')}</p><p data-build-summary></p></div>`;
      break;
    case 'build':
      fields = `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div>` + F.email(L) + F.time(L);
      break;
    case 'finance':
      fields = `<div class="grid-2">${F.model(L, model)}${inp('down', L('Down payment (KD)', 'الدفعة الأولى (د.ك)'), 'type="number" min="0" inputmode="numeric" data-fin-down-out')}</div>`
        + sel('term', L('Term', 'المدة'), [['12', L('12 months', '12 شهراً')], ['24', L('24 months', '24 شهراً')], ['36', L('36 months', '36 شهراً')], ['48', L('48 months', '48 شهراً')], ['60', L('60 months', '60 شهراً')]])
        + radios('plan', L('I am interested in', 'أنا مهتم بـ'), [['instalment', L('Instalments', 'التقسيط')], ['lease', L('Leasing', 'التأجير')], ['both', L('Compare both', 'المقارنة بينهما')]])
        + `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div>`;
      break;
    case 'tradein':
      fields = `<div class="grid-2">${sel('current', L('Current car', 'سيارتك الحالية'), ['JETOUR T1', 'JETOUR T2', 'JETOUR X70', 'JETOUR X90', 'JETOUR Dashing', ['other-jetour', L('Other JETOUR', 'JETOUR أخرى')], ['other', L('Other brand', 'علامة أخرى')]])}${inp('year', L('Year', 'سنة الصنع'), 'type="number" min="2015" max="2027" required inputmode="numeric"')}</div>`
        + `<div class="grid-2">${inp('mileage', L('Mileage (km)', 'المسافة المقطوعة (كم)'), 'type="number" min="0" required inputmode="numeric"')}${F.model(L, model)}</div>`
        + `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div>`;
      break;
    case 'register':
      fields = `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div>`
        + `<div class="grid-2">${inp('vin', L('VIN or plate number', 'رقم الشاصي أو رقم اللوحة'), 'required minlength="4" dir="ltr"')}${sel('year', L('Model year', 'سنة الطراز'), ['2024', '2025', '2026', '2027'])}</div>`
        + `<div class="grid-2">${inp('mileage', L('Current mileage (km)', 'المسافة الحالية (كم)'), 'type="number" min="0" inputmode="numeric"')}${sel('bought', L('Where did you buy it?', 'من أين اشتريتها؟'), [['previous', L('Previous distributor', 'الوكيل السابق')], ['abroad', L('Outside Kuwait', 'خارج الكويت')], ['used', L('Used, private sale', 'مستعملة، بيع خاص')]])}</div>` + F.email(L) + F.lang(L);
      break;
    case 'service':
      fields = radios('centre', L('Service centre', 'مركز الخدمة'), CENTRES(L))
        + `<div class="grid-2">${inp('vin', L('Plate or VIN', 'رقم اللوحة أو الشاصي'), 'required dir="ltr"')}${sel('service', L('Service type', 'نوع الخدمة'), [['first', L('First check-up with Al Mulla', 'أول فحص مع الملا')], ['periodic', L('Periodic service', 'صيانة دورية')], ['repair', L('Repair or diagnosis', 'إصلاح أو تشخيص')], ['warranty', L('Warranty check', 'فحص الضمان')]])}</div>`
        + `<div class="grid-2">${F.date(L)}${F.mobile(L)}</div>` + F.name(L)
        + `<label class="check"><input type="checkbox" name="pickup"><span>${L('I need pick-up and drop-off', 'أحتاج خدمة الاستلام والتوصيل')}</span></label>`;
      break;
    case 'club':
      fields = radios('status', L('I am', 'أنا'), [['owner', L('A GAIA owner', 'مالك GAIA')], ['prospect', L('Not an owner yet: join the waitlist', 'لست مالكاً بعد: انضم لقائمة الانتظار')]])
        + `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div>` + F.email(L)
        + `<label class="field" data-show-if="status=owner"><span>${L('Plate or VIN (owners)', 'رقم اللوحة أو الشاصي (للملاك)')}</span><input name="vin" dir="ltr"></label>`
        + sel('interest', L('What excites you most?', 'ما الذي يثير اهتمامك أكثر؟'), [['academy', L('Off-road academy', 'أكاديمية الطرق الوعرة')], ['drives', L('Owner drives', 'رحلات الملاك')], ['events', L('Private events', 'فعاليات خاصة')], ['family', L('Family experiences', 'تجارب عائلية')]], false);
      break;
    case 'event':
      fields = sel('event', L('Event', 'الفعالية'), [['autoshow', L('Kuwait Auto Show', 'معرض الكويت للسيارات')], ['kmt', L('Off-road test drive · Kuwait Motor Town', 'تجربة طرق وعرة · مدينة الكويت للمحركات')], ['levels', L('Test-drive day · Levels', 'يوم تجربة القيادة · ليفلز')], ['avenues', L('G700 display · The Avenues', 'عرض G700 · الأفنيوز')], ['360', L('G700 display · 360 Mall', 'عرض G700 · 360 مول')], ['ghabqa', L('GAIA Ramadan Ghabqa', 'غبقة GAIA الرمضانية')]])
        + `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div>` + sel('guests', L('Guests', 'عدد الضيوف'), [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']]);
      break;
    case 'visit':
      fields = radios('room', L('I would like', 'أرغب في'), [['lounge', L('The GAIA lounge', 'صالة GAIA')], ['vip', L('A VIP consultation', 'استشارة خاصة')], ['custom', L('The customization corner', 'ركن التخصيص')]])
        + `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div><div class="grid-2">${F.date(L)}${F.model(L, model)}</div>`;
      break;
    case 'contact':
      fields = `<div class="grid-2">${F.name(L)}${F.mobile(L)}</div>` + F.email(L)
        + sel('topic', L('Topic', 'الموضوع'), [['sales', L('Sales', 'المبيعات')], ['service', L('Service', 'الصيانة')], ['owners', L('Owners', 'الملاك')], ['club', L('GAIA Club', 'نادي GAIA')], ['media', L('Media & partnerships', 'الإعلام والشراكات')]])
        + `<label class="field"><span>${L('Message', 'الرسالة')}</span><textarea name="message" rows="4" required></textarea></label>`;
      break;
  }
  const ok = success || {
    t: L('Thank you. We have your request.', 'شكراً لك. استلمنا طلبك.'),
    d: L('A named GAIA consultant will confirm by call or WhatsApp.', 'سيتواصل معك مستشار GAIA مخصّص عبر الاتصال أو واتساب للتأكيد.'),
    next: [],
  };
  return `
<form class="lead-form" novalidate data-lead-form data-type="${type}" data-audience="${audience}" data-source="${key}">
  ${title ? `<div class="form-head"><h2 class="h3">${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>` : ''}
  <div class="form-body">
    ${fields}
    ${extra}
    ${F.consent(L, h)}
    <button class="btn btn-block" type="submit"><span>${submit}</span></button>
    <p class="form-error" role="alert" data-form-error hidden>${L('Please check the highlighted fields.', 'يرجى مراجعة الحقول المحددة.')}</p>
  </div>
  <div class="form-success" data-form-success hidden tabindex="-1">
    <span class="tick"></span>
    <h3 class="h3">${ok.t}</h3>
    <p>${ok.d}</p>
    ${ok.next.length ? `<div class="btn-row">${ok.next.join('')}</div>` : ''}
  </div>
</form>`;
}

export function trust(c) {
  const { L } = c;
  return `<ul class="trust">${[L('Sold and serviced in Kuwait by Al Mulla Auto', 'تُباع وتُصان في الكويت من قِبل الملا للسيارات'), L('No obligation to buy', 'دون أي التزام بالشراء'), L('We only use your details for this request', 'نستخدم بياناتك لهذا الطلب فقط')].map((t) => `<li>${t}</li>`).join('')}</ul>`;
}

/* ---------- Document ---------- */
export function doc(c, { title, desc, body, extraHead = '' }) {
  const { lang, key, L } = c;
  const other = lang === 'en' ? 'ar' : 'en';
  return `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title} | JETOUR GAIA ${L('Kuwait', 'الكويت')}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#1F1F22">
<link rel="canonical" href="${CONFIG.siteUrl}${href(lang, key)}">
<link rel="alternate" hreflang="${other}" href="${CONFIG.siteUrl}${href(other, key)}">
<link rel="alternate" hreflang="${lang}" href="${CONFIG.siteUrl}${href(lang, key)}">
<meta property="og:title" content="${title} | JETOUR GAIA">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${CONFIG.siteUrl}/assets/g700/web/p1_1.webp">
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&family=Noto+Kufi+Arabic:wght@300..600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/main.css">
${extraHead}
</head>
<body data-page="${key}">
${header(c)}
<main id="main">
${body}
</main>
${footer(c)}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}
