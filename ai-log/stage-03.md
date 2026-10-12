# Stage 3: AI log

## Tools
- Gemini


## Key requests
### 1. Initializing Vite + React and Adapting the Netflix-style Theme
- Asked: Help migrate the static mockup and Stage 2 data into a new Vite + React project inside `frontend/`, fix the macOS native binding error (`@rolldown/binding-darwin-arm64`), and adapt the Netflix-style CSS and JSX structure for the `App` component.
- Got: Terminal commands for clean dependency reinstallation; cleaned-up `main.jsx` and `App.jsx` with the `filme` array, dynamic counter calculation (`deVazut`), and raw JSON output inside `<pre>`; updated `App.css` with a universal selector fix and readable dark-mode styling for the `<pre>` block.
- Changed or rejected: Removed all default Vite boilerplate (`assets/`, `index.css`, and unused SVG imports) and kept a single-column layout in `.container` as required for Stage 3 before components and forms are introduced.

## What I learned / what did not work
Initially, `npm run dev` failed due to an npm optional dependency bug on Apple Silicon, and deleting the default Vite template files caused import errors in `main.jsx` and `App.jsx`. I learned how to perform a clean reinstall of `node_modules`, how to properly link styles and mount components in React, and how JSX syntax (`className`, `{...}` expressions, and fragments `<>...</>`) dynamically renders calculated data.