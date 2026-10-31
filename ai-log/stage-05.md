# Stage 5: AI log

## Tools
- Gemini
- https://share.gemini.google/1pvHL4DIWjHJ

## Key requests
### 1. Adding Local State (`useState`) and Event Handling in `App.jsx`
- Asked: Help implement local state management for the movies list and theme switcher, along with immutable helper functions for toggling watch status (`onToggle`) and deleting items (`onDelete`), plus the form submission logic for adding new media items.
- Got: Updated `App.jsx` with `useState` hooks, immutable array methods (`map`, `filter`, `reduce`), initial mock data (`FILME_INITIALE`), and event handlers that update the dynamic counter (`deVazut`) and handle dark/light mode switching.
- Changed or rejected: Kept the state management logic cleanly separated in the parent component while passing down callbacks via props to child components.

### 2. Interactive Card Components and Glassmorphism Styling
- Asked: Update `FilmCard.jsx`, `FilmList.jsx`, and `App.css` to add an interactive controlled checkbox, a accessible delete button, and a modern cinematic glassmorphism visual theme with smooth hover effects.
- Got: Refactored `FilmCard.jsx` to group the checkbox and title inside a clickable label, integrated the delete button with appropriate aria-labels, and expanded `App.css` with backdrop-filter blur effects, custom scrollbars, and neon glow accents.
- Changed or rejected: Refined card layout and spacing to ensure the footer stays pinned at the bottom of the viewport using flexbox (`min-height: 100vh` and `margin-top: auto`).

## What I learned / what did not work
I learned how to lift state up and manage interactive component lifecycles in React using `useState`. I understood how immutable operations (`map` for toggling and `filter` for deleting) allow React to efficiently detect state changes and re-render the UI. Furthermore, I learned how to style components with advanced CSS features like `backdrop-filter: blur` (glassmorphism) and how to handle form validation and dynamic ID generation using `reduce` without mutating the original state.