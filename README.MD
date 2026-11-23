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

## Stage 9: own backend
json-server is gone. The API is an Express server in `backend/`, with REST routes (`/filme`), server side validation and CORS. Data is still kept in memory and resets on restart.

## How to run
    cd backend && npm install && npm run dev    # terminal 1, port 3001
    cd frontend && npm install && npm run dev   # terminal 2, port 5173

Then open `http://localhost:5173`. Quick check: `http://localhost:3001/health`.

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
- [x] Stage 9: own backend with Express
- [ ] Stage 10: MariaDB and full CRUD

## AI usage
Used Google Gemini for visual styling adaptation (Netflix-style dark theme), pure JavaScript array methods and immutability verification in Stage 2, Vite/React setup in Stage 3, and component validation for Stage 4. Full details are documented in `ai-log/`.

---

## Checklists

### Stage 2 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JS file linked, logs on page load | [`index.html L69`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/mockup/index.html#L69) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [`filme.js L3-L7`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/mockup/filme.js#L3-L7) | read |
| S2-R3 | list, count, search, add, toggle, delete | [`filme.js L9-L57`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/mockup/filme.js#L9-L57) | console output |
| S2-R4 | add rejects empty name and invalid tag | [`filme.js L29-L37`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/mockup/filme.js#L29-L37) | last 2 console lines |
| S2-R5 | original array unchanged after add | [`filme.js L65-L67`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/mockup/filme.js#L65-L67) | console line |
| S2-R6 | README Stage 2 section + AI log | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L18), [`stage-02.md`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/ai-log/stage-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [Stage 2 commit](https://github.com/Luca05100/proiect-tw-cinesync/commit/67aa0feeba020806054e1654f56ad150a35d0892) | commit history |

### Stage 3 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | `npm run dev` starts without errors | [`package.json L6-L12`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/package.json#L6-L12) | `npm install`, `npm run dev` |
| S3-R2 | app name and counter computed from data | [`FilmePage.jsx L141-L143`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L141-L143) | edit data, save |
| S3-R3 | data from README, not from the example | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L13) | compare with README |
| S3-R4 | stage 1 styles reused | [`index.css`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/index.css) | look at the page |
| S3-R5 | `node_modules` ignored, build passes | [`.gitignore L10-L12`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/.gitignore#L10-L12) | `npm run build` |
| S3-R6 | README Stage 3 section + AI log | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L21), [`stage-03.md`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/ai-log/stage-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [Stage 3 commit](https://github.com/Luca05100/proiect-tw-cinesync/commit/495661f0b945d5d556edf59ae0d60d3f24ad21be) | commit history |

### Stage 4 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in `src/components/` | [`frontend/src/components/`](https://github.com/Luca05100/proiect-tw-cinesync/tree/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [`FilmCard.jsx L6-L12`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L6-L12) | read |
| S4-R3 | map + key={id}, no console warnings | [`FilmList.jsx L9-L19`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmList.jsx#L9-L19) | F12, Console |
| S4-R4 | message for empty list | [`FilmList.jsx L5-L7`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmList.jsx#L5-L7) | set array to `[]` |
| S4-R5 | state changes the card look | [`FilmCard.jsx L9`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L9) | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L24), [`stage-04.md`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/ai-log/stage-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [Stage 4 commit](https://github.com/Luca05100/proiect-tw-cinesync/commit/07b816ff539c7c370b36a63bde2e583f824e8cdb) | commit history |

### Stage 5 Checklist
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | local state (`useState`) for list and theme | [`FilmePage.jsx L24-L29`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L24-L29) | read code |
| S5-R2 | add form placed above the list | [`FilmePage.jsx L238`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L238) | test adding item |
| S5-R3 | controlled checkbox toggles status | [`FilmCard.jsx L16-L20`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L16-L20) | click checkbox |
| S5-R4 | delete button removes item | [`FilmCard.jsx L50-L57`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L50-L57) | click delete button |
| S5-R5 | theme toggle switches light/dark mode | [`Layout.jsx L30-L43`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/Layout.jsx#L30-L43), [`Layout.jsx L107-L120`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/Layout.jsx#L107-L120) | click theme button |
| S5-R6 | README Stage 5 section + AI log | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L29), [`stage-05.md`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/ai-log/stage-05.md) | read |
| S5-R7 | commit "Stage 5: checklist" pushed | [Stage 5 commit](https://github.com/Luca05100/proiect-tw-cinesync/commit/fd60ebacd5b3ad39324e61e91afad35ac72b7a68) | commit history |

### Stage 6 Checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S6-R1 | `npm run api` starts, route shows JSON | [`package.json L11`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/package.json#L11), [`db.json`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/db.json) | open `localhost:3001/filme` |
| S6-R2 | data no longer in React code | [`FilmePage.jsx L24`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L24) | read |
| S6-R3 | loading message while waiting | [`FilmePage.jsx L121-L127`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L121-L127) | `--delay 4000` |
| S6-R4 | error message when API is down | [`FilmePage.jsx L42-L47`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L42-L47), [`FilmePage.jsx L130-L137`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L130-L137) | stop `npm run api`, refresh |
| S6-R5 | fetch only in api.js, URL from env | [`api.js L1-L18`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/api.js#L1-L18), [`.env.example L1`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/.env.example#L1) | search for `fetch` |
| S6-R6 | README Stage 6 section + AI log | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L32), [`stage-06.md`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/ai-log/stage-06.md) | read |
| S6-R7 | commit "Stage 6" pushed | [Stage 6 commit](https://github.com/Luca05100/proiect-tw-cinesync/commit/0250d27b7cd9ecf50b712fdd8817457298a5e617) | commit history |

### Stage 7 Checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S7-R1 | controlled form: value + onChange on every field | [`FilmForm.jsx L89-L149`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmForm.jsx#L89-L149) | read |
| S7-R2 | empty title shows an error, nothing is sent | [`FilmForm.jsx L18-L42`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmForm.jsx#L18-L42), [`FilmForm.jsx L49-L53`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmForm.jsx#L49-L53) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [`FilmePage.jsx L63-L66`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L63-L66), [`api.js L30-L32`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/api.js#L30-L32) | add, refresh |
| S7-R4 | toggle and delete survive refresh | [`FilmePage.jsx L68-L90`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmePage.jsx#L68-L90) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [`FilmForm.jsx L56-L79`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmForm.jsx#L56-L79), [`FilmForm.jsx L151-L158`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmForm.jsx#L151-L158) | `--delay 3000`; stop API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | [`tw.json`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/tw.json), [`FilmCard.jsx L12`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L12), [`FilmCard.jsx L20`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L20), [`FilmCard.jsx L55`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L55) | `querySelectorAll` in the console |
| S7-R7 | README Stage 7 section + AI log | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L35), [`stage-07.md`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/ai-log/stage-07.md) | read |
| S7-R8 | commit "Stage 7" pushed | [Stage 7 commit](https://github.com/Luca05100/proiect-tw-cinesync/commit/cfb360c50bc6a6b7317819cadbe02589f305da58) | commit history |

### Stage 8 Checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S8-R1 | header navigation changes page without reload | [`App.jsx L12-L20`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/App.jsx#L12-L20), [`Layout.jsx L72-L82`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/Layout.jsx#L72-L82) | click header links |
| S8-R2 | click on an item opens its detail page | [`FilmCard.jsx L30-L36`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L30-L36) | click a film card |
| S8-R3 | refresh on the detail URL works; missing id shows an error | [`FilmDetaliuPage.jsx L8-L35`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmDetaliuPage.jsx#L8-L35), [`FilmDetaliuPage.jsx L45-L56`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmDetaliuPage.jsx#L45-L56) | refresh `/films/1`; open `/films/9999` |
| S8-R4 | unknown URL shows the app 404 page | [`App.jsx L18`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/App.jsx#L18), [`NotFoundPage.jsx`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/NotFoundPage.jsx) | open `/abc` |
| S8-R5 | each component has its .module.css; index.css only shared styles | [`frontend/src/components/*.module.css`](https://github.com/Luca05100/proiect-tw-cinesync/tree/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components), [`index.css`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/index.css) | read code |
| S8-R6 | data-testid attributes from tables 7.3 and 8.2; detail route `/<resource>/:id` | [`FilmCard.jsx L12`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/components/FilmCard.jsx#L12), [`FilmDetaliuPage.jsx L61`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/pages/FilmDetaliuPage.jsx#L61), [`App.jsx L15`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/frontend/src/App.jsx#L15) | search `data-testid` in code |
| S8-R7 | README Stage 8 section + AI log | [`README.MD`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/README.MD#L38), [`stage-08.md`](https://github.com/Luca05100/proiect-tw-cinesync/blob/2cafc591d0f25dcd0f379290110a0a0c7f7cfc2a/ai-log/stage-08.md) | read |
| S8-R8 | commit "Stage 8" pushed | [Stage 8 commit](https://github.com/Luca05100/proiect-tw-cinesync/commit/9fd0984eb60d0d885d28f3cff79b8b8bc4a9b526) | commit history |