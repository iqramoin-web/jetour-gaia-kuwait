import { CONFIG } from './config.mjs';
import {
  A, arrow, btn, btnArrow, eyebrow, pageHero, sectionHead, split, fullBleed, ctaBand, steps, faq, crumbs,
  colourPicker, spin, pano, showcase, leadForm, trust, G700_COLOURS, F700_COLOURS, INTERIORS,
} from './components.mjs';

const kd = (c, v) => c.L(`KD ${v}`, `${v} د.ك`);

/* Shared: test-drive block used at the end of several pages */
export function testDriveBlock(c, model = 'G700') {
  const { L, h } = c;
  return `
<section class="section tone-light" id="book">
  <div class="container book-grid">
    <div class="book-copy reveal">
      ${eyebrow('JETOUR GAIA')}
      <h2 class="display-2">${L('Book your<br>test drive', 'احجز<br>تجربة قيادتك')}</h2>
      <p class="lead">${L('Tell us how to reach you. Your build travels with your booking, so the showroom has it ready when you arrive.', 'أخبرنا كيف نتواصل معك. يُرفق تصميمك مع الحجز، لتجده صالة العرض جاهزاً عند وصولك.')}</p>
      ${trust(c)}
      ${btnArrow(h('build'), L('No build yet? Build one first', 'لا يوجد تصميم بعد؟ صمّم سيارتك أولاً'))}
    </div>
    <div class="reveal">${leadForm(c, {
      type: 'testdrive', model, submit: L('Book my test drive', 'احجز تجربتي'),
      success: { t: L('Your test drive is requested.', 'تم استلام طلب تجربة القيادة.'), d: L('A named GAIA consultant will call or WhatsApp you to confirm the time and place.', 'سيتصل بك مستشار GAIA مخصّص أو يراسلك عبر واتساب لتأكيد الموعد والمكان.'), next: [btn(h('promise'), L('Read the Al Mulla Promise', 'اقرأ وعد الملا'), 'btn btn-ghost'), btn(h('financing'), L('See financing', 'خيارات التمويل'), 'btn btn-ghost')] },
    })}</div>
  </div>
</section>`;
}

function promiseStrip(c, tone = '') {
  const { L, h } = c;
  const items = [
    ['parts', L('Genuine parts, in Kuwait', 'قطع غيار أصلية في الكويت'), L('Parts availability planned and stocked locally by Al Mulla.', 'توفّر قطع الغيار مخطط له ومخزّن محلياً لدى الملا.')],
    ['service', L('Shuwaikh and Ahmadi', 'الشويخ والأحمدي'), L('Two service centres with factory-trained technicians.', 'مركزا خدمة بفنيين مدرّبين من المصنع.')],
    ['shield', L('Warranty and 24/7 roadside', 'ضمان ومساعدة على الطريق 24/7'), L('Ownership backed by Al Mulla Auto, day and night.', 'ملكية مدعومة من الملا للسيارات، ليلاً ونهاراً.')],
    ['card', L('Clear ownership cost', 'تكلفة ملكية واضحة'), L('Service plans and financing set out before you sign.', 'خطط الصيانة والتمويل واضحة قبل التوقيع.')],
  ];
  return `
<section class="section ${tone}">
  <div class="container">
    ${sectionHead({ eb: L('Why GAIA', 'لماذا GAIA'), title: L('The Al Mulla Promise', 'وعد الملا'), sub: L('Every JETOUR GAIA is sold, serviced and supported in Kuwait by Al Mulla Auto.', 'كل JETOUR GAIA تُباع وتُصان وتُدعم في الكويت من قِبل الملا للسيارات.') })}
    <div class="promise-grid">
      ${items.map(([i, t, d]) => `<div class="promise-item reveal"><span class="pi pi-${i}"></span><h3 class="h4">${t}</h3><p>${d}</p></div>`).join('')}
    </div>
    <div class="btn-row">${btn(h('promise'), L('Explore the promise', 'اكتشف الوعد'), 'btn btn-ghost')}${btn(h('contact'), L('Find a showroom', 'ابحث عن صالة عرض'), 'btn btn-ghost')}</div>
  </div>
</section>`;
}

function pillars(c) {
  const { L } = c;
  const p = [
    ['01', L('Prestige', 'المكانة'), L('A first-class cabin with zero-gravity seats, hand-finished leather and quiet that lasts the whole journey.', 'مقصورة من الدرجة الأولى بمقاعد انعدام الجاذبية وجلد مُشطّب يدوياً وهدوء يرافقك طوال الرحلة.'), 'g700/web/p4_1.webp'],
    ['02', L('Technology', 'التقنية'), L('Intelligent systems engineered for control, and a connected cockpit that keeps every journey composed.', 'أنظمة ذكية مصممة للتحكم، وقمرة قيادة متصلة تجعل كل رحلة متزنة.'), 'g700/web/p3_1.webp'],
    ['03', L('Boldness', 'الجرأة'), L('Built for demanding terrain, with confidence engineered for everyday roads and extreme conditions alike.', 'صُممت للتضاريس الصعبة، بثقة هندسية للطرق اليومية والظروف القاسية على حد سواء.'), 'g700/web/p2_3.webp'],
    ['04', L('Design', 'التصميم'), L('A bold, upright presence finished to your taste: seven official colours, three cabins, your signature.', 'حضور جريء وشامخ بلمساتك الخاصة: سبعة ألوان رسمية وثلاث مقصورات وتوقيعك.'), 'g700/web/p1_3.webp'],
  ];
  return `
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('Four pillars', 'أربع ركائز'), title: L('Built to go further.', 'صُممت لتذهب أبعد.') })}
    <div class="pillars" data-pillars>
      ${p.map(([n, t, d, img], i) => `
      <article class="pillar reveal${i === 0 ? ' is-open' : ''}" tabindex="0">
        <img src="${A(img)}" alt="" loading="lazy">
        <div class="pillar-shade"></div>
        <div class="pillar-copy"><span class="pillar-n">${n}</span><h3 class="h3">${t}</h3><p>${d}</p></div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

/* ============ HOME ============ */
export function home(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, {
  eb: 'JETOUR GAIA G700', title: L('Every challenge.<br>A class above.', 'كل تحدٍّ.<br>بمستوى أرقى.'),
  img: 'g700/web/p1_1.webp', video: 'g700/web/hero.mp4', tall: true, align: 'center',
})}

<section class="router">
  <div class="container router-grid">
    ${[
      ['g700', L('New to GAIA', 'جديد على GAIA'), L('Discover the G700', 'اكتشف G700'), L('Four pillars, seven colours, one flagship.', 'أربع ركائز، سبعة ألوان، طراز رائد واحد.')],
      ['owners', L('Already own a G700?', 'تملك G700 بالفعل؟'), L('Welcome to Al Mulla', 'أهلاً بك في الملا'), L('Register your vehicle, book a service, join the Club.', 'سجّل مركبتك، احجز الصيانة، وانضم إلى النادي.')],
      ['moveup', L('Driving a T-Series?', 'تقود فئة T؟'), L('Move up to GAIA', 'انتقل إلى GAIA'), L('A trade-in valuation and finance offer, side by side.', 'تقييم استبدال وعرض تمويل جنباً إلى جنب.')],
    ].map(([k, eb, t, d]) => `<a class="router-card reveal" href="${h(k)}"><p class="eyebrow">${eb}</p><h2 class="h3">${t}</h2><p>${d}</p>${arrow}</a>`).join('')}
  </div>
</section>

<section class="section sc-section" id="colours">
  ${showcase(c, 'g700', { eb: L('Choose your G700', 'اختر G700 الخاصة بك'), title: L('Seven official colours. One flagship.', 'سبعة ألوان رسمية. طراز رائد واحد.'), ctas: [btn(h('build'), L('Customize yours', 'خصّص سيارتك'))] })}
</section>

<section class="manifesto">
  <div class="manifesto-bg" style="background-image:url(${A('g700/web/p1_2.webp')})"></div>
  <div class="container manifesto-inner">
    <p class="manifesto-q reveal">${L('How do you know you’ve made it? And who’s keeping score?', 'كيف تعرف أنك وصلت؟ ومن يحتسب النتيجة؟')}</p>
    <p class="manifesto-a reveal">${L('For some, it’s status. For others, achievements. For you, perhaps, it’s legacy.', 'للبعض هي المكانة. ولآخرين هي الإنجازات. أما لك، فربما هي الإرث.')}</p>
    <p class="manifesto-a reveal">${L('Success rarely takes the easy route. It takes ambition, a little nerve, and the willingness to go where others hesitate.', 'النجاح نادراً ما يسلك الطريق السهل. إنه يتطلب الطموح، وقليلاً من الجرأة، والاستعداد للذهاب حيث يتردد الآخرون.')}</p>
    <p class="display-2 reveal">${L('Success is personal.<br>Your JETOUR GAIA should be, too.', 'النجاح شخصي.<br>وكذلك يجب أن تكون JETOUR GAIA الخاصة بك.')}</p>
  </div>
</section>

${pillars(c)}

<section class="section tone-deep">
  <div class="container">
    ${sectionHead({ eb: L('The GAIA family', 'عائلة GAIA'), title: L('Two flagships.', 'طرازان رائدان.') })}
    <div class="model-cards">
      <a class="model-card reveal" href="${h('g700')}">
        <img src="${A('g700/colours/horizon-blue.webp')}" alt="G700" loading="lazy">
        <div class="model-card-copy"><p class="eyebrow">${L('Flagship luxury off-road SUV', 'سيارة الدفع الرباعي الفاخرة الرائدة')}</p><h3 class="h2">G700</h3><p class="price">${L('From', 'ابتداءً من')} ${kd(c, CONFIG.g700From)}<sup>*</sup></p><span class="link-arrow"><span>${L('Explore G700', 'اكتشف G700')}</span>${arrow}</span></div>
      </a>
      <a class="model-card reveal" href="${h('f700')}">
        <img src="${A('f700/colours/cosmic-silver.webp')}" alt="F700" loading="lazy">
        <div class="model-card-copy"><p class="eyebrow">${L('Flagship luxury pickup · Coming soon', 'البيك أب الفاخر الرائد · قريباً')}</p><h3 class="h2">F700</h3><p class="price">${L('From', 'ابتداءً من')} ${kd(c, CONFIG.f700From)}<sup>*</sup></p><span class="link-arrow"><span>${L('Register interest', 'سجّل اهتمامك')}</span>${arrow}</span></div>
      </a>
    </div>
    <p class="fine">* ${L('Indicative starting prices, subject to confirmation at launch.', 'أسعار بدء إرشادية، قابلة للتأكيد عند الإطلاق.')}</p>
  </div>
</section>

${promiseStrip(c, 'tone-light')}



<section class="section tone-deep">
  <div class="container">
    ${sectionHead({ eb: L('Build your GAIA', 'صمّم GAIA الخاصة بك'), title: L('Three mindsets. One desire.', 'ثلاث عقليات. رغبة واحدة.') })}
    <div class="mindsets">
      ${[
        ['status', '01', L('The status seeker', 'الباحث عن المكانة'), L('Success, felt in every detail.', 'نجاح تشعر به في كل تفصيل.'), 'g700/web/p1_3.webp'],
        ['adventure', '02', L('The adventure seeker', 'الباحث عن المغامرة'), L('Take on the terrain. Keep your composure.', 'واجه التضاريس. وحافظ على هدوئك.'), 'g700/web/p2_2.webp'],
        ['family', '03', L('The family explorers', 'العائلة المستكشفة'), L('Go further. Grow together.', 'اذهبوا أبعد. وانموا معاً.'), 'g700/web/p4_2.webp'],
      ].map(([k, n, t, d, img]) => `<a class="mindset reveal" href="${h('build')}?preset=${k}"><img src="${A(img)}" alt="" loading="lazy"><div class="mindset-copy"><span class="pillar-n">${n}</span><h3 class="h3">${t}</h3><p>${d}</p><span class="link-arrow"><span>${L('Start with this build', 'ابدأ بهذا التصميم')}</span>${arrow}</span></div></a>`).join('')}
    </div>
  </div>
</section>

${fullBleed({ img: 'campaign/runway.webp', eb: L('Launch experience', 'تجربة الإطلاق'), title: L('Make your entrance.', 'اصنع حضورك.'), sub: L('The G700 changes colour under projection at selected Kuwait malls. Walk the runway, design yours on a life-size hologram, and leave with your own cinematic film.', 'تتغير ألوان G700 تحت الإسقاط الضوئي في مجمعات مختارة بالكويت. امشِ على المنصة، وصمّم سيارتك على هولوغرام بالحجم الطبيعي، واحصل على فيلمك السينمائي الخاص.'), ctas: [btn(h('events'), L('See events', 'شاهد الفعاليات')), btn(h('showroom'), L('Book a private viewing', 'احجز معاينة خاصة'), 'btn btn-ghost')] })}

<section class="section">
  <div class="container duo">
    <a class="duo-card reveal" href="${h('moveup')}" style="--img:url(${A('g700/web/p2_1.webp')})"><p class="eyebrow">${L('Moving up', 'الانتقال للأعلى')}</p><h3 class="h2">${L('Driving a JETOUR T-Series?', 'تقود JETOUR من الفئة T؟')}</h3><p>${L('Bring it to Al Mulla Auto for a trade-in valuation, and step up into a GAIA.', 'أحضرها إلى الملا للسيارات لتقييم الاستبدال، وانتقل إلى GAIA.')}</p><span class="btn btn-sm"><span>${L('Value my trade-in', 'قيّم سيارتي')}</span></span></a>
    <a class="duo-card reveal" href="${h('owners')}" style="--img:url(${A('g700/web/p4_3.webp')})"><p class="eyebrow">${L('Owners area', 'منطقة الملاك')}</p><h3 class="h2">${L('Already own a G700?', 'تملك G700 بالفعل؟')}</h3><p>${L('Register your vehicle, book a service and join the GAIA Club.', 'سجّل مركبتك، احجز الصيانة، وانضم إلى نادي GAIA.')}</p><span class="btn btn-sm"><span>${L('Register my vehicle', 'سجّل مركبتي')}</span></span></a>
  </div>
</section>

<section class="section tone-deep">
  <div class="container club-teaser">
    <div class="reveal">
      ${eyebrow('GAIA Club')}
      <h2 class="h2">${L('Ownership is only the beginning.', 'الملكية مجرد بداية.')}</h2>
      <p class="lead">${L('Owner drives, the off-road academy, private events and loyalty rewards, from the first day.', 'رحلات الملاك، وأكاديمية الطرق الوعرة، والفعاليات الخاصة، ومكافآت الولاء، منذ اليوم الأول.')}</p>
      <div class="btn-row">${btn(h('club'), L('Explore the Club', 'اكتشف النادي'))}${btn(h('join'), L('Join the Club', 'انضم إلى النادي'), 'btn btn-ghost')}</div>
    </div>
    <ol class="tier-line reveal">
      ${[['bronze', 'Bronze', 'برونزي'], ['silver', 'Silver', 'فضي'], ['gold', 'Gold', 'ذهبي'], ['captain', 'Captain', 'كابتن']].map(([k, en, ar]) => `<li class="tier-dot t-${k}"><span></span>${L(en, ar)}</li>`).join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head-row">${sectionHead({ eb: L('Stories', 'القصص'), title: L('Where GAIA goes.', 'إلى أين تذهب GAIA.') })}${btnArrow(h('stories'), L('All stories', 'كل القصص'))}</div>
    <div class="story-grid">${storyCards(c).slice(0, 3).join('')}</div>
  </div>
</section>

`;
  return { title: L('Every challenge. A class above.', 'كل تحدٍّ. بمستوى أرقى.'), desc: L('JETOUR GAIA G700, the flagship luxury off-road SUV. Sold and serviced in Kuwait by Al Mulla Auto. Book a personalized test drive.', 'JETOUR GAIA G700، سيارة الدفع الرباعي الفاخرة الرائدة. تُباع وتُصان في الكويت من قِبل الملا للسيارات. احجز تجربة قيادة مخصّصة.'), body };
}

export function storyCards(c) {
  const { L, h } = c;
  return [
    ['g700/web/p2_2.webp', L('Routes', 'مسارات'), L('Three desert routes every G700 should know', 'ثلاثة مسارات صحراوية يجب أن تعرفها كل G700'), L('From the dunes south of the city to the northern plains: where to go, when and how to air down.', 'من الكثبان جنوب المدينة إلى السهول الشمالية: أين تذهب، ومتى، وكيف تخفّض ضغط الإطارات.'), '6'],
    ['g700/web/p4_1.webp', L('Owners', 'الملاك'), L('A weekend with the family, the long way round', 'عطلة نهاية أسبوع مع العائلة، عبر الطريق الأطول'), L('An early G700 owner on zero-gravity seats, long horizons and the sound of a quiet cabin.', 'أحد أوائل ملاك G700 يتحدث عن مقاعد انعدام الجاذبية والآفاق البعيدة وهدوء المقصورة.'), '4'],
    ['g700/web/p3_1.webp', L('Technology', 'التقنية'), L('Inside the cockpit: what the G700 does for you', 'داخل قمرة القيادة: ما تفعله G700 من أجلك'), L('Terrain modes, cameras and the connected cabin, explained in plain words.', 'أوضاع التضاريس والكاميرات والمقصورة المتصلة، بكلمات بسيطة.'), '5'],
    ['campaign/mall.webp', L('Launch', 'الإطلاق'), L('Behind the projection: making the G700 change colour', 'خلف الإسقاط: كيف تتغير ألوان G700'), L('How the launch installation came together at Kuwait’s malls.', 'كيف تم تنفيذ عرض الإطلاق في مجمعات الكويت.'), '3'],
    ['g700/web/p2_3.webp', L('Academy', 'الأكاديمية'), L('Your first sand session: what to expect', 'جلستك الأولى على الرمال: ماذا تتوقع'), L('The GAIA off-road academy instructors on reading sand, momentum and recovery.', 'مدرّبو أكاديمية GAIA للطرق الوعرة يتحدثون عن قراءة الرمال والزخم والاستعادة.'), '7'],
    ['g700/web/p1_3.webp', L('Design', 'التصميم'), L('Seven colours, one character', 'سبعة ألوان، شخصية واحدة'), L('Why Horizon Blue, Dune Orange and Himalaya White were made for Kuwait’s light.', 'لماذا صُممت ألوان أزرق الأفق وبرتقالي الكثبان وأبيض الهيمالايا لضوء الكويت.'), '4'],
  ].map(([img, tag, t, d, min]) => `<a class="story-card reveal" href="${h('stories')}"><div class="story-img"><img src="${A(img)}" alt="" loading="lazy"></div><p class="eyebrow">${tag} · ${min} ${L('min read', 'دقائق قراءة')}</p><h3 class="h4">${t}</h3><p>${d}</p></a>`);
}

/* ============ LAUNCH LANDING ============ */
export function launch(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, {
  eb: L('JETOUR GAIA · Kuwait launch', 'JETOUR GAIA · الإطلاق في الكويت'), title: L('Make your<br>entrance.', 'اصنع<br>حضورك.'),
  sub: L('A new class of luxury off-road arrives in Kuwait. Register your interest to be first to see it, first to drive it.', 'فئة جديدة من الفخامة على الطرق الوعرة تصل إلى الكويت. سجّل اهتمامك لتكون أول من يراها وأول من يقودها.'),
  img: 'campaign/runway.webp', tall: true,
  ctas: [btn('#register', L('Register interest', 'سجّل اهتمامك')), btn('#film', L('Watch the film', 'شاهد الفيلم'), 'btn btn-ghost')],
})}

<section class="section">
  <div class="container launch-phases">
    ${sectionHead({ eb: L('The launch', 'الإطلاق'), title: L('Three moments. Be there for all of them.', 'ثلاث لحظات. كن حاضراً فيها جميعاً.') })}
    <ol class="phase-line">
      ${[
        [L('Teaser', 'التشويق'), L('Now', 'الآن'), L('Register interest and get first access to the reveal.', 'سجّل اهتمامك واحصل على أولوية الوصول إلى الكشف.'), true],
        [L('Grand launch', 'الإطلاق الكبير'), L('Kuwait Auto Show', 'معرض الكويت للسيارات'), L('The G700 revealed, with private viewings and the first test drives.', 'الكشف عن G700، مع معاينات خاصة وأول تجارب القيادة.')],
        [L('Mall experience', 'تجربة المجمعات'), L('The Avenues · 360 Mall', 'الأفنيوز · 360 مول'), L('The projection runway, the life-size hologram and your own film.', 'منصة الإسقاط، والهولوغرام بالحجم الطبيعي، وفيلمك الخاص.')],
      ].map(([t, w, d, now]) => `<li class="reveal${now ? ' is-now' : ''}"><span class="phase-dot"></span><p class="eyebrow">${w}</p><h3 class="h3">${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="film" id="film">
  <video controls playsinline preload="none" poster="${A('g700/web/p1_1.webp')}"><source src="${A('g700/web/film.mp4')}" type="video/mp4"></video>
</section>

${split({ img: 'campaign/mall.webp', eb: L('The revealer', 'الكشف'), title: L('A G700 that changes colour as you watch.', 'G700 تتغير ألوانها أمام عينيك.'), body: `<p>${L('Projection-mapped at selected Kuwait malls, the G700 cycles through its seven official colours. Step up to the hologram, design yours life-size, and leave with a cinematic film of your build.', 'بتقنية الإسقاط الضوئي في مجمعات مختارة بالكويت، تتنقل G700 بين ألوانها الرسمية السبعة. اقترب من الهولوغرام، وصمّم سيارتك بالحجم الطبيعي، واحصل على فيلم سينمائي لتصميمك.')}</p>`, ctas: [btn(h('events'), L('See dates and locations', 'المواعيد والمواقع'), 'btn btn-ghost')] })}

<section class="section tone-light" id="register">
  <div class="container book-grid">
    <div class="book-copy reveal">
      ${eyebrow(L('Before launch', 'قبل الإطلاق'))}
      <h2 class="display-2">${L('Be first.', 'كن الأول.')}</h2>
      <p class="lead">${L('Register now for reveal invitations, private viewing slots and the first test drives in Kuwait.', 'سجّل الآن لتلقي دعوات الكشف، ومواعيد المعاينة الخاصة، وأول تجارب القيادة في الكويت.')}</p>
      <ul class="ticks">
        <li>${L('Invitation to the reveal', 'دعوة لحفل الكشف')}</li>
        <li>${L('Priority test-drive slot', 'أولوية في مواعيد تجربة القيادة')}</li>
        <li>${L('Early GAIA Club access', 'وصول مبكر لنادي GAIA')}</li>
      </ul>
    </div>
    <div class="reveal">${leadForm(c, { type: 'interest', submit: L('Register my interest', 'سجّل اهتمامي'), success: { t: L('You are on the list.', 'تم تسجيلك.'), d: L('We will send your invitation by WhatsApp and email before the reveal.', 'سنرسل لك الدعوة عبر واتساب والبريد الإلكتروني قبل الكشف.'), next: [btn(h('g700'), L('Explore the G700', 'اكتشف G700'), 'btn btn-ghost'), btn(h('build'), L('Build yours', 'صمّم سيارتك'), 'btn btn-ghost')] } })}</div>
  </div>
</section>`;
  return { title: L('Make your entrance', 'اصنع حضورك'), desc: L('JETOUR GAIA arrives in Kuwait. Register your interest for reveal invitations and the first test drives.', 'JETOUR GAIA تصل إلى الكويت. سجّل اهتمامك لتلقي دعوات الكشف وأول تجارب القيادة.'), body };
}

/* ============ G700 ============ */
export function g700(c) {
  const { L, h } = c;
  const stats = [
    ['3', L('locking differentials', 'أقفال تفاضلية')],
    ['7', L('official colours', 'ألوان رسمية')],
    ['3', L('cabin themes', 'ألوان مقصورة')],
    ['360°', L('surround cameras', 'كاميرات محيطية')],
  ];
  const specs = [
    [L('Body', 'الهيكل'), L('Full-size, body-on-frame luxury SUV', 'سيارة دفع رباعي فاخرة كاملة الحجم بهيكل على شاصي')],
    [L('Drivetrain', 'نظام الدفع'), L('Intelligent four-wheel drive with terrain modes', 'دفع رباعي ذكي مع أوضاع للتضاريس')],
    [L('Off-road', 'الطرق الوعرة'), L('Front, centre and rear locking differentials', 'أقفال تفاضلية أمامية ووسطى وخلفية')],
    [L('Seating', 'المقاعد'), L('Zero-gravity second-row seats, hand-finished leather', 'مقاعد صف ثانٍ بوضعية انعدام الجاذبية، جلد مُشطّب يدوياً')],
    [L('Cockpit', 'قمرة القيادة'), L('Wide-screen digital cockpit, connected infotainment', 'قمرة قيادة رقمية عريضة، نظام ترفيه متصل')],
    [L('Audio', 'الصوت'), L('Premium surround sound system', 'نظام صوت محيطي فاخر')],
    [L('Exterior colours', 'الألوان الخارجية'), G700_COLOURS.map((x) => L(x[1], x[2])).join(' · ')],
    [L('Interior themes', 'ألوان المقصورة'), INTERIORS.map((x) => L(x[1], x[2])).join(' · ')],
    [L('Starting price', 'السعر الابتدائي'), `${L('From', 'ابتداءً من')} ${kd(c, CONFIG.g700From)} · ${L('indicative', 'إرشادي')}`],
  ];
  const body = `
${pageHero(c, {
  eb: L('JETOUR GAIA G700', 'JETOUR GAIA G700'), title: 'G700',
  sub: L('The flagship luxury off-road SUV. Prestige, technology, boldness and design, in one vehicle.', 'سيارة الدفع الرباعي الفاخرة الرائدة. المكانة والتقنية والجرأة والتصميم في مركبة واحدة.'),
  img: 'g700/web/p2_2.webp', tall: true,
  ctas: [btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة')), btn(h('build'), L('Build your G700', 'صمّم G700 الخاصة بك'), 'btn btn-ghost')],
  note: `${L('From', 'ابتداءً من')} ${kd(c, CONFIG.g700From)}* · ${L('Sold and serviced by Al Mulla Auto', 'تُباع وتُصان من قِبل الملا للسيارات')}`,
})}
<nav class="subnav" data-subnav aria-label="G700">
  <div class="container subnav-inner">
    <span class="subnav-title">G700</span>
    <a href="#prestige">${L('Prestige', 'المكانة')}</a><a href="#technology">${L('Technology', 'التقنية')}</a><a href="#boldness">${L('Boldness', 'الجرأة')}</a><a href="#design">${L('Design', 'التصميم')}</a><a href="#specs">${L('Specifications', 'المواصفات')}</a>
    ${btn(h('testdrive'), L('Test drive', 'تجربة قيادة'), 'btn btn-sm')}
  </div>
</nav>

<section class="stats-band">
  <div class="container stats">${stats.map(([n, t]) => `<div class="stat reveal"><p class="stat-n">${n}</p><p>${t}</p></div>`).join('')}</div>
</section>

<section class="section" id="prestige">
  <div class="container">
    ${sectionHead({ eb: '01 · ' + L('Prestige', 'المكانة'), title: L('A first-class cabin, wherever the road ends.', 'مقصورة من الدرجة الأولى، أينما انتهى الطريق.'), sub: L('Zero-gravity seats recline the second row into a lounge. Hand-finished leather, ambient light and a hush that makes the longest drive feel short.', 'مقاعد انعدام الجاذبية تحوّل الصف الثاني إلى صالة استرخاء. جلد مُشطّب يدوياً، وإضاءة محيطية، وهدوء يجعل أطول رحلة تبدو قصيرة.') })}
    <div class="gallery-2">
      <figure class="reveal"><img src="${A('g700/web/p4_1.webp')}" alt="${L('G700 second row', 'الصف الثاني في G700')}" loading="lazy"><figcaption>${L('Zero-gravity second row', 'صف ثانٍ بوضعية انعدام الجاذبية')}</figcaption></figure>
      <figure class="reveal"><img src="${A('g700/web/p4_2.webp')}" alt="${L('G700 cabin', 'مقصورة G700')}" loading="lazy"><figcaption>${L('Space for the whole family', 'مساحة لكل العائلة')}</figcaption></figure>
    </div>
  </div>
</section>

<section class="section tone-deep" id="technology">
  <div class="container">
    ${sectionHead({ eb: '02 · ' + L('Technology', 'التقنية'), title: L('Engineered for control. Connected for calm.', 'مصممة للتحكم. متصلة للهدوء.') })}
    <div class="tech-grid">
      <figure class="tech-main reveal"><img src="${A('g700/web/p3_1.webp')}" alt="${L('G700 digital cockpit', 'قمرة القيادة الرقمية في G700')}" loading="lazy"></figure>
      <div class="tech-card reveal"><img src="${A('g700/web/p4_4.webp')}" alt="" loading="lazy"><h3 class="h4">${L('Intelligent chassis', 'هيكل ذكي')}</h3><p>${L('A rigid frame and intelligent four-wheel drive that reads the terrain for you.', 'هيكل صلب ودفع رباعي ذكي يقرأ التضاريس من أجلك.')}</p></div>
      <div class="tech-card reveal"><img src="${A('g700/web/p4_3.webp')}" alt="" loading="lazy"><h3 class="h4">${L('Premium sound', 'صوت فاخر')}</h3><p>${L('A surround system tuned to the cabin, for every seat.', 'نظام صوت محيطي مضبوط للمقصورة، لكل مقعد.')}</p></div>
    </div>
  </div>
</section>

<section class="fullbleed" id="boldness">
  <img src="${A('g700/web/p2_3.webp')}" alt="" loading="lazy">
  <div class="hero-shade"></div>
  <div class="container fullbleed-copy reveal">
    ${eyebrow('03 · ' + L('Boldness', 'الجرأة'))}
    <h2 class="display-2">${L('Go where others hesitate.', 'اذهب حيث يتردد الآخرون.')}</h2>
    <p class="lead">${L('Three locking differentials, dedicated terrain modes and the ground clearance to use them. Sand, rock and wadi, without losing your composure.', 'ثلاثة أقفال تفاضلية، وأوضاع مخصصة للتضاريس، وخلوص أرضي يتيح لك استخدامها. رمال وصخور ووديان، دون أن تفقد اتزانك.')}</p>
    <div class="btn-row">${btn(h('academy'), L('Off-road academy', 'أكاديمية الطرق الوعرة'), 'btn btn-ghost')}</div>
  </div>
</section>

<section class="section" id="design">
  <div class="container">
    ${sectionHead({ eb: '04 · ' + L('Design', 'التصميم'), title: L('Bold presence. Your signature.', 'حضور جريء. وتوقيعك الخاص.'), sub: L('Turn it, choose its colour, step inside. Then make it yours in Build your GAIA.', 'دوّرها، واختر لونها، وادخل مقصورتها. ثم اجعلها لك في صمّم GAIA.') })}
    <div class="tabs" data-tabs>
      <div class="tab-list" role="tablist">
        <button role="tab" aria-selected="true" aria-controls="t-col">${L('Colours', 'الألوان')}</button>
        <button role="tab" aria-selected="false" aria-controls="t-spin">${L('360° exterior', 'الخارج 360°')}</button>
        <button role="tab" aria-selected="false" aria-controls="t-3d">${L('3D model', 'نموذج ثلاثي الأبعاد')}</button>
        <button role="tab" aria-selected="false" aria-controls="t-int">${L('Interior', 'المقصورة')}</button>
      </div>
      <div class="tab-panel" id="t-col" role="tabpanel">${colourPicker(c, 'g700', 1)}</div>
      <div class="tab-panel" id="t-spin" role="tabpanel" hidden>${spin(c)}</div>
      <div class="tab-panel" id="t-3d" role="tabpanel" hidden>
        <div class="viewer3d" data-model="${A('models/g700.glb')}" data-model-alt="${L('3D model of the JETOUR G700', 'نموذج ثلاثي الأبعاد لـ JETOUR G700')}"><p class="viewer-loading">${L('Loading 3D model…', 'جارٍ تحميل النموذج…')}</p></div>
      </div>
      <div class="tab-panel" id="t-int" role="tabpanel" hidden>${pano(c, 'g700')}</div>
    </div>
    <div class="btn-row center">${btn(h('build'), L('Build your G700', 'صمّم G700 الخاصة بك'))}</div>
  </div>
</section>

<section class="section tone-light" id="specs">
  <div class="container specs-wrap">
    ${sectionHead({ eb: L('Specifications', 'المواصفات'), title: L('G700 at a glance', 'G700 في لمحة') })}
    <dl class="spec-list reveal">${specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    <p class="fine">* ${L('Kuwait specification, pricing and equipment are indicative and will be confirmed by Al Mulla Auto at launch.', 'مواصفات الكويت والأسعار والتجهيزات إرشادية وسيتم تأكيدها من قِبل الملا للسيارات عند الإطلاق.')}</p>
    <div class="btn-row">${btn(h('financing'), L('Calculate a monthly payment', 'احسب القسط الشهري'), 'btn btn-dark')}${btn(h('promise'), L('What ownership includes', 'ما تشمله الملكية'), 'btn btn-ghost-dark')}</div>
  </div>
</section>

<section class="section">
  <div class="container narrow">
    ${sectionHead({ eb: L('Before you book', 'قبل أن تحجز'), title: L('Questions, answered', 'إجابات أسئلتك') })}
    ${faq([
      [L('Can I order the exact build I made here?', 'هل يمكنني طلب التصميم الذي صممته هنا بالضبط؟'), L('Yes. Send your build to a consultant and it is attached to your request. Your consultant confirms availability and delivery timing.', 'نعم. أرسل تصميمك إلى مستشار وسيُرفق بطلبك. يؤكد لك المستشار التوفر وموعد التسليم.')],
      [L('Are instalment plans available?', 'هل تتوفر خطط تقسيط؟'), L('Yes, instalments and leasing are available through Al Mulla. Use the calculator for an indicative monthly payment.', 'نعم، يتوفر التقسيط والتأجير من خلال الملا. استخدم الحاسبة للحصول على قسط شهري إرشادي.')],
      [L('Which should I choose, G700 or F700?', 'أيهما أختار، G700 أم F700؟'), L('The G700 is a luxury off-road SUV; the F700 is a luxury pickup for those who carry more. A test drive is the best way to decide.', 'G700 سيارة دفع رباعي فاخرة، وF700 بيك أب فاخر لمن يحتاج حمولة أكبر. تجربة القيادة هي أفضل طريقة للاختيار.')],
      [L('Can the test drive come to me?', 'هل يمكن أن تأتي تجربة القيادة إليّ؟'), L('Yes. Choose a showroom, a drive from your home, or an off-road event.', 'نعم. اختر صالة العرض، أو تجربة من منزلك، أو فعالية طرق وعرة.')],
    ])}
  </div>
</section>

${testDriveBlock(c, 'G700')}`;
  return { title: 'G700', desc: L('The JETOUR GAIA G700 flagship luxury off-road SUV in Kuwait. Explore prestige, technology, boldness and design. From KD 13,500.', 'JETOUR GAIA G700 سيارة الدفع الرباعي الفاخرة الرائدة في الكويت. ابتداءً من 13,500 د.ك.'), body };
}

/* ============ F700 (held) ============ */
export function f700(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, {
  eb: L('JETOUR GAIA F700 · Coming soon', 'JETOUR GAIA F700 · قريباً'), title: 'F700',
  sub: L('The flagship luxury pickup. Freedom, versatility and rugged capability with premium refinement.', 'البيك أب الفاخر الرائد. حرية وتعدد استخدامات وقدرة صلبة مع رقيّ فاخر.'),
  img: 'f700/colours/cosmic-silver.webp', tall: true, align: 'bottom',
  ctas: [btn('#register', L('Register interest', 'سجّل اهتمامك')), btn(h('build') + '?model=f700', L('Build your F700', 'صمّم F700 الخاصة بك'), 'btn btn-ghost')],
  note: `${L('Indicatively from', 'ابتداءً من (إرشادي)')} ${kd(c, CONFIG.f700From)} · ${L('Kuwait details to follow', 'تفاصيل الكويت قريباً')}`,
})}
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('Colours', 'الألوان'), title: L('Five finishes for the open road.', 'خمسة ألوان للطريق المفتوح.'), center: true })}
    ${colourPicker(c, 'f700')}
  </div>
</section>
<section class="section tone-deep">
  <div class="container">
    ${sectionHead({ eb: L('Interior', 'المقصورة'), title: L('Pickup capability. Flagship cabin.', 'قدرة البيك أب. مقصورة الطراز الرائد.') })}
    ${pano(c, 'f700')}
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('3D', 'ثلاثي الأبعاد'), title: L('Turn it. Look closer.', 'دوّرها. وانظر عن قرب.') })}
    <div class="viewer3d" data-model="${A('models/f700.glb')}" data-model-alt="${L('3D model of the JETOUR F700', 'نموذج ثلاثي الأبعاد لـ JETOUR F700')}"><p class="viewer-loading">${L('Loading 3D model…', 'جارٍ تحميل النموذج…')}</p></div>
  </div>
</section>
<section class="section tone-light" id="register">
  <div class="container book-grid">
    <div class="book-copy reveal">
      ${eyebrow('F700')}
      <h2 class="display-2">${L('First to know.', 'كن أول من يعلم.')}</h2>
      <p class="lead">${L('Specifications, pricing and launch timing for Kuwait are being confirmed. Register and we will tell you first.', 'يجري تأكيد المواصفات والأسعار وموعد الإطلاق في الكويت. سجّل وسنخبرك أولاً.')}</p>
      ${btnArrow(h('g700'), L('Meanwhile, explore the G700', 'في الأثناء، اكتشف G700'))}
    </div>
    <div class="reveal">${leadForm(c, { type: 'interest', model: 'F700', submit: L('Register my interest', 'سجّل اهتمامي'), success: { t: L('You are on the F700 list.', 'تم تسجيلك في قائمة F700.'), d: L('We will contact you as soon as Kuwait details are confirmed.', 'سنتواصل معك فور تأكيد تفاصيل الكويت.'), next: [btn(h('g700'), L('Explore the G700', 'اكتشف G700'), 'btn btn-ghost')] } })}</div>
  </div>
</section>`;
  return { title: 'F700', desc: L('JETOUR GAIA F700 flagship luxury pickup, coming to Kuwait. Register your interest.', 'JETOUR GAIA F700 البيك أب الفاخر الرائد قادم إلى الكويت. سجّل اهتمامك.'), body };
}

/* ============ BUILD YOUR GAIA ============ */
export function build(c) {
  const { L, h } = c;
  const acc = [
    ['roofrack', L('Expedition roof rack', 'حامل سقف للرحلات')],
    ['ladder', L('Rear ladder', 'سلّم خلفي')],
    ['sidesteps', L('Illuminated side steps', 'عتبات جانبية مضيئة')],
    ['tyre', L('Spare-wheel cover', 'غطاء الإطار الاحتياطي')],
    ['recovery', L('Sand recovery kit', 'عُدّة الاستعادة من الرمال')],
    ['awning', L('Side awning', 'مظلة جانبية')],
    ['mats', L('Premium floor mats', 'دواسات أرضية فاخرة')],
    ['fridge', L('Console cool box', 'صندوق تبريد في الكونسول')],
  ];
  const presets = {
    status: { colour: 'frontier-black', interior: 'black-beige', acc: ['sidesteps', 'mats'] },
    adventure: { colour: 'dune-orange', interior: 'black-orange', acc: ['roofrack', 'ladder', 'recovery', 'awning'] },
    family: { colour: 'himalaya-white', interior: 'black-beige', acc: ['sidesteps', 'mats', 'fridge'] },
  };
  const data = {
    models: { g700: { name: 'G700', from: CONFIG.g700From, colours: G700_COLOURS.map(([k, en, ar, hex]) => ({ k, n: L(en, ar), hex })) }, f700: { name: 'F700', from: CONFIG.f700From, colours: F700_COLOURS.map(([k, en, ar, hex]) => ({ k, n: L(en, ar), hex })) } },
    interiors: INTERIORS.map(([k, en, ar, hex]) => ({ k, n: L(en, ar), hex })),
    acc: Object.fromEntries(acc),
    presets,
    t: { from: L('From', 'ابتداءً من'), kd: L('KD', 'د.ك'), none: L('None', 'لا يوجد'), sig: L('Signature', 'التوقيع'), saved: L('Build saved', 'تم حفظ التصميم') },
  };
  const step = (n, id, title, inner) => `<section class="cfg-step" id="${id}"><h2 class="cfg-h"><span>${n}</span>${title}</h2>${inner}</section>`;
  const body = `
<div class="cfg" data-configurator>
  <script type="application/json" data-cfg-data>${JSON.stringify(data)}</script>
  <div class="cfg-stage">
    <div class="cfg-view" data-cfg-view="photo"><img src="${A('g700/colours/silver-snow.webp')}" alt="" data-cfg-img></div>
    <div class="cfg-view" data-cfg-view="3d" hidden><div class="viewer3d viewer-fill" data-model="${A('models/g700.glb')}" data-model-alt="${L('3D model', 'نموذج ثلاثي الأبعاد')}"><p class="viewer-loading">${L('Loading 3D model…', 'جارٍ تحميل النموذج…')}</p></div></div>
    <div class="cfg-view" data-cfg-view="interior" hidden><div class="pano pano-fill" data-pano="${A('g700/interior/black-beige.webp')}" data-pano-auto></div></div>
    <div class="cfg-viewbar" role="tablist" aria-label="${L('View', 'العرض')}">
      <button role="tab" aria-selected="true" data-cfg-show="photo">${L('Exterior', 'الخارج')}</button>
      <button role="tab" aria-selected="false" data-cfg-show="3d">3D</button>
      <button role="tab" aria-selected="false" data-cfg-show="interior">${L('Interior 360°', 'المقصورة 360°')}</button>
    </div>
    <div class="cfg-signature" data-cfg-sig-preview hidden></div>
  </div>
  <aside class="cfg-panel">
    <div class="cfg-panel-head">
      ${eyebrow(L('Build your GAIA', 'صمّم GAIA الخاصة بك'))}
      <p class="cfg-model-name" data-cfg-name>G700</p>
      <p class="price" data-cfg-price></p>
    </div>
    ${step('01', 'cfg-model', L('Model', 'الطراز'), `<div class="opt-row">${['g700', 'f700'].map((m, i) => `<label class="opt-card"><input type="radio" name="cfg-model" value="${m}"${i === 0 ? ' checked' : ''}><span><b>${m.toUpperCase()}</b><small>${m === 'g700' ? L('Luxury off-road SUV', 'دفع رباعي فاخر') : L('Luxury pickup · coming soon', 'بيك أب فاخر · قريباً')}</small></span></label>`).join('')}</div>`)}
    ${step('02', 'cfg-colour', L('Exterior colour', 'اللون الخارجي'), `<p class="cfg-sel" data-cfg-colour-name></p><div class="swatches" data-cfg-colours role="radiogroup" aria-label="${L('Exterior colour', 'اللون الخارجي')}"></div>`)}
    ${step('03', 'cfg-interior', L('Interior', 'المقصورة'), `<div class="chip-row" role="radiogroup">${INTERIORS.map(([k, en, ar, hex], i) => `<button class="chip" role="radio" aria-checked="${i === 0}" data-cfg-interior="${k}"><i style="--sw:${hex}"></i>${L(en, ar)}</button>`).join('')}</div>`)}
    ${step('04', 'cfg-acc', L('Genuine accessories', 'إكسسوارات أصلية'), `<div class="acc-grid">${acc.map(([k, t]) => `<label class="acc"><input type="checkbox" value="${k}" data-cfg-acc><span>${t}</span></label>`).join('')}</div><p class="fine">${L('Accessory availability and pricing confirmed by your consultant.', 'يؤكد مستشارك توفر الإكسسوارات وأسعارها.')}</p>`)}
    ${step('05', 'cfg-sig', L('Your signature', 'توقيعك'), `<label class="field"><span>${L('Engraved in JETOUR Gold on the sill plate', 'يُنقش بذهبي JETOUR على عتبة الباب')}</span><input maxlength="18" data-cfg-sig placeholder="${L('Your name', 'اسمك')}"></label>`)}
    <section class="cfg-step cfg-summary">
      <h2 class="cfg-h"><span>06</span>${L('Your build', 'تصميمك')}</h2>
      <dl class="cfg-dl" data-cfg-summary></dl>
      <div class="btn-row">
        <button class="btn btn-block" data-cfg-send><span>${L('Save and send to a consultant', 'احفظ وأرسل إلى مستشار')}</span></button>
        <a class="btn btn-ghost btn-block" href="${h('testdrive')}" data-cfg-td><span>${L('Book a test drive with this build', 'احجز تجربة بهذا التصميم')}</span></a>
      </div>
    </section>
  </aside>
</div>
<dialog class="modal" data-cfg-modal aria-labelledby="send-h">
  <button class="modal-x" data-modal-close aria-label="${L('Close', 'إغلاق')}"></button>
  ${leadForm(c, { type: 'build', title: `<span id="send-h">${L('Send my build', 'أرسل تصميمي')}</span>`, sub: L('A consultant reviews it and calls you back with availability and an offer.', 'سيراجعه مستشار ويتصل بك بخصوص التوفر والعرض.'), submit: L('Send my build', 'أرسل تصميمي'), success: { t: L('Your build is with a consultant.', 'تصميمك لدى المستشار الآن.'), d: L('Expect a call or WhatsApp with availability and your offer.', 'توقّع اتصالاً أو رسالة واتساب بخصوص التوفر والعرض.'), next: [btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة')), btn(h('financing'), L('See financing', 'خيارات التمويل'), 'btn btn-ghost')] } })}
</dialog>`;
  return { title: L('Build your GAIA', 'صمّم GAIA الخاصة بك'), desc: L('Personalize your JETOUR GAIA: colour, interior, genuine accessories and your signature in JETOUR Gold.', 'خصّص JETOUR GAIA الخاصة بك: اللون والمقصورة والإكسسوارات الأصلية وتوقيعك بذهبي JETOUR.'), body, bodyClass: 'is-cfg' };
}

/* ============ TEST DRIVE ============ */
export function testdrive(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Experience', 'التجربة'), title: L('Your drive.<br>Your terms.', 'قيادتك.<br>بشروطك.'), sub: L('A personalized test drive with a named consultant: at the showroom, from your home, or out on the sand.', 'تجربة قيادة مخصّصة مع مستشار مخصّص: في صالة العرض، أو من منزلك، أو على الرمال.'), img: 'g700/web/p1_2.webp', ctas: [btn('#book', L('Book now', 'احجز الآن'))] })}
<section class="section">
  <div class="container">
    <div class="option-cards">
      ${[
        ['g700/web/p4_2.webp', L('At the showroom', 'في صالة العرض'), L('Coffee in the GAIA lounge, a walk-round with your consultant, then the drive.', 'قهوة في صالة GAIA، وجولة حول السيارة مع مستشارك، ثم التجربة.')],
        ['g700/web/p1_3.webp', L('At your home', 'في منزلك'), L('We bring the G700 to your door, at a time that suits your day.', 'نحضر G700 إلى بابك، في الوقت الذي يناسب يومك.')],
        ['g700/web/p2_2.webp', L('At an off-road event', 'في فعالية طرق وعرة'), L('Feel the capability with our instructors at Kuwait Motor Town and desert sessions.', 'اختبر القدرات مع مدرّبينا في مدينة الكويت للمحركات والجلسات الصحراوية.')],
      ].map(([img, t, d]) => `<article class="option-card reveal"><img src="${A(img)}" alt="" loading="lazy"><h2 class="h3">${t}</h2><p>${d}</p></article>`).join('')}
    </div>
  </div>
</section>
<section class="section tone-deep">
  <div class="container">
    ${sectionHead({ eb: L('What happens next', 'ماذا يحدث بعد ذلك'), title: L('From request to keys.', 'من الطلب إلى المفاتيح.') })}
    ${steps([
      [L('Request', 'الطلب'), L('Choose where and when. Your saved build comes with you.', 'اختر المكان والوقت. يُرفق تصميمك المحفوظ معك.')],
      [L('Concierge call', 'اتصال الكونسيرج'), L('A named consultant confirms by call or WhatsApp.', 'يؤكد مستشار مخصّص عبر الاتصال أو واتساب.')],
      [L('Your drive', 'تجربتك'), L('No rush, no script. Ask anything.', 'دون استعجال أو نص محفوظ. اسأل ما تشاء.')],
      [L('Premium handover', 'تسليم فاخر'), L('If you choose GAIA, your handover is an occasion, and the Club welcomes you at Bronze.', 'إذا اخترت GAIA، يكون التسليم مناسبة خاصة، ويرحب بك النادي في المستوى البرونزي.')],
    ])}
  </div>
</section>
${testDriveBlock(c)}`;
  return { title: L('Book a test drive', 'احجز تجربة قيادة'), desc: L('Book a personalized JETOUR GAIA test drive in Kuwait: showroom, at home or at an off-road event.', 'احجز تجربة قيادة JETOUR GAIA مخصّصة في الكويت: في صالة العرض أو المنزل أو فعالية طرق وعرة.'), body };
}

/* ============ SHOWROOM ============ */
export function showroom(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Experience', 'التجربة'), title: L('The GAIA lounge.', 'صالة GAIA.'), sub: L('Not a showroom floor. A lounge, private consultation rooms and a customization corner, designed around your time.', 'ليست مجرد صالة عرض. بل صالة استقبال وغرف استشارة خاصة وركن للتخصيص، صُممت حول وقتك.'), img: 'campaign/mall.webp', ctas: [btn('#visit', L('Book a visit', 'احجز زيارة'))] })}
<section class="section">
  <div class="container three-up">
    ${[
      [L('The lounge', 'الصالة'), L('Arrive, sit down, and let the car come to you. Arabic coffee and an unhurried conversation.', 'تفضّل بالجلوس ودع السيارة تأتي إليك. قهوة عربية وحديث دون استعجال.')],
      [L('VIP consultation rooms', 'غرف الاستشارة الخاصة'), L('Private rooms for you and your family to talk through the build, finance and handover.', 'غرف خاصة لك ولعائلتك لمناقشة التصميم والتمويل والتسليم.')],
      [L('Customization corner', 'ركن التخصيص'), L('Touch the leathers, see the paint in natural light, and finalize your signature.', 'المس الجلود، وشاهد الطلاء في الضوء الطبيعي، واعتمد توقيعك.')],
    ].map(([t, d], i) => `<div class="feature reveal"><span class="pillar-n">0${i + 1}</span><h2 class="h3">${t}</h2><p>${d}</p></div>`).join('')}
  </div>
</section>
${split({ img: 'g700/web/p4_1.webp', eb: L('Locations', 'المواقع'), title: L('Find GAIA in Kuwait', 'اعثر على GAIA في الكويت'), body: locations(c), tone: 'tone-deep' })}
<section class="section tone-light" id="visit">
  <div class="container book-grid">
    <div class="book-copy reveal">${eyebrow(L('Private visit', 'زيارة خاصة'))}<h2 class="display-2">${L('Book a visit', 'احجز زيارة')}</h2><p class="lead">${L('Tell us when you would like to come. Your consultant will be waiting, with your build ready.', 'أخبرنا متى تودّ الحضور. سيكون مستشارك في انتظارك، وتصميمك جاهز.')}</p>${trust(c)}</div>
    <div class="reveal">${leadForm(c, { type: 'visit', submit: L('Book my visit', 'احجز زيارتي') })}</div>
  </div>
</section>`;
  return { title: L('Showroom', 'صالة العرض'), desc: L('Visit the JETOUR GAIA lounge in Kuwait: VIP consultation rooms and a customization corner.', 'زر صالة JETOUR GAIA في الكويت: غرف استشارة خاصة وركن للتخصيص.'), body };
}

export function locations(c) {
  const { L } = c;
  const loc = [
    [L('GAIA Lounge & Showroom', 'صالة ومعرض GAIA'), L('Shuwaikh Industrial, Kuwait City', 'الشويخ الصناعية، مدينة الكويت'), L('Sat–Thu 9:00–21:00 · Fri 16:00–21:00', 'السبت–الخميس 9:00–21:00 · الجمعة 16:00–21:00'), 'Shuwaikh'],
    [L('Service Centre · Shuwaikh', 'مركز الخدمة · الشويخ'), L('Shuwaikh Industrial, Kuwait City', 'الشويخ الصناعية، مدينة الكويت'), L('Sat–Thu 7:30–19:00', 'السبت–الخميس 7:30–19:00'), 'Al Mulla Shuwaikh'],
    [L('Service Centre · Ahmadi', 'مركز الخدمة · الأحمدي'), L('Ahmadi Governorate', 'محافظة الأحمدي'), L('Sat–Thu 7:30–19:00', 'السبت–الخميس 7:30–19:00'), 'Al Mulla Ahmadi'],
  ];
  return `<ul class="loc-list">${loc.map(([t, a, hrs, q]) => `<li><h3 class="h4">${t}</h3><p>${a}</p><p class="muted">${hrs}</p><a class="link-arrow" href="https://maps.google.com/?q=${encodeURIComponent(q + ' Kuwait')}" target="_blank" rel="noopener"><span>${L('Directions', 'الاتجاهات')}</span>${arrow}</a></li>`).join('')}</ul><p class="fine">${L('Addresses and hours to be confirmed by Al Mulla Auto.', 'العناوين وساعات العمل قيد التأكيد من الملا للسيارات.')}</p>`;
}

/* ============ EVENTS ============ */
export function events(c) {
  const { L, h } = c;
  const ev = [
    ['display', 'autoshow', L('Kuwait Auto Show', 'معرض الكويت للسيارات'), L('The G700 grand reveal, private viewings and first drives.', 'الكشف الكبير عن G700، ومعاينات خاصة، وأول تجارب القيادة.'), L('Grand launch', 'الإطلاق الكبير'), 'g700/web/p1_3.webp'],
    ['drive', 'kmt', L('Off-road test drive · Kuwait Motor Town', 'تجربة طرق وعرة · مدينة الكويت للمحركات'), L('Feel the locking differentials and terrain modes with GAIA instructors.', 'اختبر الأقفال التفاضلية وأوضاع التضاريس مع مدرّبي GAIA.'), L('Monthly', 'شهرياً'), 'g700/web/p2_3.webp'],
    ['drive', 'levels', L('Test-drive day · Levels', 'يوم تجربة القيادة · ليفلز'), L('A relaxed afternoon of drives, with your consultant on hand.', 'عصرية هادئة من تجارب القيادة، مع مستشارك.'), L('Weekends', 'عطلات نهاية الأسبوع'), 'g700/web/p1_2.webp'],
    ['display', 'avenues', L('G700 display · The Avenues', 'عرض G700 · الأفنيوز'), L('The projection runway and life-size hologram. Leave with your own film.', 'منصة الإسقاط والهولوغرام بالحجم الطبيعي. واحصل على فيلمك الخاص.'), L('Launch season', 'موسم الإطلاق'), 'campaign/runway.webp'],
    ['display', '360', L('G700 display · 360 Mall', 'عرض G700 · 360 مول'), L('See every colour under projection, then book a private viewing.', 'شاهد كل الألوان تحت الإسقاط، ثم احجز معاينة خاصة.'), L('Launch season', 'موسم الإطلاق'), 'campaign/mall.webp'],
    ['club', 'ghabqa', L('GAIA Ramadan Ghabqa', 'غبقة GAIA الرمضانية'), L('An evening for owners, families and guests of the GAIA Club.', 'أمسية للملاك والعائلات وضيوف نادي GAIA.'), L('Ramadan', 'رمضان'), 'g700/web/p4_2.webp'],
  ];
  const body = `
${pageHero(c, { eb: L('Experience', 'التجربة'), title: L('Events & drives', 'الفعاليات والرحلات'), sub: L('Displays, test-drive days, off-road sessions and Club evenings across Kuwait.', 'عروض، وأيام تجربة قيادة، وجلسات طرق وعرة، وأمسيات النادي في أنحاء الكويت.'), img: 'campaign/runway.webp' })}
<section class="section">
  <div class="container">
    <div class="filter" role="group" aria-label="${L('Filter events', 'تصفية الفعاليات')}" data-filter>
      ${[['all', L('All', 'الكل')], ['display', L('Displays', 'العروض')], ['drive', L('Test drives', 'تجارب القيادة')], ['club', L('Club', 'النادي')]].map(([k, t], i) => `<button class="chip" aria-pressed="${i === 0}" data-filter-btn="${k}">${t}</button>`).join('')}
    </div>
    <div class="event-list">
      ${ev.map(([cat, k, t, d, when, img]) => `<article class="event reveal" data-cat="${cat}"><img src="${A(img)}" alt="" loading="lazy"><div class="event-copy"><p class="eyebrow">${when}</p><h2 class="h3">${t}</h2><p>${d}</p></div><a class="btn btn-sm btn-ghost" href="#register" data-event-pick="${k}"><span>${L('Register', 'سجّل')}</span></a></article>`).join('')}
    </div>
    <p class="fine">${L('Dates are announced to registered guests first.', 'تُعلن المواعيد للضيوف المسجلين أولاً.')}</p>
  </div>
</section>
<section class="section tone-light" id="register">
  <div class="container book-grid">
    <div class="book-copy reveal">${eyebrow(L('Events', 'الفعاليات'))}<h2 class="display-2">${L('Save your place.', 'احجز مكانك.')}</h2><p class="lead">${L('Register and we will confirm the date, time and your guest list.', 'سجّل وسنؤكد لك التاريخ والوقت وقائمة ضيوفك.')}</p></div>
    <div class="reveal">${leadForm(c, { type: 'event', submit: L('Register for the event', 'سجّل في الفعالية') })}</div>
  </div>
</section>`;
  return { title: L('Events & drives', 'الفعاليات والرحلات'), desc: L('JETOUR GAIA events in Kuwait: Auto Show, test-drive days, mall displays and Club evenings.', 'فعاليات JETOUR GAIA في الكويت: معرض السيارات، وأيام تجربة القيادة، وعروض المجمعات، وأمسيات النادي.'), body };
}
