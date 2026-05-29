/**
 * Shared layout — PEC footer, section badges, expanded nav
 */
(function () {
  const TOP_LINKS = [
    { href: "disease.html", label: "Disease", key: "disease" },
    { href: "pesticides.html", label: "Pesticides", key: "pesticides" },
    { href: "about.html", label: "About", key: "about" },
    { href: "user-guide.html", label: "User Guide", key: "user-guide" },
    { href: "team.html", label: "Team", key: "team" },
  ];

  const PAGE_META = {
    "index.html": { section: "6.4.1", title: "Home Page" },
    "home.html": { section: "6.4.2", title: "Image Upload Interface" },
    "predict-input.html": { section: "6.4.3", title: "Prediction Input — Pesticide Recommendation" },
    "predict-output.html": { section: "6.4.4", title: "Prediction Output — Pesticide Recommendation" },
    "disease.html": { section: "6.4.5", title: "Plant Diseases" },
    "pesticides.html": { section: "6.4.6", title: "Pesticides & Supplements" },
    "about.html": { section: "6.4.7", title: "About Smart Agro" },
    "user-guide.html": { section: "6.4.8", title: "User Guide" },
    "team.html": { section: "6.4.9", title: "Team Members" },
    "result.html": { section: "6.4.10", title: "Result Page" },
    "default.html": { section: "6.4.11", title: "Default Case" },
    "submit.html": { section: "6.4.3", title: "Prediction Input — Processing" },
  };

  function currentFile() {
    const p = window.location.pathname.split("/").pop();
    return p || "index.html";
  }

  function injectSectionBadge() {
    const main = document.querySelector(".page-view");
    if (!main) return;
    const meta = PAGE_META[currentFile()];
    if (!meta) return;
    const badge = document.createElement("div");
    badge.className = "section-badge";
    badge.innerHTML = `<span class="sec-id">${meta.section}</span> ${meta.title}`;
    main.prepend(badge);
  }

  function buildTopNav() {
    const nav = document.querySelector(".top-nav");
    if (!nav || nav.dataset.built === "1") return;
    const file = currentFile();
    nav.innerHTML = TOP_LINKS.map(
      (l) =>
        `<a href="${l.href}"${file === l.href ? ' class="active"' : ""}>${l.label}</a>`
    ).join("");
    nav.dataset.built = "1";
  }

  function injectFooter() {
    if (document.querySelector(".pec-footer")) return;
    const footer = document.createElement("footer");
    footer.className = "pec-footer";
    footer.innerHTML = `
      <div class="pec-footer-inner">
        <strong>SMART AGRO</strong>
        <span>Department of CSE (Artificial Intelligence), PEC</span>
      </div>
    `;
    document.querySelector(".main-wrap")?.appendChild(footer);
  }

  function markSidebar() {
    const file = currentFile();
    const homeFiles = ["index.html", "home.html", "default.html", "predict-input.html", "submit.html", ""];
    document.querySelectorAll(".nav-tab").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      const isHome = homeFiles.includes(file) && ["home.html", "index.html", "default.html", "predict-input.html", "submit.html"].includes(href);
      const isResult =
        ["result.html", "predict-output.html"].includes(file) &&
        ["result.html", "predict-output.html"].includes(href);
      a.classList.toggle("active", isHome || isResult);
    });
  }

  window.SmartAgroLayout = { currentFile, PAGE_META };

  document.addEventListener("DOMContentLoaded", () => {
    injectSectionBadge();
    buildTopNav();
    injectFooter();
    markSidebar();
  });
})();
