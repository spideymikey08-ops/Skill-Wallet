# TODO - Creating React Components with JSX

## Plan (approved step)

### Information Gathered
- Workspace appears empty: no files were found via directory listing and searches.

### Plan
1. Create project scaffold for `react-jsx-lab/` (package.json, src/, public/, Babel config, README).
2. Implement Step 1–2: `src/App.js` (JSX heading) and `src/index.js` (render to `public/index.html` root).
3. Implement Step 3: `package.json` scripts (build) and Babel tooling.
4. Implement Step 5–6: dynamic data + items list rendering via `map()` with keys.
5. Implement Step 7: create `src/Item.js` component and update `src/App.js` to use it.
6. Add build output workflow: ensure `npm run build` generates `dist/bundle.js`.
7. Validate: run build and quickly inspect generated `dist/bundle.js` for transpiled JSX.

### Dependent Files to be edited/created
- `react-jsx-lab/package.json`
- `react-jsx-lab/.babelrc`
- `react-jsx-lab/src/index.js`
- `react-jsx-lab/src/App.js`
- `react-jsx-lab/src/Item.js`
- `react-jsx-lab/public/index.html`
- `react-jsx-lab/README.md`
- `react-jsx-lab/dist/` (generated)

### Followup steps
- Run: `npm install`
- Run: `npm run build`
- Serve `public/index.html` (e.g., live-server) and verify UI.


