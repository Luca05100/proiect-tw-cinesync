# Stage 6: AI log

## Tools
- Gemini
- https://share.gemini.google/y19xCJj2EPnk

## Key requests
### 1. Moving Data to a Mock REST API (`json-server`)
- **Asked**: Help setting up `json-server`, migrating the static movies array into a `db.json` file, and configuring the environment variables and `api.js` file for fetching data.
- **Got**: Step-by-step instructions to install `json-server@0.17.4`, create the `db.json` under the `"filme"` key, set up `.env.example`, and write the `fetchFilme` asynchronous function handling `res.ok` validation.
- **Changed or rejected**: Adapted the endpoint names (`/filme` instead of `/tasks`) and the loading messages to perfectly fit the CineSync (WatchList) theme guidelines.

### 2. Fetching Data with `useEffect` and Managing UI States
- **Asked**: How to load the data when the `App` component mounts and how to handle the three data-fetching situations (loading, success, and error).
- **Got**: The `useEffect` implementation with an inner `async` function, utilizing an `ignore` cleanup variable to prevent redundant state updates during React's StrictMode double-mounting. Also received JSX logic for conditional rendering based on `loading` and `error` states.
- **Changed or rejected**: Customized the CSS `.error` class to use a transparent CineSync-red background (`rgba(229, 9, 20, 0.15)`), keeping the cinematic/glassmorphism aesthetic consistent with Stage 5.

## What I learned / what did not work
I learned how to transition a React app from static, hardcoded data to fetching dynamic data from a REST API. I understood the necessity of handling the three phases of an asynchronous request: displaying a loading state, handling network errors gracefully without crashing the app, and displaying the actual data upon success. Additionally, I learned how to use the `useEffect` hook properly, specifically why the cleanup function (`let ignore = false`) is crucial to avoid race conditions and duplicate network requests during development mode.