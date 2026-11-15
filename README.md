# Marcador de Truco
Its a score counter for a brazillian card game :)

This is a Progressive Web App (PWA) built with React and TypeScript, which means it can be used on both desktop and smartphones and can be added to the home screen as an app, almost indistinguishable from a real native app.

The app is hosted on Firebase, and you can see it working here:
https://marcadordetruco-f1271.web.app/

## Mobile Version
<div align="center">
<img src="https://github.com/andlukass/MarcadorDeTruco/assets/46944875/0c1bf5dd-c0fa-48b0-bf26-5fdddbdbfec0" width="500px">
</div>

## Desktop Version
<div align="center">
<img src="https://github.com/andlukass/MarcadorDeTruco/assets/46944875/a270de65-9077-498d-9726-072adf4a95dd" width="500px">
</div>

## Development

```sh
npm ci
npm run dev
```

Application sources live in `src` as `.ts` and `.tsx` files. TypeScript runs in
strict mode, and the production build checks types before bundling. Vite handles
transpilation during development; run the type check separately to check types.

```sh
npm run typecheck
npm run lint
npm run build
```

The build also generates the PWA service worker and prerenders the five routes
using the existing react-snap setup. Production output is written to `dist`.

If react-snap cannot launch its bundled Chromium, set `PUPPETEER_EXECUTABLE_PATH`
to an installed Chrome or Chromium executable before building. For example, on
macOS with Google Chrome:

```sh
PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run build
```
