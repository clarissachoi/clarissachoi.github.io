# Implementation Plan (for Claude Code, phase by phase)

## Phase 1 — Scaffold

Create file structure (index.html, style.css, script.js, assets/)
Set up CSS variables (colors, spacing scale, breakpoints), font imports, base reset
Build the connected-grid CSS system (shared borders, no gaps) as reusable utility classes

## Phase 2 — Skeleton & Nav

Static sticky nav with section anchor links
Semantic section containers matching Homepage.md layout order (Hero → Experience → Projects → Skills → About → Footer)

## Phase 3 — Hero

Name, tagline, positioning line, link buttons (LinkedIn/GitHub/Resume/mailto)

## Phase 4 — Experience

Vertical timeline (desktop: two-column; mobile: stacked)
Click-to-select entry → detail panel updates (JS state, no routing)
Populate Deloitte + placeholder entries

##  Phase 5 — Projects (TradingJoe + Atlas)

Two-column module, TradingJoe larger/featured
Modal component (open/close, focus trap, ESC to close)
Wire "VIEW PROJECT" buttons to modal content

## Phase 6 — Skills

Three-column text-only grid, no bars/logos

## Phase 7 — About (contact sheet)

Asymmetric photo grid with shared borders
Hover scale + caption reveal (desktop), tap/focus reveal (mobile)
Short intro text column

## Phase 8 — Footer

Repeat key links, simple layout

## Phase 9 — Responsive pass

Test/adjust all breakpoints, verify no horizontal scroll, tap targets

## Phase 10 — Accessibility pass

Keyboard nav through modal/timeline, focus states, alt text, aria labels, reduced-motion media query

## Phase 11 — Polish & Deploy

Cross-browser check, GitHub Pages deploy config, final link/asset verification against Definition of Done checklist


## How to use the MDs with Claude Code
Once, at project start: give Claude Code both files (or keep them in the repo root, e.g. /docs/design-spec.md, /docs/homepage-wireframe.md) and say "treat these as the permanent design spec — refer back to them for every phase."

Best practice: don't paste the full MDs into every prompt. Instead, reference them by filename ("per design-spec.md section 6, use monospace for labels") — Claude Code can read the files directly from the repo if they're present.

Re-supply full content only when: starting a new chat session/context that hasn't seen the repo, or if you're using a tool without file access (pure chat, no code execution).

Per-phase prompts: just reference the relevant section number (e.g. "Implement §12.3 Experience per Homepage.md") rather than re-pasting.

Once V1 ships, update the MDs themselves to log deviations, so they stay the source of truth.