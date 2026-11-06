# JETOUR GAIA Kuwait website

A static site in English and Arabic (RTL), built to the sitemap and journeys in *JETOUR GAIA_Website_Structure_and_Journey_20261024 V1.0*. It uses the content and assets from jetour-gaia-landing.vercel.app.

## Run it
- `npm run build` writes 40 pages (20 routes in EN and AR) into `site/`.
- `npm run dev` builds the site and serves it at http://localhost:4321.
- To deploy, push the repo to Vercel. `vercel.json` already sets the build command and the `site/` output folder.

## Where things live
- `src/config.mjs`: routes, prices, WhatsApp, phone and domain (**placeholders, marked TODO**).
- `src/components.mjs`: header, footer, sections, and the 10 lead forms from the brief.
- `src/pages-a.mjs`: Home, Launch landing, G700, F700, Build your GAIA, Test drive, Showroom, Events.
- `src/pages-b.mjs`: Al Mulla Promise, Financing, Moving up, Owners hub, Register, Service, Club, Academy, Join, Stories, About, Contact.
- `site/assets/`: CSS, JS, images, the film and the G700/F700 `.glb` models.

## Still to confirm with Al Mulla (open questions from the brief)
- CRM endpoint. Forms currently save tagged leads (type, audience, source, UTM, build) to `localStorage` and push a `lead_submit` event to `dataLayer`. Look for the `TODO: POST lead` line in `main.js`.
- The WhatsApp and phone numbers, email, final domain, showroom addresses and opening hours.
- G700 specifications, prices (marked indicative), Club tier names and benefits, and the event dates.
- F700 details. The page is built but limited to registering interest.
