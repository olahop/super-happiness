# Thrift Window — customer showroom (POC)

A clickable, mobile-shaped prototype of the customer-facing side of Thrift
Window: a "showroom" for the second-hand shops in the network. No backend,
no accounts — just static HTML/CSS/JS with mock data (`data.js`) and
`localStorage` for favorites and saved searches, so it's realistic to click
through without any build step.

Open `index.html` directly in a browser (Chrome DevTools' device toolbar,
or an actual phone on the same network, gives the truest feel — the layout
is capped at 460px and designed mobile-first).

## What's here

- **Kart** — map of the shops in the network (Leaflet + OpenStreetMap tiles,
  loaded from a CDN, so this needs an internet connection). Tap a pin for a
  quick preview, or open the full shop page.
- **Utforsk** — search & filter across every shop's inventory (category,
  gender, condition, color, price, sort), grid of garment cards.
- **Favoritter** — items the user has heart-marked, persisted locally.
- **Varsler** — saved searches with a notification toggle. In a real build
  this would page/email/push when a new matching item is listed; here it's
  simulated with a static "new matches" count.
- Item detail always links back to the shop it's physically in, since the
  whole point is "come try it on in store" — there's no buy button anywhere.

## Photos

Garments render as a color-tinted placeholder with a category emoji by
default. To use real photos instead, drop a file at:

```
images/g1.jpg
images/g2.jpg
...
```

matching a garment's `id` in `data.js` (`g1`…`g30`). Missing files fail
silently and fall back to the placeholder — no code changes needed.

## Simplifications vs. the real product

- No login — the app assumes a single logged-in user throughout.
- One flat category list rather than the full taxonomy in the real
  `thrift-window` API.
- "New matches" counts on saved searches are illustrative, not live.
- Distances/"open now" are not computed from real time/location.
