# CineSync
A Video-on-Demand web application that allows users to manage a list of movies and TV shows (Watchlist) on personalized profiles.

## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| Media Title | text | required, max 100 chars |
| Done | boolean | toggled from the list, default false |
| Format | fixed values | Movie, TV Show, Documentary |
| Genre | relation | Action, Comedy, Sci-Fi, Drama |
| User Profile | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Interstellar, done, Movie (film)
2. Stranger Things, active, TV Show (serial)
3. Planeta Pământ, active, Documentary (documentar)

## Stage 2: data logic
Plain JavaScript, no DOM. `mockup/filme.js` holds the array and the functions that read and change it. Results are printed in the browser console (F12).

## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.

## How to run
    cd frontend
    npm install
    npm run dev

Then open the address printed in the terminal (`http://localhost:5173`).

*(Note: The static mockup and Stage 2 console logic remain available in `mockup/index.html`.)*

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [ ] Stage 4: React components and props

## AI usage
Used Google Gemini for visual styling adaptation (Netflix-style dark theme), pure JavaScript array methods and immutability verification in Stage 2, and Vite/React setup and troubleshooting in Stage 3. Full details are documented in `ai-log/`.

---

## Checklists

### Stage 2 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JS file linked, logs on page load | `mockup/index.html#L72` | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | `mockup/filme.js#L2-L8` | read |
| S2-R3 | list, count, search, add, toggle, delete | `mockup/filme.js#L11-L65` | console output |
| S2-R4 | add rejects empty name and invalid tag | `mockup/filme.js#L32-L41` | last 2 console lines |
| S2-R5 | original array unchanged after add | `mockup/filme.js#L76` | console line |
| S2-R6 | README Stage 2 section + AI log | `README.md`, `ai-log/stage-02.md` | read |
| S2-R7 | commit "Stage 2" pushed | GitHub commit history | commit history |

### Stage 3 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | `npm run dev` starts without errors | `frontend/package.json` | `npm install`, `npm run dev` |
| S3-R2 | app name and counter computed from data | `frontend/src/App.jsx#L8-L17` | edit data, save |
| S3-R3 | data from README, not from the example | `frontend/src/App.jsx#L1-L5` | compare with README |
| S3-R4 | stage 1 styles reused | `frontend/src/App.css` | look at the page |
| S3-R5 | `node_modules` ignored, build passes | `frontend/.gitignore` | `npm run build` |
| S3-R6 | README Stage 3 section + AI log | `README.md`, `ai-log/stage-03.md` | read |
| S3-R7 | commit "Stage 3" pushed | GitHub commit history | commit history |