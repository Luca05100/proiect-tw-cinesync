# Stage 1: AI log

## Tools
- Gemini


## Key requests
### 1. Distinct Theme and Streaming Platform Visual Design
- Asked: Make the app look completely different from the purple reference in the guide, with a modern, cinematic Video-on-Demand (Netflix-style) identity, while preserving all required semantic tags, Grid/Flexbox layouts, and CSS variables.
- Got: Restructured HTML headers and panels; cinematic dark layout with strong red accents (`#e50914`); card layouts with media format badges and strikethrough states for watched items.
- Changed or rejected: Kept the exact `.container`, `.panel`, `.item-form`, `.item-card`, and `.done` structural selectors so automated and manual rubric grading remains 100% compliant.

## What I learned / what did not work
I learned how to dramatically change the personality of an interface to match a streaming platform purely through dark-mode-first CSS variables, contrast, and custom accent colors, without breaking the underlying responsive Grid and Flexbox mechanics.