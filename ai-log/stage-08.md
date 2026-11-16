# Stage 8: AI log

## Tools
- Gemini
- https://share.gemini.google/iJxZUVoevuwG

## Key requests
### 1. Implementing React Router and Page Components
- **Asked**: Help to install `react-router-dom` and split the single-page application into multiple distinct pages (List, Detail, About, and NotFound).
- **Got**: Code for `main.jsx` wrapping the app in `BrowserRouter`, a new `App.jsx` containing the `<Routes>` map, and instructions to move the state and list logic into a new `src/pages/FilmePage.jsx`. Also received the implementation for `DesprePage.jsx` and `NotFoundPage.jsx`.
- **Changed or rejected**: Adapted the URL paths and variables to match the CineSync WatchList theme (e.g., `/filme` instead of `/tasks`).

### 2. Implementing the Shared Layout and Dynamic Detail Page
- **Asked**: How to create a common header/navigation layout across all pages and how to fetch and display a single movie's details based on the URL parameter.
- **Got**: The `Layout.jsx` component using `<Outlet>` and `<NavLink>` for active state tracking. Also received `FilmDetaliuPage.jsx` which uses `useParams()` to read the `:id`, triggers a fetch for that specific item, and handles loading and error states properly.
- **Changed or rejected**: Ensured the detail page correctly displays the CineSync-specific data (e.g., format badge, watch status) and handles 404 server errors gracefully by showing an error message instead of a blank screen.

### 3. Migrating to CSS Modules
- **Asked**: How to convert the global CSS into component-specific CSS Modules as required by Stage 8.
- **Got**: Instructions to keep only global variables and base resets in `index.css`, create `.module.css` files alongside every component and page, and import them in JSX using `styles.className`. Also received updated code for `FilmCard.jsx` to transform the title into a `<Link>` while applying the new module styles.
- **Changed or rejected**: Maintained the glassmorphism and cinematic red/dark theme (`--accent`) from the previous stages by moving the relevant structural CSS rules into their respective `.module.css` files while keeping the visual identity intact.

## What I learned / what did not work
I learned how a Single Page Application (SPA) navigates between views without reloading the page using React Router's `Link` and `NavLink`. I understood how to extract URL parameters with `useParams` and use them inside a `useEffect` dependency array to trigger data fetches. Furthermore, I learned the importance of CSS Modules for scoping styles locally to prevent class name conflicts across a growing project.