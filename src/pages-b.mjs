import { CONFIG } from './config.mjs';
import { A, arrow, btn, btnArrow, eyebrow, pageHero, sectionHead, split, fullBleed, ctaBand, steps, faq, leadForm, trust } from './components.mjs';
import { testDriveBlock, storyCards, locations } from './pages-a.mjs';

const formBlock = (c, { eb, title, lead, form, side = '' }) => `
<section class="section tone-light" id="form">
  <div class="container book-grid">
    <div class="book-copy reveal">${eyebrow(eb)}<h2 class="display-2">${title}</h2><p class="lead">${lead}</p>${side}${trust(c)}</div>
    <div class="reveal">${form}</div>
  </div>
</section>`;

/* ============ AL MULLA PROMISE ============ */
export function promise(c) {
  const { L, h } = c;
  const pillars = [
    ['parts', L('Parts availability', 'توفّر قطع الغيار'), L('Genuine JETOUR parts held in Kuwait, with a planned stock for the GAIA range, so your car is back on the road quickly.', 'قطع JETOUR الأصلية متوفرة في الكويت، مع مخزون مخطط لفئة GAIA، لتعود سيارتك إلى الطريق بسرعة.')],
    ['card', L('Ownership cost', 'تكلفة الملكية'), L('Service plans with clear prices, set out before you buy. No surprises at the service desk.', 'خطط صيانة بأسعار واضحة، تُعرض قبل الشراء. لا مفاجآت عند مكتب الخدمة.')],
    ['shield', L('Warranty', 'الضمان'), L('Every GAIA sold by Al Mulla carries the manufacturer warranty, honoured in Kuwait. Your advisor walks you through the cover.', 'كل GAIA تبيعها الملا تحمل ضمان الشركة المصنعة، المعتمد في الكويت. يشرح لك مستشارك تفاصيل التغطية.')],
    ['road', L('24/7 roadside assistance', 'مساعدة على الطريق 24/7'), L('One number, day or night, anywhere in Kuwait: in the city or out in the desert.', 'رقم واحد، ليلاً أو نهاراً، في أي مكان في الكويت: داخل المدينة أو في الصحراء.')],
    ['service', L('Shuwaikh and Ahmadi', 'الشويخ والأحمدي'), L('Two service centres with factory-trained technicians, plus pick-up and drop-off.', 'مركزا خدمة بفنيين مدرّبين من المصنع، مع خدمة الاستلام والتوصيل.')],
    ['finance', L('Financing through Al Mulla', 'التمويل عبر الملا'), L('Instalment and leasing plans arranged in-house, at the same desk as your purchase.', 'خطط التقسيط والتأجير تُرتّب داخلياً، في نفس مكتب الشراء.')],
  ];
  const body = `
${pageHero(c, { eb: L('Ownership', 'الملكية'), title: L('The Al Mulla<br>Promise', 'وعد<br>الملا'), sub: L('A new premium brand should come with an old, trusted name behind it. Every JETOUR GAIA is sold, serviced and supported in Kuwait by Al Mulla Auto.', 'العلامة الفاخرة الجديدة تستحق اسماً عريقاً وموثوقاً خلفها. كل JETOUR GAIA تُباع وتُصان وتُدعم في الكويت من قِبل الملا للسيارات.'), img: 'g700/web/p4_4.webp', ctas: [btn(h('service'), L('Book a service', 'احجز صيانة')), btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة'), 'btn btn-ghost')] })}
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('Six commitments', 'ستة التزامات'), title: L('Confidence, in writing.', 'ثقة، مكتوبة.'), sub: L('The two questions every buyer of a new premium brand asks: what will it cost to own, and who will look after it? Here are our answers.', 'السؤالان اللذان يطرحهما كل مشترٍ لعلامة فاخرة جديدة: كم ستكلف الملكية، ومن سيعتني بها؟ إليك إجاباتنا.') })}
    <div class="promise-grid six">${pillars.map(([i, t, d]) => `<div class="promise-item reveal"><span class="pi pi-${i}"></span><h2 class="h4">${t}</h2><p>${d}</p></div>`).join('')}</div>
  </div>
</section>
${split({ img: 'g700/web/p4_3.webp', eb: L('Service centres', 'مراكز الخدمة'), title: L('Shuwaikh and Ahmadi.', 'الشويخ والأحمدي.'), body: locations(c), ctas: [btn(h('service'), L('Book a service', 'احجز صيانة'))], tone: 'tone-deep' })}
<section class="section">
  <div class="container narrow">
    ${sectionHead({ eb: L('Questions', 'أسئلة'), title: L('Ownership, answered', 'إجابات عن الملكية') })}
    ${faq([
      [L('I bought my G700 before Al Mulla. Am I covered?', 'اشتريت G700 قبل الملا. هل أنا مشمول؟'), L('Register your vehicle in the Owners hub and we will check your warranty status and welcome you into Al Mulla aftersales.', 'سجّل مركبتك في مركز الملاك وسنتحقق من حالة الضمان ونرحب بك في خدمات ما بعد البيع لدى الملا.')],
      [L('Where are parts held?', 'أين تُخزّن قطع الغيار؟'), L('Genuine JETOUR parts are stocked in Kuwait by Al Mulla, with planned availability for the GAIA range.', 'قطع JETOUR الأصلية مخزّنة في الكويت لدى الملا، مع توفّر مخطط لفئة GAIA.')],
      [L('What does a service cost?', 'كم تكلف الصيانة؟'), L('Your consultant shares service-plan pricing before you buy, so the cost of ownership is clear from day one.', 'يشاركك مستشارك أسعار خطط الصيانة قبل الشراء، لتكون تكلفة الملكية واضحة منذ اليوم الأول.')],
    ])}
  </div>
</section>
${ctaBand(c, { title: L('Ready when you are.', 'جاهزون متى ما كنت جاهزاً.'), sub: L('Drive it, or bring yours in.', 'جرّبها، أو أحضر سيارتك.'), ctas: [btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة')), btn(h('service'), L('Book a service', 'احجز صيانة'), 'btn btn-ghost')] })}`;
  return { title: L('The Al Mulla Promise', 'وعد الملا'), desc: L('Parts availability, ownership cost, warranty, 24/7 roadside and service in Shuwaikh and Ahmadi.', 'توفّر قطع الغيار، وتكلفة الملكية، والضمان، والمساعدة على الطريق 24/7، والخدمة في الشويخ والأحمدي.'), body };
}

/* ============ FINANCING ============ */
export function financing(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Ownership', 'الملكية'), title: L('Financing<br>& leasing', 'التمويل<br>والتأجير'), sub: L('Instalment plans and leasing, arranged through Al Mulla at the same desk as your purchase.', 'خطط التقسيط والتأجير، تُرتّب عبر الملا في نفس مكتب الشراء.'), img: 'g700/web/p1_3.webp' })}
<section class="section">
  <div class="container calc" data-calc data-kd="${L('KD', 'د.ك')}">
    <div class="calc-in reveal">
      ${sectionHead({ eb: L('Calculator', 'الحاسبة'), title: L('Your monthly payment', 'قسطك الشهري') })}
      <div class="seg calc-model">
        <label><input type="radio" name="calc-model" value="13500" data-model="G700" checked><span>G700</span></label>
        <label><input type="radio" name="calc-model" value="11999" data-model="F700"><span>F700</span></label>
      </div>
      <label class="range"><span>${L('Vehicle price', 'سعر المركبة')}<output data-out="price"></output></span><input type="range" min="11000" max="25000" step="100" value="13500" data-in="price"></label>
      <label class="range"><span>${L('Down payment', 'الدفعة الأولى')}<output data-out="down"></output></span><input type="range" min="0" max="50" step="5" value="20" data-in="down"></label>
      <label class="range"><span>${L('Term', 'المدة')}<output data-out="term"></output></span><input type="range" min="12" max="60" step="12" value="48" data-in="term"></label>
      <label class="range"><span>${L('Indicative profit rate (flat, yearly)', 'نسبة الربح الإرشادية (ثابتة، سنوية)')}<output data-out="rate"></output></span><input type="range" min="0" max="8" step="0.25" value="3.5" data-in="rate"></label>
    </div>
    <div class="calc-out reveal">
      <p class="eyebrow">${L('Estimated monthly instalment', 'القسط الشهري التقديري')}</p>
      <p class="calc-big" data-out="monthly"></p>
      <dl class="cfg-dl">
        <div><dt>${L('Down payment', 'الدفعة الأولى')}</dt><dd data-out="downKD"></dd></div>
        <div><dt>${L('Amount financed', 'المبلغ الممول')}</dt><dd data-out="fin"></dd></div>
        <div><dt>${L('Total payable', 'إجمالي المبلغ المستحق')}</dt><dd data-out="total"></dd></div>
      </dl>
      <a class="btn btn-block" href="#form" data-calc-apply><span>${L('Request this offer', 'اطلب هذا العرض')}</span></a>
      <p class="fine">${L('Illustration only. Your final offer, rate and eligibility are confirmed by the Al Mulla finance team.', 'للتوضيح فقط. يؤكد فريق التمويل في الملا العرض النهائي والنسبة والأهلية.')}</p>
    </div>
  </div>
</section>
<section class="section tone-deep">
  <div class="container compare-2">
    ${[
      [L('Instalments', 'التقسيط'), L('Own it from day one', 'تملّكها من اليوم الأول'), [L('Terms from 12 to 60 months', 'مدد من 12 إلى 60 شهراً'), L('Down payment from 0%, subject to approval', 'دفعة أولى من 0%، حسب الموافقة'), L('Service plan can be included', 'يمكن تضمين خطة الصيانة')]],
      [L('Leasing', 'التأجير'), L('Drive the newest, worry less', 'قُد الأحدث، بقلق أقل'), [L('Fixed monthly cost', 'تكلفة شهرية ثابتة'), L('Maintenance and insurance options', 'خيارات الصيانة والتأمين'), L('Upgrade at the end of the term', 'الترقية في نهاية المدة')]],
    ].map(([t, s, li]) => `<div class="plan reveal"><p class="eyebrow">${s}</p><h2 class="h2">${t}</h2><ul class="ticks">${li.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
  </div>
</section>
${formBlock(c, { eb: L('Finance offer', 'عرض التمويل'), title: L('Get your offer', 'احصل على عرضك'), lead: L('The Al Mulla finance team prepares a personal offer and calls you back.', 'يُعد فريق التمويل في الملا عرضاً شخصياً ويتصل بك.'), form: leadForm(c, { type: 'finance', submit: L('Request a finance offer', 'اطلب عرض تمويل'), success: { t: L('Your request is with our finance team.', 'طلبك لدى فريق التمويل.'), d: L('Expect a call with your personal offer.', 'توقّع اتصالاً بعرضك الشخصي.'), next: [btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة'), 'btn btn-ghost')] } }) })}`;
  return { title: L('Financing & leasing', 'التمويل والتأجير'), desc: L('JETOUR GAIA instalment plans and leasing through Al Mulla, with a monthly payment calculator.', 'خطط تقسيط وتأجير JETOUR GAIA عبر الملا، مع حاسبة للقسط الشهري.'), body };
}

/* ============ MOVING UP ============ */
export function moveup(c) {
  const { L, h } = c;
  const rows = [
    [L('Positioning', 'التموضع'), L('Smart, versatile everyday SUVs', 'سيارات دفع رباعي يومية ذكية ومتعددة الاستخدامات'), L('Flagship luxury off-road', 'فخامة رائدة على الطرق الوعرة')],
    [L('Showroom', 'صالة العرض'), L('JETOUR showroom', 'صالة عرض JETOUR'), L('The GAIA lounge, VIP rooms, customization corner', 'صالة GAIA، وغرف خاصة، وركن التخصيص')],
    [L('Test drive', 'تجربة القيادة'), L('At the showroom', 'في صالة العرض'), L('Showroom, at home or an off-road event', 'صالة العرض، أو المنزل، أو فعالية طرق وعرة')],
    [L('Handover', 'التسليم'), L('Standard delivery', 'تسليم قياسي'), L('Premium handover, an occasion of its own', 'تسليم فاخر، مناسبة بحد ذاتها')],
    [L('Relationship', 'العلاقة'), L('Service reminders', 'تذكيرات الصيانة'), L('A named concierge consultant and the GAIA Club', 'مستشار كونسيرج مخصّص ونادي GAIA')],
    [L('Capability', 'القدرات'), L('Confident on-road, light off-road', 'ثقة على الطريق، وطرق وعرة خفيفة'), L('Three locking differentials, terrain modes, body-on-frame', 'ثلاثة أقفال تفاضلية، وأوضاع تضاريس، وهيكل على شاصي')],
  ];
  const body = `
${pageHero(c, { eb: L('Moving up', 'الانتقال للأعلى'), title: L('From T-Series<br>to GAIA.', 'من الفئة T<br>إلى GAIA.'), sub: L('Your T-Series has served you well. When you are ready for more capability and a different kind of ownership, here is the difference, set out plainly.', 'خدمتك سيارتك من الفئة T جيداً. وعندما تكون مستعداً لقدرات أكبر ونوع مختلف من الملكية، إليك الفرق بوضوح.'), img: 'g700/web/p2_1.webp', ctas: [btn('#form', L('Value my trade-in', 'قيّم سيارتي')), btn(h('g700'), L('Explore G700', 'اكتشف G700'), 'btn btn-ghost')] })}
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('The difference', 'الفرق'), title: L('Same family. A different class.', 'العائلة نفسها. فئة مختلفة.') })}
    <div class="compare-table reveal" role="table">
      <div class="ct-row ct-head" role="row"><span role="columnheader"></span><span role="columnheader">JETOUR T-Series</span><span role="columnheader">JETOUR GAIA</span></div>
      ${rows.map(([k, t, g]) => `<div class="ct-row" role="row"><span role="rowheader">${k}</span><span role="cell">${t}</span><span role="cell">${g}</span></div>`).join('')}
    </div>
  </div>
</section>
<section class="section tone-deep">
  <div class="container">
    ${sectionHead({ eb: L('How it works', 'كيف تعمل'), title: L('A step up, with a price on it.', 'خطوة للأعلى، بسعر واضح.') })}
    ${steps([
      [L('Value', 'التقييم'), L('Tell us about your current car for a trade-in valuation.', 'أخبرنا عن سيارتك الحالية لتقييم الاستبدال.')],
      [L('Compare', 'المقارنة'), L('See your valuation and a finance offer side by side.', 'شاهد التقييم وعرض التمويل جنباً إلى جنب.')],
      [L('Drive', 'التجربة'), L('Book a test drive with your valuation attached.', 'احجز تجربة قيادة مع إرفاق التقييم.')],
      [L('Own', 'التملك'), L('Handover, registration and the GAIA Club.', 'التسليم، والتسجيل، ونادي GAIA.')],
    ])}
  </div>
</section>
${formBlock(c, { eb: L('Trade-in', 'الاستبدال'), title: L('Value my trade-in', 'قيّم سيارتي'), lead: L('Our sales and used-car team will call with a valuation and a finance offer for your GAIA.', 'سيتصل بك فريق المبيعات والسيارات المستعملة بتقييم وعرض تمويل لسيارة GAIA.'), side: btnArrow(h('financing'), L('Try the finance calculator', 'جرّب حاسبة التمويل')), form: leadForm(c, { type: 'tradein', audience: 'tseries', submit: L('Get my valuation', 'احصل على تقييمي'), success: { t: L('Your valuation request is in.', 'تم استلام طلب التقييم.'), d: L('A consultant will call with your valuation and a finance offer, side by side.', 'سيتصل بك مستشار بالتقييم وعرض التمويل جنباً إلى جنب.'), next: [btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة'))] } }) })}`;
  return { title: L('Moving up from T-Series', 'الانتقال من الفئة T'), desc: L('JETOUR T-Series owners: see what the G-Series adds and get a trade-in valuation.', 'ملاك JETOUR من الفئة T: اكتشفوا ما تضيفه الفئة G واحصلوا على تقييم الاستبدال.'), body };
}

/* ============ OWNERS HUB ============ */
export function owners(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Owners', 'الملاك'), title: L('Welcome to<br>Al Mulla.', 'أهلاً بك<br>في الملا.'), sub: L('Your G700 has a new home in Kuwait. Here is what changes for you, and what you gain.', 'سيارتك G700 لها بيت جديد في الكويت. إليك ما يتغير لك، وما تكسبه.'), img: 'g700/web/p1_1.webp', ctas: [btn(h('register'), L('Register my vehicle', 'سجّل مركبتي')), btn(h('service'), L('Book a service', 'احجز صيانة'), 'btn btn-ghost')] })}
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('What changes', 'ما الذي يتغير'), title: L('Everything you need, closer.', 'كل ما تحتاجه، أقرب.') })}
    <div class="promise-grid">
      ${[
        ['service', L('Service in Shuwaikh and Ahmadi', 'الخدمة في الشويخ والأحمدي'), L('Two centres, factory-trained technicians, pick-up and drop-off.', 'مركزان، وفنيون مدرّبون من المصنع، واستلام وتوصيل.')],
        ['parts', L('Parts, available', 'قطع غيار متوفرة'), L('Genuine JETOUR parts stocked locally for the GAIA range.', 'قطع JETOUR الأصلية مخزّنة محلياً لفئة GAIA.')],
        ['shield', L('Your warranty, checked', 'ضمانك، بعد التحقق'), L('Register and we confirm your warranty status with you.', 'سجّل وسنؤكد معك حالة الضمان.')],
        ['road', L('24/7 roadside', 'مساعدة على الطريق 24/7'), L('One number, day or night, anywhere in Kuwait.', 'رقم واحد، ليلاً أو نهاراً، في أي مكان في الكويت.')],
      ].map(([i, t, d]) => `<div class="promise-item reveal"><span class="pi pi-${i}"></span><h3 class="h4">${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>
<section class="section tone-deep">
  <div class="container">
    ${sectionHead({ eb: L('Three steps', 'ثلاث خطوات'), title: L('Your first month with Al Mulla.', 'شهرك الأول مع الملا.') })}
    <div class="owner-steps">
      ${[
        ['register', '01', L('Register my vehicle', 'سجّل مركبتي'), L('Two minutes. It creates your owner record and checks your warranty.', 'دقيقتان. يُنشئ سجل الملكية ويتحقق من الضمان.')],
        ['service', '02', L('Book a first check-up', 'احجز أول فحص'), L('A complimentary welcome inspection at Shuwaikh or Ahmadi.', 'فحص ترحيبي في الشويخ أو الأحمدي.')],
        ['join', '03', L('Join the GAIA Club', 'انضم إلى نادي GAIA'), L('With recognition as an early owner.', 'مع تقدير خاص بصفتك من أوائل الملاك.')],
      ].map(([k, n, t, d]) => `<a class="router-card reveal" href="${h(k)}"><span class="pillar-n">${n}</span><h3 class="h3">${t}</h3><p>${d}</p>${arrow}</a>`).join('')}
    </div>
    <p class="fine">${L('Welcome inspection terms to be confirmed by Al Mulla Auto.', 'شروط الفحص الترحيبي قيد التأكيد من الملا للسيارات.')}</p>
  </div>
</section>
${fullBleed({ img: 'g700/web/p2_3.webp', eb: L('Early owners', 'أوائل الملاك'), title: L('You were here first.', 'كنت هنا أولاً.'), sub: L('Owners who register before the Club launch join with early-owner recognition, priority invitations to the off-road academy and owner drives.', 'الملاك الذين يسجلون قبل إطلاق النادي ينضمون بتقدير أوائل الملاك، ودعوات ذات أولوية لأكاديمية الطرق الوعرة ورحلات الملاك.'), ctas: [btn(h('register'), L('Register my vehicle', 'سجّل مركبتي'))] })}`;
  return { title: L('Owners hub', 'مركز الملاك'), desc: L('G700 owners: welcome to Al Mulla. Register your vehicle, book a service and join the GAIA Club.', 'ملاك G700: أهلاً بكم في الملا. سجّلوا مركباتكم، واحجزوا الصيانة، وانضموا إلى نادي GAIA.'), body };
}

export function register(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Owners', 'الملاك'), title: L('Register my<br>vehicle', 'سجّل<br>مركبتي'), sub: L('Bring your G700 into Al Mulla aftersales. It takes two minutes.', 'أدخل سيارتك G700 إلى خدمات ما بعد البيع لدى الملا. يستغرق الأمر دقيقتين.'), img: 'g700/web/p1_3.webp' })}
${formBlock(c, { eb: L('Owner record', 'سجل المالك'), title: L('Your G700, at home with Al Mulla', 'سيارتك G700، في بيتها لدى الملا'), lead: L('We use these details to create your owner record, check your warranty status and invite you to the GAIA Club.', 'نستخدم هذه البيانات لإنشاء سجل الملكية، والتحقق من حالة الضمان، ودعوتك إلى نادي GAIA.'), side: `<ul class="ticks"><li>${L('Warranty status check', 'التحقق من حالة الضمان')}</li><li>${L('Service reminders', 'تذكيرات الصيانة')}</li><li>${L('Early-owner Club invitation', 'دعوة النادي لأوائل الملاك')}</li></ul>`, form: leadForm(c, { type: 'register', audience: 'owner', submit: L('Register my vehicle', 'سجّل مركبتي'), success: { t: L('Welcome to Al Mulla.', 'أهلاً بك في الملا.'), d: L('Your owner record is being created. Our aftersales team will confirm your warranty status.', 'يجري إنشاء سجل الملكية الخاص بك. سيؤكد فريق ما بعد البيع حالة الضمان.'), next: [btn(h('service'), L('Book a first check-up', 'احجز أول فحص')), btn(h('join'), L('Join the GAIA Club', 'انضم إلى نادي GAIA'), 'btn btn-ghost')] } }) })}`;
  return { title: L('Register my vehicle', 'سجّل مركبتي'), desc: L('Register your JETOUR G700 with Al Mulla Auto.', 'سجّل سيارتك JETOUR G700 لدى الملا للسيارات.'), body };
}

export function service(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Owners', 'الملاك'), title: L('Service<br>booking', 'حجز<br>الصيانة'), sub: L('Book at Shuwaikh or Ahmadi, with pick-up and drop-off if you need it.', 'احجز في الشويخ أو الأحمدي، مع الاستلام والتوصيل إن احتجت.'), img: 'g700/web/p4_4.webp' })}
<section class="section">
  <div class="container three-up">
    ${[
      [L('Warranty', 'الضمان'), L('Check your cover with your service advisor at any visit.', 'تحقق من تغطيتك مع مستشار الخدمة في أي زيارة.')],
      [L('Service record', 'سجل الصيانة'), L('Every visit is logged to your owner record.', 'تُسجّل كل زيارة في سجل الملكية الخاص بك.')],
      [L('Pick-up and drop-off', 'الاستلام والتوصيل'), L('We collect your car and bring it back.', 'نستلم سيارتك ونعيدها إليك.')],
    ].map(([t, d], i) => `<div class="feature reveal"><span class="pillar-n">0${i + 1}</span><h2 class="h3">${t}</h2><p>${d}</p></div>`).join('')}
  </div>
</section>
${formBlock(c, { eb: L('Aftersales', 'ما بعد البيع'), title: L('Book a service', 'احجز صيانة'), lead: L('Choose your centre and date. Our aftersales team confirms your slot.', 'اختر المركز والتاريخ. يؤكد فريق ما بعد البيع موعدك.'), side: btnArrow(h('register'), L('Not registered yet? Register first', 'لم تسجّل بعد؟ سجّل أولاً')), form: leadForm(c, { type: 'service', audience: 'owner', submit: L('Book my service', 'احجز صيانتي'), success: { t: L('Your service is requested.', 'تم طلب الصيانة.'), d: L('Aftersales will confirm your slot by call or WhatsApp.', 'سيؤكد فريق ما بعد البيع موعدك عبر الاتصال أو واتساب.'), next: [btn(h('join'), L('Join the GAIA Club', 'انضم إلى نادي GAIA'), 'btn btn-ghost')] } }) })}`;
  return { title: L('Service booking', 'حجز الصيانة'), desc: L('Book a JETOUR GAIA service at Al Mulla Shuwaikh or Ahmadi.', 'احجز صيانة JETOUR GAIA في الملا الشويخ أو الأحمدي.'), body };
}

/* ============ GAIA CLUB ============ */
const TIERS = (L) => [
  ['bronze', L('Bronze', 'برونزي'), L('Every new owner, from handover', 'كل مالك جديد، منذ التسليم'), [L('GAIA loyalty card', 'بطاقة ولاء GAIA'), L('Owner drives and Club events', 'رحلات الملاك وفعاليات النادي'), L('Academy foundations session', 'جلسة الأساسيات في الأكاديمية')]],
  ['silver', L('Silver', 'فضي'), L('Active owners and referrers', 'الملاك النشطون والمُحيلون'), [L('Priority service booking', 'أولوية حجز الصيانة'), L('Dune-level academy sessions', 'جلسات الكثبان في الأكاديمية'), L('Partner offers', 'عروض الشركاء')]],
  ['gold', L('Gold', 'ذهبي'), L('Challenge finishers and long-time members', 'من أتمّوا التحديات والأعضاء القدامى'), [L('Expedition drives', 'رحلات استكشافية'), L('Private launch previews', 'معاينات إطلاق خاصة'), L('Gold signature details', 'لمسات توقيع ذهبية')]],
  ['captain', L('Captain', 'كابتن'), L('By invitation: those who lead the convoy', 'بالدعوة: لمن يقودون القافلة'), [L('Lead Club drives', 'قيادة رحلات النادي'), L('Host owner events', 'استضافة فعاليات الملاك'), L('A seat at the GAIA owner council', 'مقعد في مجلس ملاك GAIA')]],
];

export function club(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: 'GAIA Club', title: L('Belong.', 'انتمِ.'), sub: L('Owner drives, the off-road academy, challenges and private events. From Bronze to Captain, the Club grows with you.', 'رحلات الملاك، وأكاديمية الطرق الوعرة، والتحديات، والفعاليات الخاصة. من البرونزي إلى الكابتن، ينمو النادي معك.'), img: 'g700/web/p2_2.webp', ctas: [btn(h('join'), L('Join the Club', 'انضم إلى النادي')), btn(h('academy'), L('Off-road academy', 'أكاديمية الطرق الوعرة'), 'btn btn-ghost')] })}
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('Tiers & benefits', 'المستويات والمزايا'), title: L('Bronze to Captain.', 'من البرونزي إلى الكابتن.') })}
    <div class="tiers">
      ${TIERS(L).map(([k, t, who, li]) => `<article class="tier t-${k} reveal"><span class="tier-badge"></span><h2 class="h3">${t}</h2><p class="muted">${who}</p><ul class="ticks">${li.map((x) => `<li>${x}</li>`).join('')}</ul></article>`).join('')}
    </div>
    <p class="fine">${L('Tier names and benefits are working proposals, pending final confirmation.', 'أسماء المستويات والمزايا مقترحات أولية، بانتظار التأكيد النهائي.')}</p>
  </div>
</section>
<section class="section tone-deep">
  <div class="container three-up">
    ${[
      [L('Challenges', 'التحديات'), L('Seasonal routes and skills challenges that move you up the tiers.', 'مسارات موسمية وتحديات مهارات ترفعك في المستويات.')],
      [L('Referrals', 'الإحالات'), L('Bring a friend into GAIA and both of you are rewarded.', 'أحضر صديقاً إلى GAIA وستُكافآن كلاكما.')],
      [L('Family first', 'العائلة أولاً'), L('Events designed for the whole family, from Ghabqa to beach days.', 'فعاليات مصممة لكل العائلة، من الغبقة إلى أيام الشاطئ.')],
    ].map(([t, d], i) => `<div class="feature reveal"><span class="pillar-n">0${i + 1}</span><h2 class="h3">${t}</h2><p>${d}</p></div>`).join('')}
  </div>
</section>
${fullBleed({ img: 'g700/web/p2_3.webp', eb: L('Off-road academy', 'أكاديمية الطرق الوعرة'), title: L('Learn the sand.', 'تعلّم الرمال.'), sub: L('From your first air-down to leading a convoy, with GAIA instructors.', 'من أول تخفيض لضغط الإطارات إلى قيادة قافلة، مع مدرّبي GAIA.'), ctas: [btn(h('academy'), L('Explore the academy', 'اكتشف الأكاديمية'))] })}
${ctaBand(c, { title: L('Your place is waiting.', 'مكانك بانتظارك.'), sub: L('Owners join at Bronze. Not an owner yet? Join the waitlist.', 'ينضم الملاك في المستوى البرونزي. لست مالكاً بعد؟ انضم إلى قائمة الانتظار.'), ctas: [btn(h('join'), L('Join the Club', 'انضم إلى النادي'))] })}`;
  return { title: L('GAIA Club', 'نادي GAIA'), desc: L('The GAIA Club: tiers from Bronze to Captain, owner drives, the off-road academy, challenges and referrals.', 'نادي GAIA: مستويات من البرونزي إلى الكابتن، ورحلات الملاك، وأكاديمية الطرق الوعرة، والتحديات، والإحالات.'), body };
}

export function academy(c) {
  const { L, h } = c;
  const levels = [
    [L('Foundations', 'الأساسيات'), L('Half day', 'نصف يوم'), L('Terrain modes, tyre pressure, reading sand, safe recovery.', 'أوضاع التضاريس، وضغط الإطارات، وقراءة الرمال، والاستعادة الآمنة.'), 'g700/web/p1_2.webp'],
    [L('Dunes', 'الكثبان'), L('Full day', 'يوم كامل'), L('Momentum, lines and locking differentials on real dunes.', 'الزخم، والمسارات، والأقفال التفاضلية على كثبان حقيقية.'), 'g700/web/p2_2.webp'],
    [L('Expedition', 'الاستكشاف'), L('Overnight', 'مبيت'), L('Convoy driving, navigation and desert camp, led by Captains.', 'القيادة في قافلة، والملاحة، والتخييم في الصحراء، بقيادة الكباتن.'), 'g700/web/p2_1.webp'],
  ];
  const body = `
${pageHero(c, { eb: 'GAIA Club', title: L('Off-road<br>academy', 'أكاديمية<br>الطرق الوعرة'), sub: L('Confidence is learned. Three levels with GAIA instructors, from your first session to your first expedition.', 'الثقة تُكتسب. ثلاثة مستويات مع مدرّبي GAIA، من جلستك الأولى إلى أول رحلة استكشافية.'), img: 'g700/web/p2_3.webp', ctas: [btn(h('join'), L('Join to book a session', 'انضم لحجز جلسة'))] })}
<section class="section">
  <div class="container">
    ${sectionHead({ eb: L('Three levels', 'ثلاثة مستويات'), title: L('Your path on the sand.', 'مسارك على الرمال.') })}
    <div class="option-cards">${levels.map(([t, dur, d, img], i) => `<article class="option-card reveal"><img src="${A(img)}" alt="" loading="lazy"><p class="eyebrow">0${i + 1} · ${dur}</p><h2 class="h3">${t}</h2><p>${d}</p></article>`).join('')}</div>
  </div>
</section>
${ctaBand(c, { title: L('Not driving a GAIA yet?', 'لا تقود GAIA بعد؟'), sub: L('Feel it at an off-road test-drive event first.', 'جرّبها أولاً في فعالية تجربة طرق وعرة.'), ctas: [btn(h('events'), L('See off-road events', 'فعاليات الطرق الوعرة')), btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة'), 'btn btn-ghost')] })}`;
  return { title: L('Off-road academy', 'أكاديمية الطرق الوعرة'), desc: L('The GAIA off-road academy in Kuwait: Foundations, Dunes and Expedition levels.', 'أكاديمية GAIA للطرق الوعرة في الكويت: مستويات الأساسيات والكثبان والاستكشاف.'), body };
}

export function join(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: 'GAIA Club', title: L('Join the Club', 'انضم إلى النادي'), sub: L('Owners join at Bronze with their loyalty card. Everyone else joins the waitlist and hears first about open events.', 'ينضم الملاك في المستوى البرونزي مع بطاقة الولاء. وينضم الآخرون إلى قائمة الانتظار ليكونوا أول من يعلم بالفعاليات المفتوحة.'), img: 'g700/web/p4_2.webp' })}
${formBlock(c, { eb: 'GAIA Club', title: L('Your membership', 'عضويتك'), lead: L('Tell us who you are. Owners are matched to their vehicle record.', 'أخبرنا من أنت. تتم مطابقة الملاك مع سجل مركباتهم.'), form: leadForm(c, { type: 'club', audience: 'owner', submit: L('Join the GAIA Club', 'انضم إلى نادي GAIA'), success: { t: L('Welcome to the GAIA Club.', 'أهلاً بك في نادي GAIA.'), d: L('Your welcome pack and loyalty card details are on the way.', 'حزمة الترحيب وتفاصيل بطاقة الولاء في طريقها إليك.'), next: [btn(h('events'), L('See upcoming events', 'الفعاليات القادمة'), 'btn btn-ghost')] } }) })}`;
  return { title: L('Join the GAIA Club', 'انضم إلى نادي GAIA'), desc: L('Join the GAIA Club: owners at Bronze, everyone else on the waitlist.', 'انضم إلى نادي GAIA: الملاك في البرونزي، والآخرون في قائمة الانتظار.'), body };
}

/* ============ DISCOVER ============ */
export function stories(c) {
  const { L, h } = c;
  const cards = storyCards(c);
  const body = `
${pageHero(c, { eb: L('Discover', 'اكتشف'), title: L('Stories', 'القصص'), sub: L('Adventures, routes, owners and the people who drive GAIA.', 'مغامرات، ومسارات، وملاك، والأشخاص الذين يقودون GAIA.'), img: 'g700/web/p2_2.webp' })}
<section class="section">
  <div class="container">
    <article class="story-feature reveal">
      <img src="${A('g700/web/p2_1.webp')}" alt="" loading="lazy">
      <div><p class="eyebrow">${L('Featured · Routes', 'مميز · مسارات')}</p><h2 class="h2">${L('Leave the city before sunrise.', 'غادر المدينة قبل الشروق.')}</h2><p class="lead">${L('A dawn drive south, the long way round, and what the desert teaches about patience.', 'رحلة فجر نحو الجنوب، عبر الطريق الأطول، وما تعلّمه الصحراء عن الصبر.')}</p>${btnArrow(h('events'), L('Join the next owner drive', 'انضم إلى رحلة الملاك القادمة'))}</div>
    </article>
    <div class="story-grid">${cards.join('')}</div>
  </div>
</section>
${ctaBand(c, { title: L('Write the next one.', 'اكتب القصة التالية.'), ctas: [btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة')), btn(h('join'), L('Join the Club', 'انضم إلى النادي'), 'btn btn-ghost')] })}`;
  return { title: L('Stories', 'القصص'), desc: L('JETOUR GAIA stories: desert routes, owners, technology and the Kuwait launch.', 'قصص JETOUR GAIA: مسارات صحراوية، وملاك، وتقنية، والإطلاق في الكويت.'), body };
}

export function about(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Discover', 'اكتشف'), title: L('About GAIA', 'عن GAIA'), sub: L('JETOUR’s premium G-Series, brought to Kuwait by Al Mulla Auto.', 'الفئة G الفاخرة من JETOUR، تقدّمها في الكويت الملا للسيارات.'), img: 'g700/web/p1_1.webp' })}
${split({ img: 'g700/web/p1_3.webp', eb: 'JETOUR GAIA', title: L('A class above, within JETOUR.', 'بمستوى أرقى، ضمن JETOUR.'), body: `<p>${L('GAIA is JETOUR’s premium vehicle series: flagship off-road vehicles built around prestige, technology, boldness and design. Where the T-Series is made for smart everyday travel, GAIA is made for those who go further, and expect more from the people who look after them.', 'GAIA هي فئة المركبات الفاخرة من JETOUR: مركبات رائدة للطرق الوعرة مبنية على المكانة والتقنية والجرأة والتصميم. وبينما صُممت الفئة T للتنقل اليومي الذكي، صُممت GAIA لمن يذهبون أبعد، ويتوقعون المزيد ممن يعتنون بهم.')}</p>` })}
${split({ img: 'g700/web/p4_4.webp', eb: 'Al Mulla Auto', title: L('Al Mulla’s commitment to Kuwait.', 'التزام الملا تجاه الكويت.'), body: `<p>${L('Al Mulla has served Kuwait’s drivers for generations. With GAIA, that commitment is a relationship: a named consultant, a premium handover, service in Shuwaikh and Ahmadi, and a Club that grows with you.', 'خدمت الملا سائقي الكويت لأجيال. ومع GAIA، يصبح هذا الالتزام علاقة: مستشار مخصّص، وتسليم فاخر، وخدمة في الشويخ والأحمدي، ونادٍ ينمو معك.')}</p>`, reverse: true, ctas: [btn(h('promise'), L('The Al Mulla Promise', 'وعد الملا'), 'btn btn-ghost')] })}
${ctaBand(c, { title: L('Talk to us.', 'تحدّث معنا.'), ctas: [btn(h('contact'), L('Contact & locations', 'التواصل والمواقع')), btn(h('testdrive'), L('Book a test drive', 'احجز تجربة قيادة'), 'btn btn-ghost')] })}`;
  return { title: L('About GAIA', 'عن GAIA'), desc: L('JETOUR GAIA, the premium G-Series, brought to Kuwait by Al Mulla Auto.', 'JETOUR GAIA، الفئة G الفاخرة، تقدّمها في الكويت الملا للسيارات.'), body };
}

export function contact(c) {
  const { L, h } = c;
  const body = `
${pageHero(c, { eb: L('Discover', 'اكتشف'), title: L('Contact &<br>locations', 'التواصل<br>والمواقع'), sub: L('Call, WhatsApp, or visit. A real person answers.', 'اتصل، أو راسلنا عبر واتساب، أو زرنا. يرد عليك شخص حقيقي.'), img: 'campaign/mall.webp' })}
<section class="section">
  <div class="container contact-grid">
    <div class="reveal">
      ${sectionHead({ eb: L('Concierge', 'الكونسيرج'), title: L('Reach us', 'تواصل معنا') })}
      <ul class="contact-list">
        <li><p class="eyebrow">WhatsApp</p><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" dir="ltr">${L('Chat with the concierge', 'تحدّث مع الكونسيرج')}</a></li>
        <li><p class="eyebrow">${L('Phone', 'الهاتف')}</p><a href="tel:${CONFIG.phone.replace(/\s/g, '')}" dir="ltr">${CONFIG.phone}</a></li>
        <li><p class="eyebrow">${L('Email', 'البريد الإلكتروني')}</p><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
      </ul>
      ${locations(c)}
    </div>
    <div class="reveal">${leadForm(c, { type: 'contact', title: L('Send a message', 'أرسل رسالة'), submit: L('Send message', 'أرسل الرسالة') })}</div>
  </div>
</section>
<section class="section tone-light" id="privacy">
  <div class="container narrow">
    ${sectionHead({ eb: L('Privacy', 'الخصوصية'), title: L('How we use your details', 'كيف نستخدم بياناتك') })}
    <p>${L('Details you share on this site are used by Al Mulla Auto only to respond to your request (a test drive, service, finance offer, Club membership or event) and, if you agree, to keep you informed about JETOUR GAIA. We never sell your data. You can ask us to update or delete it at any time by contacting the concierge.', 'تستخدم الملا للسيارات البيانات التي تشاركها على هذا الموقع فقط للرد على طلبك (تجربة قيادة، أو صيانة، أو عرض تمويل، أو عضوية النادي، أو فعالية)، وإذا وافقت، لإبقائك على اطلاع بأخبار JETOUR GAIA. لا نبيع بياناتك أبداً. يمكنك طلب تحديثها أو حذفها في أي وقت بالتواصل مع الكونسيرج.')}</p>
  </div>
</section>`;
  return { title: L('Contact & locations', 'التواصل والمواقع'), desc: L('Contact the JETOUR GAIA concierge in Kuwait: WhatsApp, phone, showroom and service centres.', 'تواصل مع كونسيرج JETOUR GAIA في الكويت: واتساب، والهاتف، وصالة العرض، ومراكز الخدمة.'), body };
}
