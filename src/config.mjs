// Site-wide configuration. Placeholders marked TODO must be confirmed with Al Mulla.
export const CONFIG = {
  siteUrl: 'https://gaia.almulla-auto.com', // TODO: final domain (open question in the brief)
  whatsapp: '96500000000', // TODO: concierge WhatsApp number
  phone: '+965 0000 0000', // TODO: concierge phone
  email: 'concierge@gaia-kuwait.com', // TODO
  g700From: '13,500',
  f700From: '11,999',
};

// Route keys -> paths. Every page is generated for /en/ and /ar/.
export const ROUTES = {
  home: '',
  launch: 'launch',
  g700: 'models/g700',
  f700: 'models/f700',
  build: 'models/build',
  testdrive: 'experience/test-drive',
  showroom: 'experience/showroom',
  events: 'experience/events',
  promise: 'ownership/al-mulla-promise',
  financing: 'ownership/financing',
  moveup: 'ownership/moving-up',
  owners: 'owners',
  register: 'owners/register',
  service: 'owners/service',
  club: 'club',
  academy: 'club/academy',
  join: 'club/join',
  stories: 'discover/stories',
  about: 'discover/about',
  contact: 'discover/contact',
};

export const href = (lang, key, hash = '') => {
  const p = ROUTES[key];
  if (p === undefined) throw new Error('Unknown route ' + key);
  return `/${lang}/${p ? p + '/' : ''}${hash}`;
};
