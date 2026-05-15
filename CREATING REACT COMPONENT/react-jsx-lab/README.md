# React JSX Lab

This lab demonstrates creating functional React components using JSX.

## What was implemented
- `src/App.js` renders JSX output, dynamic data (name), and a list rendered with `map()`.
- `src/Item.js` is a reusable component for rendering list items.
- `src/index.js` renders `<App />` into the `#root` element.
- Babel configuration via `.babelrc`.

## Build
```bash
npm install
npm run build
```

## Run
Open `public/index.html` using a simple server (recommended), e.g.:
- `npx live-server public`

## Notes
If you see `Unexpected token <`, ensure Babel is configured and you ran `npm run build`.

