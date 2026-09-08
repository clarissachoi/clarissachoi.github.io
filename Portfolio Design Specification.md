# Personal Portfolio — Design Specification

## 1. Project Goal

Build a fast, simple, professional personal portfolio website for job applications.

The site should:

- Clearly communicate professional experience and technical ability.
- Showcase TradingJoe as the primary project.
- Show some personality and an unconventional background without distracting from recruiting goals.
- Be easy for recruiters to scan.
- Provide immediate access to LinkedIn, GitHub, resume, and contact information.
- Be deployable on GitHub Pages.
- Work well on desktop and mobile.

The portfolio should prioritize **clarity, usability, and visual consistency over complexity**.

---

# 2. Technical Constraints

Use:

- HTML
- CSS
- Vanilla JavaScript

Do not use:

- React
- Vite
- a backend
- a database
- unnecessary frameworks or dependencies

The site should remain easy to maintain and deploy through GitHub Pages.

Prefer a simple structure such as:

```text
/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── resume.pdf
│   └── images/
└── PORTFOLIO_DESIGN.md
```

---

# 3. Visual System

## Core visual concept

The primary visual system should be a **connected modular grid**.

The layout should take inspiration from:

- online marketplaces
- product catalogs
- structured databases
- modular interfaces

Do **not** use a collection of separate floating cards with gaps between them.

Instead, modules should connect through shared borders and grid lines.

Example concept:

```text
┌──────────────────┬──────────────────┬──────────────────┐
│                  │                  │                  │
│     MODULE       │      MODULE      │      MODULE      │
│                  │                  │                  │
├──────────────────┼──────────────────┼──────────────────┤
│                  │                  │                  │
│     MODULE       │      MODULE      │      MODULE      │
│                  │                  │                  │
├──────────────────┴──────────────────┴──────────────────┤
│                                                        │
│                        MODULE                          │
│                                                        │
└────────────────────────────────────────────────────────┘
```

The grid should feel like a deliberate system where components are "attached" to each other.

Shared borders should be used instead of shadows or separated cards.

---

# 4. Design Principles

## Use

- Strong grid structure
- Thin borders
- Sharp corners
- Generous whitespace
- Clear typography hierarchy
- Modular layouts
- Subtle asymmetry in selected areas
- Real project media
- Small interactive states
- Restrained use of color

## Avoid

- Gradients
- Glassmorphism
- Excessive rounded corners
- Floating cards with large gaps
- Drop shadows as a primary visual treatment
- Generic startup landing page aesthetics
- Giant walls of technology logos
- Skill progress bars
- Excessive animations
- Decorative elements that do not communicate information
- Overly corporate visual language
- Overly artistic or chaotic layouts

---

# 5. Color System

Use the following as the starting palette:

```css
--background: #FAF9F6;
--text-primary: #181818;
--text-muted: #6B6965;
--border: #D8D5CF;
--accent: #7A2638;
```

The accent color should be used sparingly.

Good uses:

- hover states
- active states
- small labels
- selected timeline points
- subtle emphasis
- links or small interface details

Do not use the accent color for large page backgrounds or large decorative blocks unless specifically justified.

Do not introduce gradients.

---

# 6. Typography

## Primary typeface

Use a clean, modern sans-serif as the dominant typeface.

Use it for:

- name
- major headings
- body copy
- descriptions
- primary navigation

The sans-serif should be highly readable and professional.

## Monospace typeface

Use a monospace/typewriter-style font as a secondary visual language.

Use monospace for:

- section labels
- metadata
- dates
- project numbers
- timeline information
- status indicators
- technology metadata
- small interface labels

Examples:

```text
// EXPERIENCE_01

// PROJECT_01

// STATUS: CURRENTLY_BUILDING

// LOCATION: NEW_YORK
```

Do not use monospace for long body paragraphs.

The monospace font should add personality without making the site resemble a terminal.

---

# 7. Shape Language

Use:

```css
border-radius: 0;
```

or extremely small radius values where necessary.

Buttons should primarily have:

- square corners
- visible borders
- clear hover states

Avoid pill-shaped buttons.

Avoid heavily rounded cards.

---

# 8. Layout Strategy

The overall site should use a strong underlying grid.

Some sections can strictly follow the grid.

Other sections may selectively break the grid through:

- larger media
- overlapping images
- offset content
- expanded modules
- asymmetrical spans

Asymmetry should feel intentional.

Do not make every section asymmetrical.

The grid should remain the dominant organizational system.

---

# 9. Interaction System

Use subtle interactions only.

Include:

- hover states
- border/color changes
- subtle transitions
- expand/collapse interactions
- smooth scrolling

Do not use:

- large entrance animations
- excessive scroll-triggered animations
- distracting movement
- decorative animations without a functional purpose

Transitions should feel responsive and quick.

---

# 10. Expandable Content

Projects and selected experiences should provide more information without navigating to a separate page or route.

Clicking an item may:

- expand the module in place
- open an overlay
- open a modal
- reveal additional information within the existing layout

Do not create separate routes for project details.

The initial state should remain concise and easy to scan.

Expanded states can reveal:

- fuller descriptions
- responsibilities
- achievements
- project features
- technology details
- images
- video
- external links

The interaction should be obvious.

Include a clear close action.

---

# 11. Navigation

Use a minimal navigation system.

Primary navigation should link to major sections such as:

```text
Experience
Projects
About
Skills
Resume
```

The navigation should not be overloaded.

LinkedIn, GitHub, resume, and contact should also be easily accessible from the hero area.

Use clear text labels with optional icons.

Do not rely exclusively on unlabeled icons.

---

# 12. Homepage Content Structure

## 12.1 Hero

The hero should immediately communicate:

- Clarissa Choi
- Mathematics and Computer Science background
- current positioning / interests

Include prominent links for:

- LinkedIn
- GitHub
- Resume
- Contact

Do not display the full email address prominently as visual body text.

Use a contact button with a `mailto:` link instead.

The hero should not take up an unnecessarily large amount of vertical space.

---

## 12.2 About / Personal Story

Keep this concise.

The goal is to communicate an unconventional path:

```text
Dance → Mathematics → Computer Science → Technology / Data
```

Avoid generic statements such as:

> I am a passionate computer science student.

The section should provide context about how a creative background and technical interests connect.

This section may be one of the areas where the strict grid is loosened slightly.

---

## 12.3 Experience

Experience should be presented as a **timeline or journey**, rather than a collection of standard cards.

The timeline should be easy to scan chronologically.

Individual experience points can be interactive.

Example metadata style:

```text
// EXPERIENCE_01

2025—2026

DELOITTE
DATA ANALYTICS INTERN
```

Clicking or opening an experience can reveal:

- description
- key responsibilities
- selected achievements
- relevant metrics

The experience section should remain recruiter-friendly and should not become an overly abstract visualization.

---

## 12.4 Featured Project — TradingJoe

TradingJoe is the primary project.

It should receive the strongest visual emphasis.

Initial information should include:

```text
// PROJECT_01

TRADINGJOE

Short description

Tech stack

[ WATCH DEMO ]
[ VIEW GITHUB ]
```

The project should include real media where available.

Possible media:

- application screenshots
- product interface images
- embedded demo video

When opened or expanded, reveal:

- fuller project description
- problem being solved
- key features
- technical stack
- additional screenshots
- demo video
- GitHub link
- live deployment if appropriate

The project should visually occupy more space than secondary projects.

---

## 12.5 Atlas

Atlas should be clearly labeled as unfinished.

Example:

```text
// PROJECT_02

ATLAS

STATUS: CURRENTLY_BUILDING
```

Include only:

- short description
- current status

Do not make Atlas appear completed.

Do not invent a demo or showcase unfinished functionality as a finished product.

---

## 12.6 Skills

Keep this minimal and text-based.

Group skills into logical categories.

Example:

```text
// SKILLS

LANGUAGES
Python · SQL · JavaScript

TECHNOLOGIES
React Native · Expo · Node.js · Express · MongoDB

TOOLS
Git · Excel · ...
```

Do not use:

- skill bars
- proficiency percentages
- large logo walls

---

## 12.7 Personality / Beyond Work

Include a small section that makes the portfolio feel human.

Possible content:

- dance
- choreography
- cooking
- travel
- photos

This section should feel more personal and playful than the professional sections.

It may use:

- photography
- a slightly looser grid
- unexpected image placement
- short captions

However, it should remain visually integrated with the rest of the site.

Personality should supplement professional content rather than compete with it.

---

## 12.8 Footer

Include:

- LinkedIn
- GitHub
- Resume
- Contact

Keep the footer simple.

---

# 13. Responsive Behavior

The site must be fully usable on mobile.

On smaller screens:

- Collapse multi-column grids appropriately.
- Preserve the connected modular visual system where possible.
- Convert the experience timeline into a readable vertical structure if necessary.
- Ensure expandable content fits the viewport.
- Ensure buttons remain easy to tap.
- Avoid horizontal scrolling.
- Keep typography readable.

Do not simply shrink the desktop design.

Design responsive layouts intentionally.

---

# 14. Accessibility

Ensure:

- adequate text contrast
- visible keyboard focus states
- semantic HTML
- accessible button and link labels
- icons have labels or accessible names
- interactive modules are keyboard accessible
- reduced motion is respected where possible

---

# 15. Implementation Priorities

Build in this order:

1. Overall page structure
2. Global color and typography system
3. Connected grid system
4. Hero
5. Experience timeline
6. TradingJoe featured project
7. Atlas placeholder
8. Skills
9. About / personal section
10. Navigation
11. Expandable interactions
12. Mobile responsiveness
13. Final polish

Do not begin with animations or decorative details.

---

# 16. Definition of Done for V1

The first version is complete when:

- The site is live on GitHub Pages.
- The site works on desktop and mobile.
- LinkedIn works.
- GitHub works.
- Resume opens correctly.
- Contact works.
- Experience is easy to scan.
- TradingJoe is prominently featured.
- Atlas is clearly marked as currently building.
- The expandable interaction works.
- The site has a coherent grid system.
- The site has a small amount of visible personality.
- There are no broken links.
- There are no unnecessary dependencies.
- There are no gradients.
- The design does not rely on generic floating cards.

Do not delay deployment for additional projects or future improvements.

V2 can add:

- Atlas when completed
- TradingJoe demo video
- additional project detail
- more photography
- more personal content
- additional interactive elements