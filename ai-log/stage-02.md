# Stage 2: AI log

## Tools
- Gemini
- https://share.gemini.google/qOoBkUtcT4Fh


## Key requests
### 1. Immutable Data Logic and Console Testing in JavaScript
- Asked: Create `filme.js` with the watchlist array and implement all required pure data functions (list titles, count unwatched items, case-insensitive search, validated add, toggle watched status, and delete) with grouped console tests.
- Got: Complete `filme.js` implementation using `map`, `filter`, `reduce`, and the spread operator (`...`), along with structured `console.log` test sections for reading, adding, modifying/deleting, and input validation.
- Changed or rejected: Explored a TypeScript (`filme.ts`) version with strict interfaces, but kept standard JavaScript (`filme.js`) linked via `<script>` in `index.html` so it runs directly in the browser console without a build step, matching Stage 2 requirements.

## What I learned / what did not work
I learned why immutability (using `[...lista, nou]` and `{ ...f, vazut: !f.vazut }` instead of mutating arrays in place with `push`) is essential for React state detection, and why generating new IDs with `reduce` (`Math.max` + 1) prevents duplicate IDs after deletions compared to using `lista.length + 1`.