# Stage 4: AI log

## Tools
- Gemini
- https://share.gemini.google/dairBU6JsCKY

## Key requests
### 1. Validating React Components (FilmCard and FilmList)
- Asked: To verify if the newly created `FilmCard.jsx` and `FilmList.jsx` files correctly implement the requirements from the "TW_Etapa4_Ghid.pdf" guide for the WatchList theme.
- Got: Confirmation that the implementation was excellent. The AI highlighted the correct use of destructured props, dynamic class generation for genres (`badge-${film.gen}`), conditional rendering for the status ("Vizionat" vs "De văzut"), the early return pattern for the empty list scenario, and the correct placement of the `key={film.id}` attribute directly on the mapped component.
- Changed or rejected: Kept the original code as it was already perfectly aligned with the requirements. The AI just provided validation and reminded about integrating the components into `App.jsx`.

### 2. Git Version Control Strategy (Individual Commits)
- Asked: Instructions on how to commit each file individually to GitHub instead of adding everything at once.
- Got: A step-by-step list of terminal commands (`git add <file_path>` followed by `git commit -m "..."`) tailored for each modified or created file (`FilmCard.jsx`, `FilmList.jsx`, `App.jsx`, styles, and the Stage 4 documentation/checklist), concluding with a `git push`.
- Changed or rejected: N/A - applied the targeted Git commands exactly as requested to maintain a clean and descriptive commit history.

## What I learned / what did not work
I learned how to break down a static React interface into modular, reusable components (one per file). I understood the unidirectional flow of data via `props` from a parent component (`App`) to child components (`FilmList` and `FilmCard`). I also learned the crucial importance of using the `map` function with a unique `key` attribute (using the item's ID, not the array index) to prevent React rendering issues. Furthermore, I learned how to handle conditional rendering (like displaying a fallback message for an empty array) and how to maintain a clean, file-by-file version control history using Git.