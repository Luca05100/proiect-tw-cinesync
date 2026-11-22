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

## Stage 4: components
The list is rendered from the data, through two components:
- `FilmList` receives the whole array and renders one card per item.
- `FilmCard` receives a single item through props and displays it.

## Stage 5: local state and events
The application now manages data interactively using `useState` in `App.jsx`. Users can add new media, toggle the watched status via a controlled checkbox, delete items, and switch between Light and Dark themes directly from the UI.

## Stage 6: data from a mock API
The movies are loaded from a `json-server` mock API (`frontend/db.json`, started with `npm run api`) with loading and error states.

## Stage 7: form and validation
Movies can be added from the page. The form (`FilmForm`) is controlled and validated (required title of max 100 characters, year between 1900 and the current year), and every change (add, toggle, delete) goes to the API before it shows up in the list. `tw.json` and the `data-testid` attributes are used by the automatic check.

## Stage 8: routing and detail page
Three pages behind React Router: the list (`/`), a detail page at `/filme/:id` that fetches exactly one item from the API, and an about page (`/despre`), plus a 404 page for unknown addresses. A shared `Layout` (header with `NavLink`, `Outlet`, footer) wraps every page. Component styles moved to CSS Modules (`*.module.css` next to each component); `index.css` keeps only the colour variables and the shared classes.

## How to run
    cd frontend
    npm install
    npm run api   # terminal 1: mock API on http://localhost:3001
    npm run dev   # terminal 2: the app

Then open the address printed in the terminal (`http://localhost:5173`).

*(Note: The static mockup and Stage 2 console logic remain available in `mockup/index.html`.)*

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express

## AI usage
Used Google Gemini for visual styling adaptation (Netflix-style dark theme), pure JavaScript array methods and immutability verification in Stage 2, Vite/React setup in Stage 3, and component validation for Stage 4. Full details are documented in `ai-log/`.

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

### Stage 4 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in `src/components/` | `frontend/src/components/` | open folder |
| S4-R2 | card receives data through props | `frontend/src/components/FilmCard.jsx` | read |
| S4-R3 | map + key={id}, no console warnings | `frontend/src/components/FilmList.jsx` | F12, Console |
| S4-R4 | message for empty list | `frontend/src/components/FilmList.jsx` | set array to `[]` |
| S4-R5 | state changes the card look | `frontend/src/components/FilmCard.jsx` | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | `README.md`, `ai-log/etapa-04.md` | read |
| S4-R7 | commit "Stage 4" pushed | GitHub commit history | commit history |

### Stage 5 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | local state (`useState`) for list and theme | `frontend/src/App.jsx` | read code |
| S5-R2 | add form placed above the list | `frontend/src/App.jsx` | test adding item |
| S5-R3 | controlled checkbox toggles status | `frontend/src/components/FilmCard.jsx` | click checkbox |
| S5-R4 | delete button removes item | `frontend/src/components/FilmCard.jsx` | click delete button |
| S5-R5 | theme toggle switches light/dark mode | `frontend/src/App.jsx` | click theme button |
| S5-R6 | README Stage 5 section + AI log | `README.md`, `ai-log/etapa-05.md` | read |
| S5-R7 | commit "Stage 5: checklist" pushed | GitHub commit history | commit history |

### Stage 6 Checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S6-R1 | `npm run api` starts, route shows JSON | `frontend/package.json#L..`, `frontend/db.json` | open `localhost:3001/filme` |
| S6-R2 | data no longer in React code | `frontend/src/App.jsx#L..` (`useState([])`) | read |
| S6-R3 | loading message while waiting | `frontend/src/App.jsx#L..` | `--delay 4000` |
| S6-R4 | error message when API is down | `frontend/src/App.jsx#L..-L..` | stop `npm run api`, refresh |
| S6-R5 | fetch only in api.js, URL from env | `frontend/src/api.js#L..-L..`, `frontend/.env.example` | search for `fetch` |
| S6-R6 | README Stage 6 section + AI log | `README.md`, `ai-log/etapa-06.md` | read |
| S6-R7 | commit "Stage 6" pushed | link to the commit | commit history |

### Stage 7 Checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S7-R1 | controlled form: value + onChange on every field | `frontend/src/components/FilmForm.jsx#L..-L..` | read |
| S7-R2 | empty title shows an error, nothing is sent | `frontend/src/components/FilmForm.jsx#L..` (`valideaza`) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | `frontend/src/App.jsx#L..` (`handleAdd`), `frontend/src/api.js#L..` | add, refresh |
| S7-R4 | toggle and delete survive refresh | `frontend/src/App.jsx#L..-L..` | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | `frontend/src/components/FilmForm.jsx#L..-L..` | `--delay 3000`; stop API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | `tw.json`, `frontend/src/components/FilmCard.jsx#L..-L..` | `querySelectorAll` in the console |
| S7-R7 | README Stage 7 section + AI log | `README.md`, `ai-log/etapa-07.md` | read |
| S7-R8 | commit "Stage 7" pushed | link to the commit | commit history |

### Stage 8 Checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S8-R1 | header navigation changes page without reload | `frontend/src/App.jsx`, `frontend/src/components/Header.jsx` | click header links |
| S8-R2 | click on an item opens its detail page | `frontend/src/components/FilmCard.jsx#L26` | click a film card |
| S8-R3 | refresh on the detail URL works; missing id shows an error | `frontend/src/pages/FilmDetail.jsx` | refresh `/films/1`; open `/films/9999` |
| S8-R4 | unknown URL shows the app 404 page | `frontend/src/App.jsx#L16` (`path="*"`), `frontend/src/pages/NotFound.jsx` | open `/abc` |
| S8-R5 | each component has its .module.css; index.css only shared styles | `frontend/src/components/*.module.css`, `frontend/src/index.css` | read code |
| S8-R6 | data-testid attributes from tables 7.3 and 8.2; detail route `/<resource>/:id` | `frontend/src/components/FilmCard.jsx`, `frontend/src/pages/FilmDetail.jsx`, `frontend/src/App.jsx` | search `data-testid` in code |
| S8-R7 | README Stage 8 section + AI log | `README.md`, `ai-log/etapa-08.md` | read |
| S8-R8 | commit "Stage 8" pushed | link to the commit | commit history |