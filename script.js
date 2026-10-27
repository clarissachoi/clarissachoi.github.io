import { hero, heroPhotos, experience, PROJECTS, about, aboutPhotos } from './data.js';
import { initSkills } from './skills.js';

function renderHero() {
  const nameEl = document.getElementById("hero-name");
  const subtitleEl = document.getElementById("hero-subtitle");
  const taglineEl = document.getElementById("hero-tagline");
  const linksEl = document.getElementById("hero-links");

  if (!nameEl || !subtitleEl || !taglineEl || !linksEl) return;

  nameEl.textContent = hero.name;
  subtitleEl.textContent = hero.subtitle;
  taglineEl.textContent = hero.tagline;

  linksEl.innerHTML = "";

  hero.links.forEach((link) => {
    const a = document.createElement("a");
    a.className = "hero__link";
    a.href = link.href;

    if (link.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    const icon = document.createElement("i");
    icon.className = link.icon;
    icon.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.textContent = link.label;

    a.append(icon, label);
    linksEl.appendChild(a);
  });
}

// Builds one polaroid-style photo card (shared by the hero and the about
// collage); callers add their own positioning class and custom properties.
function createPhotoCard(photo, className) {
  const figure = document.createElement("figure");
  figure.className = `photo-card ${className}`;
  figure.style.setProperty("--rotate", `${photo.rotate}deg`);
  figure.style.setProperty("--ratio", photo.ratio);
  if (photo.z) figure.style.zIndex = photo.z;

  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.alt || "";
  img.loading = "lazy";
  img.draggable = false;

  figure.appendChild(img);

  if (photo.caption) {
    const caption = document.createElement("figcaption");
    caption.className = "photo-card__caption";
    caption.textContent = photo.caption;

    if (photo.link) {
      const link = document.createElement("a");
      link.className = "photo-card__link";
      link.href = photo.link.href;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = photo.link.text;
      caption.appendChild(link);
    }

    figure.appendChild(caption);
  }

  return figure;
}

function renderHeroPhotos() {
  const photosEl = document.getElementById("hero-photos");
  if (!photosEl) return;

  photosEl.innerHTML = "";

  heroPhotos.forEach((photo) => {
    const figure = createPhotoCard(photo, `hero__photo hero__photo--${photo.side}`);
    figure.style.setProperty("--top", photo.top);
    figure.style.setProperty("--offset", photo.offset);
    figure.style.setProperty("--width", `${photo.width}px`);
    photosEl.appendChild(figure);
  });
}

function renderAboutCollage() {
  const collageEl = document.getElementById("about-collage");
  if (!collageEl) return;

  collageEl.innerHTML = "";

  aboutPhotos.forEach((photo) => {
    const figure = createPhotoCard(photo, "about__photo");
    figure.style.setProperty("--drop", `${photo.drop}px`);
    collageEl.appendChild(figure);
  });
}

// Pendulum physics for dragged hero photos: each photo hangs from a pin at
// the middle of its top edge. Speeding up or slowing down the drag swings it
// (a hard flick can spin it all the way round), gravity pulls it back to
// hanging straight and air drag gradually calms it. Drives the CSS `rotate`
// property, which stacks on top of the photo's base rotation in `transform`.
const SWING_GRAVITY = 2500; // px/s²; higher = quicker, heavier swing
const SWING_AIR_DRAG = 1.8; // per second; lower = keeps swinging for longer
const SWING_PUSH = 1; // how strongly changes in drag speed swing the photo
const SWING_SMOOTHING = 25; // per second; lower = smoother but laggier response to the drag
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const swingStates = new WeakMap();

function getSwing(photo) {
  let state = swingStates.get(photo);
  if (!state) {
    state = { angle: 0, spin: 0, x: 0, y: 0, vx: 0, vy: 0, dragging: false, raf: 0 };
    swingStates.set(photo, state);
  }
  return state;
}

function runSwing(photo) {
  const state = getSwing(photo);
  if (reduceMotion || state.raf) return;

  // Treat the photo as a rod hanging from the pin: centre of mass half its
  // height below, moment of inertia 4/3·m·L², so angular response = 3/(4L).
  const reach = 3 / (4 * Math.max(photo.offsetHeight / 2, 1));
  let last = performance.now();
  let lastX = state.x;
  let lastY = state.y;

  function step(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    if (dt <= 0) {
      state.raf = requestAnimationFrame(step);
      return;
    }

    // Smoothed pin velocity; how much it changed this frame is the push the
    // pin gives the photo (accelerating right swings the bottom left).
    const blend = Math.min(dt * SWING_SMOOTHING, 1);
    const vx = state.vx + ((state.x - lastX) / dt - state.vx) * blend;
    const vy = state.vy + ((state.y - lastY) / dt - state.vy) * blend;
    const dvx = vx - state.vx;
    const dvy = vy - state.vy;
    state.vx = vx;
    state.vy = vy;
    lastX = state.x;
    lastY = state.y;

    const cos = Math.cos(state.angle);
    const sin = Math.sin(state.angle);
    state.spin += reach * SWING_PUSH * (dvx * cos + dvy * sin);
    state.spin -= reach * SWING_GRAVITY * sin * dt;
    state.spin *= Math.exp(-SWING_AIR_DRAG * dt);
    state.angle += state.spin * dt;

    // Keep the angle in -π..π so full spins don't pile up.
    state.angle = ((((state.angle + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;

    const settled =
      Math.abs(state.angle) < 0.01 &&
      Math.abs(state.spin) < 0.05 &&
      Math.abs(state.vx) < 1 &&
      Math.abs(state.vy) < 1;

    if (!state.dragging && settled) {
      state.angle = 0;
      state.spin = 0;
      state.vx = 0;
      state.vy = 0;
      state.raf = 0;
      photo.style.rotate = "";
      return;
    }

    photo.style.rotate = `${state.angle}rad`;
    state.raf = requestAnimationFrame(step);
  }

  state.raf = requestAnimationFrame(step);
}

// Lets each rendered hero photo be dragged anywhere within the hero.
// Only ever touches the rendered position (inline left/top/z-index) —
// heroPhotos in data.js, the source of the initial layout, is untouched.
function initHeroPhotoDrag() {
  const heroEl = document.getElementById("hero");
  const photosEl = document.getElementById("hero-photos");
  if (!heroEl || !photosEl) return;

  let topZ = 10;

  photosEl.addEventListener("pointerdown", (e) => {
    const photo = e.target.closest(".hero__photo");
    if (!photo) return;

    e.preventDefault();

    const heroRect = heroEl.getBoundingClientRect();

    // Switch to an explicit left/top position (in px, relative to the
    // hero) so the photo is free to move anywhere in the hero instead
    // of staying anchored to its original left/right side. Uses layout
    // offsets rather than the on-screen box, which grows as the photo swings.
    const startLeft = photo.offsetLeft;
    const startTop = photo.offsetTop;
    photo.style.left = `${startLeft}px`;
    photo.style.top = `${startTop}px`;
    photo.style.right = "auto";

    topZ += 1;
    photo.style.zIndex = topZ;
    photo.classList.add("hero__photo--dragging");
    photo.setPointerCapture(e.pointerId);

    const startX = e.clientX;
    const startY = e.clientY;

    const swing = getSwing(photo);
    swing.dragging = true;
    swing.x = startLeft;
    swing.y = startTop;
    runSwing(photo);

    const maxLeft = Math.max(heroRect.width - photo.offsetWidth, 0);
    const maxTop = Math.max(heroRect.height - photo.offsetHeight, 0);

    function onMove(ev) {
      const nextLeft = startLeft + (ev.clientX - startX);
      const nextTop = startTop + (ev.clientY - startY);

      swing.x = Math.min(Math.max(nextLeft, 0), maxLeft);
      swing.y = Math.min(Math.max(nextTop, 0), maxTop);
      photo.style.left = `${swing.x}px`;
      photo.style.top = `${swing.y}px`;
    }

    function onUp(ev) {
      photo.classList.remove("hero__photo--dragging");
      swing.dragging = false;
      photo.releasePointerCapture(ev.pointerId);
      photo.removeEventListener("pointermove", onMove);
      photo.removeEventListener("pointerup", onUp);
      photo.removeEventListener("pointercancel", onUp);
    }

    photo.addEventListener("pointermove", onMove);
    photo.addEventListener("pointerup", onUp);
    photo.addEventListener("pointercancel", onUp);
  });
}

// Temporary "drag me!" note with a hand-drawn arrow pointing at the first
// hero photo. Fades in whenever the hero comes into view (load, refresh or
// scrolling back up), fades out after a few seconds or once a photo is grabbed.
const DRAG_HINT_DURATION = 4000; // ms
const SVG_NS = "http://www.w3.org/2000/svg";

function initDragHint() {
  const heroEl = document.getElementById("hero");
  const photosEl = document.getElementById("hero-photos");
  const photo = photosEl && photosEl.querySelector(".hero__photo");
  if (!heroEl || !photo || !("IntersectionObserver" in window)) return;

  const hint = document.createElement("div");
  hint.className = "hero__drag-hint";
  const svg = document.createElementNS(SVG_NS, "svg");
  const arrow = document.createElementNS(SVG_NS, "path");
  arrow.setAttribute("class", "hero__drag-hint-arrow");
  svg.appendChild(arrow);
  const label = document.createElement("span");
  label.className = "hero__drag-hint-label";
  label.textContent = "drag me!";
  hint.append(svg, label);
  photosEl.appendChild(hint);

  // Points at whichever side of the photo faces the middle of the hero,
  // using layout offsets so it follows the photo if it has been dragged.
  function place() {
    const width = photosEl.clientWidth;
    const dir = photo.offsetLeft + photo.offsetWidth / 2 < width / 2 ? 1 : -1;
    const target = {
      x: dir > 0 ? photo.offsetLeft + photo.offsetWidth + 10 : photo.offsetLeft - 10,
      y: photo.offsetTop + photo.offsetHeight * 0.45
    };
    // Label sits up and out from the photo, clear of the centred hero text,
    // but never above the top of the hero (where it would run into the nav).
    const anchor = {
      x: target.x + dir * 60,
      y: Math.max(target.y - 60, label.offsetHeight + 12)
    };

    label.style.left = `${anchor.x}px`;
    label.style.top = `${anchor.y}px`;
    label.style.transform = `translate(${dir > 0 ? "0" : "-100%"}, -100%)`;

    const start = { x: anchor.x + dir * 20, y: anchor.y + 6 };
    const dx = target.x - start.x;
    const dy = target.y - start.y;
    const ctrl = { x: start.x + dx / 2 + dy * 0.3 * dir, y: start.y + dy / 2 - dx * 0.3 * dir };
    const tx = target.x - ctrl.x;
    const ty = target.y - ctrl.y;
    const tl = Math.hypot(tx, ty) || 1;
    const f = (n) => n.toFixed(1);
    const barb = (angle) => {
      const bx = -(tx / tl) * 8;
      const by = -(ty / tl) * 8;
      const c = Math.cos(angle);
      const sn = Math.sin(angle);
      return `${f(target.x + bx * c - by * sn)} ${f(target.y + bx * sn + by * c)}`;
    };
    arrow.setAttribute(
      "d",
      `M${f(start.x)} ${f(start.y)} Q${f(ctrl.x)} ${f(ctrl.y)} ${f(target.x)} ${f(target.y)} M${barb(0.5)} L${f(target.x)} ${f(target.y)} L${barb(-0.5)}`
    );
  }

  let timer = 0;

  function hide() {
    clearTimeout(timer);
    hint.classList.remove("hero__drag-hint--visible");
  }

  function show() {
    place();
    hint.classList.add("hero__drag-hint--visible");
    clearTimeout(timer);
    timer = setTimeout(hide, DRAG_HINT_DURATION);
  }

  // Re-arms each time the hero leaves view, so it shows again on the way back.
  new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? show() : hide()),
    { threshold: 0.25 }
  ).observe(heroEl);

  photosEl.addEventListener("pointerdown", hide);
}

// Footer reuses the hero's name, subtitle and links, so they stay in sync.
function renderFooter() {
  const nameEl = document.getElementById("footer-name");
  const subtitleEl = document.getElementById("footer-subtitle");
  const linksEl = document.getElementById("footer-links");
  const copyrightEl = document.getElementById("footer-copyright");
  if (!nameEl || !subtitleEl || !linksEl || !copyrightEl) return;

  nameEl.textContent = hero.name;
  subtitleEl.textContent = hero.subtitle;
  copyrightEl.textContent = `© ${new Date().getFullYear()} ${hero.name}`;

  linksEl.innerHTML = "";

  hero.links.forEach((link) => {
    const a = document.createElement("a");
    a.className = "footer__link";
    a.href = link.href;

    if (link.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    const icon = document.createElement("i");
    icon.className = link.icon;
    icon.setAttribute("aria-hidden", "true");

    a.append(icon, document.createTextNode(link.label));
    linksEl.appendChild(a);
  });
}

// Links to #hero ("Clarissa Choi", HOME, "Back to top") go to the very top
// of the page, rather than stopping at the hero's edge under the sticky nav.
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href="#hero"]');
  if (!link) return;
  e.preventDefault();
  window.scrollTo({ top: 0 });
  history.replaceState(null, "", location.pathname + location.search);
});

document.addEventListener("DOMContentLoaded", () => {
  renderFooter();
  renderHero();
  renderHeroPhotos();
  initHeroPhotoDrag();
  initDragHint();
});

let activeIndex = 0;

function renderRail() {
  const nodesEl = document.getElementById("nodes");
  if (!nodesEl) return;

  nodesEl.innerHTML = "";

  experience.forEach((entry, i) => {
    const isActive = i === activeIndex;

    const node = document.createElement("button");
    node.className = "node" + (isActive ? " active" : "");
    node.dataset.i = i;
    node.setAttribute("role", "tab");
    node.setAttribute("aria-selected", String(isActive));

    const dotcol = document.createElement("span");
    dotcol.className = "dotcol";

    const stemUp = document.createElement("span");
    stemUp.className = "stem up";

    const stemDown = document.createElement("span");
    stemDown.className = "stem down";

    const dot = document.createElement("span");
    dot.className = "dot";

    dotcol.append(stemUp, stemDown, dot);

    const co = document.createElement("span");
    co.className = "co";
    co.textContent = entry.company;

    node.append(dotcol, co);

    node.addEventListener("click", () => {
      if (i === activeIndex) return;
      const direction = i > activeIndex ? "next" : "prev";
      activeIndex = i;
      renderRail();
      renderDetail(direction);
    });

    nodesEl.appendChild(node);
  });
}

function renderDetail(direction) {
  const detailEl = document.getElementById("detail");
  if (!detailEl) return;

  // Restart the slide animation on every switch; skip it on first render.
  detailEl.classList.remove("slide-next", "slide-prev");
  if (direction) {
    void detailEl.offsetWidth;
    detailEl.classList.add(`slide-${direction}`);
  }

  const entry = experience[activeIndex];

  const bulletsHtml = entry.bullets
    .map((bullet) => `<li>${bullet}</li>`)
    .join("");

  const placeholderHtml = entry.placeholder
    ? '<span class="placeholder-note">placeholder entry</span>'
    : "";

  detailEl.innerHTML = `
    <div class="detail-head">
      <span class="comment">// EXPERIENCE_0${activeIndex + 1}</span>
      <span class="period">${entry.period}</span>
    </div>
    <h2 class="company">${entry.company}</h2>
    <p class="role">${entry.role}</p>
    <hr class="rule">
    <ul class="bullets">${bulletsHtml}</ul>
    ${placeholderHtml}
  `;
}

renderRail();
renderDetail();

function renderProjectsCount() {
  const countEl = document.getElementById("projects-count");
  if (!countEl) return;

  countEl.textContent = `${String(PROJECTS.length).padStart(2, "0")} TOTAL`;
}

function renderCard(project) {
  return `
    <article class="project-card" data-project-id="${project.id}">
      <div class="project-card__label mono-label">PROJECT_${project.id}</div>
      <h3 class="project-card__name">${project.name}</h3>
      <div class="project-card__status mono-label" data-status="${project.status}">
        ${project.status}
      </div>
      <p class="project-card__summary">${project.summary}</p>
      <div class="project-card__stack">${project.stack.join(" · ")}</div>
      <button class="project-card__cta" data-open-modal="${project.id}">
        VIEW PROJECT
      </button>
    </article>
  `;
}

function renderProjectsGrid() {
  const gridEl = document.getElementById("projects-grid");
  if (!gridEl) return;

  gridEl.innerHTML = PROJECTS.map(renderCard).join("");
}

renderProjectsCount();
renderProjectsGrid();

const modal = document.getElementById("project-modal");
const projectsGridEl = document.getElementById("projects-grid");

function openModal(id) {
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return;

  populateModal(project);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal__close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

function populateModal(project) {
  document.getElementById("modal-label").textContent = `PROJECT_${project.id}`;
  document.getElementById("modal-title").textContent = project.name;
  document.getElementById("modal-summary").textContent = project.summary;
  document.getElementById("modal-stack").textContent = project.stack.join("   ");

  const demoEl = document.getElementById("modal-demo");
  if (project.demo?.type === "video") {
    demoEl.innerHTML = `<video src="${project.demo.src}" controls></video>`;
    demoEl.hidden = false;
  } else if (project.demo?.type === "image") {
    demoEl.innerHTML = `<img src="${project.demo.src}" alt="${project.name} preview" />`;
    demoEl.hidden = false;
  } else {
    demoEl.innerHTML = "";
    demoEl.hidden = true; // no empty placeholder box
  }

  const linksEl = document.getElementById("modal-links");
  linksEl.innerHTML = "";
  if (project.links.live) {
    linksEl.innerHTML += `<a class="modal__link" href="${project.links.live}" target="_blank" rel="noopener">LIVE SITE</a>`;
  }
  if (project.links.github) {
    linksEl.innerHTML += `<a class="modal__link" href="${project.links.github}" target="_blank" rel="noopener">GITHUB</a>`;
  }
}

if (modal && projectsGridEl) {
  projectsGridEl.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-modal]");
    if (!trigger) return;
    openModal(trigger.dataset.openModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

function renderAboutText() {
  const headingEl = document.getElementById("about-heading");
  const introEl = document.getElementById("about-intro");
  if (!headingEl || !introEl) return;

  headingEl.textContent = about.heading;
  introEl.replaceChildren(
    ...about.intro.map((text) => {
      const p = document.createElement("p");
      p.innerHTML = text; // trusted copy from data.js; may contain links
      return p;
    })
  );
}

renderAboutText();
renderAboutCollage();

initSkills();
