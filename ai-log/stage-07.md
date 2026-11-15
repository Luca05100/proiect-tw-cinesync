# Stage 7: AI log

## Tools
- Gemini

## Key requests
### 1. Controlled Form and Validation Implementation
- **Asked**: Help to implement the `FilmForm.jsx` component for adding new media items directly from the UI, replacing the hardcoded data modifications, along with local validation for the title (required and max 100 chars).
- **Got**: A controlled React component using `useState` for the form fields (`titlu`, `tip`). The component implements local validation displaying errors inline (without `alert()`), and handles the disabled state for the submit button while waiting for the server response.
- **Changed or rejected**: Retained the custom "CineSync" styling for the form elements and button, ensuring the `disabled` state smoothly reduces opacity and displays "Se salvează...".

### 2. Moving CRUD Operations to the Mock API (`json-server`)
- **Asked**: Assistance to structure the HTTP requests in `api.js` and modify `App.jsx` to only update the local state *after* the server successfully confirms the action (POST, PATCH, DELETE).
- **Got**: A centralized `request` function in `api.js` that handles JSON headers and checks for `!res.ok`. In `App.jsx`, `handleAdd`, `handleToggle`, and `handleDelete` were refactored into `async/await` functions that first call the API tools (`createFilm`, `updateFilm`, `deleteFilm`) and only then update the React state using the returned server data.
- **Changed or rejected**: Kept the specific payload for the PATCH request strictly to the changed field (`{ vazut: !film.vazut }`) instead of sending the whole object, as requested in the laboratory guidelines.

### 3. Automated Testing Preparation
- **Asked**: How to prepare the application for the automated checker bot by adding specific test identifiers.
- **Got**: Instructions to create a `tw.json` file in the repository root mapping the specific resources (`"filme"`, `"titlu"`, `"vazut"`), and where to place the `data-testid` attributes on the components (`form-title`, `item`, `item-toggle`, `item-delete`).
- **Changed or rejected**: Verified that the `tw.json` file was placed next to the `README.md`, not inside the `frontend/` folder, to ensure the automated grader finds it correctly.

## What I learned / what did not work
Initially, I was updating the UI state immediately and then sending the request to the server. I learned that in a reliable application, the UI should only reflect what has been confirmed by the server (waiting for the `await fetch(...)` to resolve before calling `setFilme`). I also learned how to implement a controlled form in React where the input's `value` is strictly bound to the state, and how to effectively prepare a project for automated end-to-end testing using data attributes (`data-testid`).