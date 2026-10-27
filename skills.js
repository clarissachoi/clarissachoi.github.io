import { skillsData, strengthTiers } from './data.js';

// Skills mind map. Everything it shows comes from skillsData and
// strengthTiers in data.js; this file only renders it and wires it up.
//
// Wide (map wrapper >= STACK_BELOW): categories sit on a fixed ring around
// the hub and their skills open beside them on hover, focus or tap.
// Narrower: hub, then the categories stacked as full-width buttons whose
// skills open underneath when tapped. The switch itself is a CSS container
// query; JS only needs the threshold to word the hint. The stage height
// is CSS too: the screen height minus the nav and section header (which JS
// measures into --skills-chrome), with room to spare.

const SVG_NS = 'http://www.w3.org/2000/svg';
const STACK_BELOW = 980; // keep in sync with the @container queries in styles.css

// Ring positions, by category order in data.js. `dx` is the column
// (-1 left of the hub, +1 right; one unit is --ring-dx in CSS), `y` the
// vertical centre as a percentage of the stage height.
const RING = [
  { dx: -1, y: 15 },
  { dx: -1, y: 38.5 },
  { dx: -1, y: 61.5 },
  { dx: -1, y: 85 },
  { dx: 1, y: 17 },
  { dx: 1, y: 50 },
  { dx: 1, y: 83 }
];

const LINE_BEND = 0.12;
// The hint ("hover or tap a category…") and its arrow are temporary: shown
// each time the map comes into view, faded out after this long or when a
// category is clicked, tapped or focused.
const HINT_MS = 4000;
const POP_MARGIN = 8; // px an open list keeps from the stage edges and the key
const INTRO_MS = 3000; // covers the one-time pill pulse (0.8s delay + 1.8s)

// ---- Strength encoding -------------------------------------------------

export function tierFor(strength) {
  return strengthTiers.find((tier) => strength >= tier.min) ?? strengthTiers[strengthTiers.length - 1];
}

// 0..1 size factor: 70 and below is the smallest, 100 the largest.
function sizeFactor(strength) {
  return Math.min(1, Math.max(0, (strength - 70) / 30));
}

function skillEntry(tag, name, strength, supText = String(strength)) {
  const el = document.createElement(tag);
  el.className = 'skills__leaf';
  if (strength >= strengthTiers[0].min) el.classList.add('skills__leaf--top');
  el.style.setProperty('--c', tierFor(strength).colour);
  el.style.setProperty('--s', sizeFactor(strength).toFixed(3));
  el.append(name);

  const sup = document.createElement('sup');
  sup.textContent = supText;
  el.append(sup);
  return el;
}

// ---- Rendering ----------------------------------------------------------

function renderCount() {
  const countEl = document.getElementById('skills-count');
  if (countEl) countEl.textContent = `${String(skillsData.length).padStart(2, '0')} CATEGORIES`;
}

// The key is one sample entry showing how to read the map.
function renderKey(keyEl) {
  keyEl.innerHTML = '';

  const title = document.createElement('p');
  title.className = 'skills__key-title';
  title.textContent = 'key:';

  const sample = document.createElement('p');
  sample.className = 'skills__key-sample';
  sample.append(skillEntry('span', 'skill', strengthTiers[0].min, 'strength'));

  keyEl.append(title, sample);
}

// Real content is a nested list (category, then its skills) in reading
// order. Closed skill lists are only faded out (wide) or clipped (stacked),
// so screen readers still reach them; the hub and lines are decoration.
function renderMap(mapEl) {
  mapEl.innerHTML = '';

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'skills__svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  const hub = document.createElement('div');
  hub.className = 'skills__hub';
  hub.setAttribute('aria-hidden', 'true');
  hub.textContent = 'Skills';

  const list = document.createElement('ul');
  list.className = 'skills__cats';

  const cats = skillsData.map((category, i) => {
    const pos = RING[i] ?? { dx: i % 2 ? 1 : -1, y: 50 };

    const node = document.createElement('li');
    node.className = `skills__cat skills__cat--${pos.dx < 0 ? 'left' : 'right'}`;
    node.style.setProperty('--dx', pos.dx);
    node.style.setProperty('--y', `${pos.y}%`);

    const heading = document.createElement('h3');
    heading.className = 'skills__cat-heading';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'skills__cat-label';
    button.textContent = category.title;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `skills-pop-${i}`);
    heading.appendChild(button);

    const pop = document.createElement('ul');
    pop.className = 'skills__pop';
    pop.id = `skills-pop-${i}`;

    [...category.skills]
      .sort((a, b) => b.strength - a.strength)
      .forEach((skill) => {
        const item = document.createElement('li');
        item.className = 'skills__pop-item';
        const entry = skillEntry('span', skill.name, skill.strength);
        entry.title = `${skill.name}: ${skill.strength} out of 100`;
        item.appendChild(entry);
        pop.appendChild(item);
      });

    node.append(heading, pop);
    list.appendChild(node);
    return { node, button, pop };
  });

  mapEl.append(svg, hub, list);
  return { mapEl, svg, hub, cats };
}

// ---- Lines ----------------------------------------------------------------

function addPath(svg, d, className) {
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', className);
  svg.appendChild(path);
}

// Centre-to-centre curves from the hub to each pill (the opaque pills and
// hub hide the ends), plus a short arrow from the hint to the nearest pill.
function drawLines(model, hint) {
  const { mapEl, svg, hub, cats } = model;
  svg.innerHTML = '';
  if (getComputedStyle(svg).display === 'none') return;

  const origin = mapEl.getBoundingClientRect();
  const centre = (el) => {
    const r = el.getBoundingClientRect();
    return { x: (r.left + r.right) / 2 - origin.left, y: (r.top + r.bottom) / 2 - origin.top };
  };
  const f = (n) => n.toFixed(1);
  svg.setAttribute('viewBox', `0 0 ${origin.width} ${origin.height}`);

  const from = centre(hub);
  cats.forEach(({ button }, i) => {
    const to = centre(button);
    const sign = i % 2 ? 1 : -1;
    const cx = (from.x + to.x) / 2 - (to.y - from.y) * LINE_BEND * sign;
    const cy = (from.y + to.y) / 2 + (to.x - from.x) * LINE_BEND * sign;
    addPath(svg, `M${f(from.x)} ${f(from.y)} Q${f(cx)} ${f(cy)} ${f(to.x)} ${f(to.y)}`, 'skills__line skills__line--trunk');
  });

  const h = hint.getBoundingClientRect();
  if (!h.width) return;
  const start = { x: (h.left + h.right) / 2 - origin.left, y: h.bottom - origin.top + 4 };
  const nearest = cats
    .map(({ button }) => centre(button))
    .reduce((best, c) => (Math.hypot(c.x - start.x, c.y - start.y) < Math.hypot(best.x - start.x, best.y - start.y) ? c : best));
  const dist = Math.hypot(nearest.x - start.x, nearest.y - start.y) || 1;
  const ux = (nearest.x - start.x) / dist;
  const uy = (nearest.y - start.y) / dist;
  const len = Math.min(44, dist * 0.4);
  const end = { x: start.x + ux * len, y: start.y + uy * len };
  const ctrl = { x: (start.x + end.x) / 2 + uy * len * 0.3, y: (start.y + end.y) / 2 - ux * len * 0.3 };
  const tx = end.x - ctrl.x;
  const ty = end.y - ctrl.y;
  const tl = Math.hypot(tx, ty) || 1;
  const barb = (angle) => {
    const bx = -(tx / tl) * 8;
    const by = -(ty / tl) * 8;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return `${f(end.x + bx * c - by * s)} ${f(end.y + bx * s + by * c)}`;
  };
  addPath(
    svg,
    `M${f(start.x)} ${f(start.y)} Q${f(ctrl.x)} ${f(ctrl.y)} ${f(end.x)} ${f(end.y)} M${barb(0.5)} L${f(end.x)} ${f(end.y)} L${barb(-0.5)}`,
    'skills__hint-arrow'
  );
}

// Lists open vertically centred on their pill; near the top or bottom of
// the stage (or under the key), shift them just enough to stay clear.
// The stub follows the pill via --pop-shift.
function fitPops(model, corner) {
  const { mapEl, svg, cats } = model;
  const ring = getComputedStyle(svg).display !== 'none';
  const stage = mapEl.getBoundingClientRect();
  const c = corner.getBoundingClientRect();
  for (const { button, pop } of cats) {
    pop.style.setProperty('--pop-shift', '0px');
    if (!ring) continue;
    const p = button.getBoundingClientRect();
    const r = pop.getBoundingClientRect();
    const mid = (p.top + p.bottom) / 2;
    const top = mid - r.height / 2;
    const bottom = mid + r.height / 2;
    const underCorner = r.right > c.left && r.left < c.right;
    const minTop = Math.max(stage.top, underCorner ? c.bottom : stage.top) + POP_MARGIN;
    const maxBottom = stage.bottom - POP_MARGIN;
    let shift = 0;
    if (top < minTop) shift = minTop - top;
    else if (bottom > maxBottom) shift = maxBottom - bottom;
    pop.style.setProperty('--pop-shift', `${shift.toFixed(1)}px`);
  }
}

// Height of everything that shares the screen with the stage: the sticky
// nav and this section's header bar (including its bottom margin).
function chromeHeight(mapEl) {
  const nav = document.querySelector('.nav');
  const head = mapEl.closest('section')?.querySelector('.section-head');
  const navHeight = nav ? nav.offsetHeight : 0;
  const headHeight = head ? head.offsetHeight + parseFloat(getComputedStyle(head).marginBottom) : 0;
  return navHeight + headHeight;
}

// ---- Init ---------------------------------------------------------------

export function initSkills() {
  // Everything below touches the DOM, so it only runs in a browser.
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const mapEl = document.getElementById('skills-map');
  const keyEl = document.getElementById('skills-key');
  if (!mapEl || !keyEl) return;

  renderCount();
  renderKey(keyEl);
  const model = renderMap(mapEl);
  const { cats } = model;
  const layoutEl = mapEl.parentElement;
  const hint = document.getElementById('skills-hint');
  const corner = keyEl.parentElement;

  const touchOnly = window.matchMedia?.('(hover: none)').matches;
  const wordHint = () => {
    if (!hint) return;
    const tapOnly = touchOnly || layoutEl.clientWidth < STACK_BELOW;
    hint.textContent = tapOnly ? 'tap a category to open it' : 'hover or tap a category to open it';
  };

  const update = () => {
    mapEl.style.setProperty('--skills-chrome', `${chromeHeight(mapEl)}px`);
    wordHint();
    fitPops(model, corner);
    if (hint) drawLines(model, hint);
  };

  let frame = 0;
  const redraw = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };

  const syncExpanded = () => {
    for (const { node, button } of cats) {
      const expanded = node.classList.contains('open') || node.contains(document.activeElement);
      button.setAttribute('aria-expanded', String(expanded));
    }
  };

  // The first category starts open so the ring is never empty, and the
  // other pills pulse once (the intro). Both end at the first interaction
  // with any category; the pulse also ends on its own.
  let autoOpen = cats[0] ?? null;
  autoOpen?.node.classList.add('open');
  mapEl.classList.add('skills__map--intro');
  const endIntro = () => mapEl.classList.remove('skills__map--intro');
  const introTimer = setTimeout(endIntro, INTRO_MS);

  let hintTimer = 0;
  const hideHint = () => {
    clearTimeout(hintTimer);
    layoutEl.classList.remove('skills__layout--hint');
  };
  const showHint = () => {
    layoutEl.classList.add('skills__layout--hint');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(hideHint, HINT_MS);
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? showHint() : hideHint()), {
      threshold: 0.25
    }).observe(mapEl);
  } else {
    layoutEl.classList.add('skills__layout--hint');
  }

  const firstInteraction = () => {
    clearTimeout(introTimer);
    endIntro();
    if (!autoOpen) return;
    autoOpen.node.classList.remove('open');
    autoOpen = null;
  };

  for (const cat of cats) {
    cat.node.addEventListener('pointerenter', () => {
      firstInteraction();
      syncExpanded();
    });
    // Hover alone doesn't hide the hint: scrolling slides the pills under a
    // resting cursor, which would hide it before it's ever seen.
    cat.node.addEventListener('focusin', () => {
      hideHint();
      firstInteraction();
      syncExpanded();
    });
    cat.node.addEventListener('focusout', () => requestAnimationFrame(syncExpanded));

    // Click, tap, Enter or Space pins this category open (or unpins it)
    // and unpins any other.
    cat.button.addEventListener('click', () => {
      hideHint();
      firstInteraction();
      const wasOpen = cat.node.classList.contains('open');
      cats.forEach((other) => other.node.classList.remove('open'));
      if (!wasOpen) cat.node.classList.add('open');
      syncExpanded();
    });
  }

  syncExpanded();
  update();
  document.fonts?.ready.then(redraw);
  window.addEventListener('resize', redraw);
  if ('ResizeObserver' in window) new ResizeObserver(redraw).observe(mapEl);
}
