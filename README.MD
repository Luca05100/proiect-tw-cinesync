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
1. Interstellar, done, Movie
2. Stranger Things, active, TV Show
3. Planet Earth, active, Documentary

## How to run
Open `index.html` in a browser. No build step, no server.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript

