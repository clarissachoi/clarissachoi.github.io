import { hero, experience, PROJECTS, about } from './data.js';

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

document.addEventListener("DOMContentLoaded", renderHero);

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
      activeIndex = i;
      renderRail();
      renderDetail();
    });

    nodesEl.appendChild(node);
  });
}

function renderDetail() {
  const detailEl = document.getElementById("detail");
  if (!detailEl) return;

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
  introEl.textContent = about.intro;
}

renderAboutText();
