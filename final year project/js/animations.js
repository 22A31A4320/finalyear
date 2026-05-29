(function () {
  let selectedFile = null;

  function initSidebar() {
    const toggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const backdrop = document.querySelector(".sidebar-backdrop");
    if (!toggle || !sidebar) return;
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      backdrop?.classList.toggle("visible");
    });
    backdrop?.addEventListener("click", () => {
      sidebar.classList.remove("open");
      backdrop.classList.remove("visible");
    });
  }

  function markTopNav() {
    const path = window.location.pathname.split("/").pop() || "home.html";
    document.querySelectorAll(".top-nav a").forEach((a) => {
      const file = (a.getAttribute("href") || "").split("/").pop();
      a.classList.toggle("active", file === path);
    });
  }

  function initUpload() {
    const zone = document.getElementById("upload-zone");
    const input = document.getElementById("file-input");
    const preview = document.getElementById("upload-preview");
    const placeholder = document.getElementById("upload-placeholder");
    const status = document.getElementById("file-status");
    const btn = document.getElementById("upload-btn");
    if (!zone || !input) return;

    function setFile(file) {
      if (!file || !file.type.startsWith("image/")) return;
      selectedFile = file;
      status.textContent = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.classList.add("visible");
        placeholder.classList.add("hidden");
        sessionStorage.setItem("smartAgroImage", e.target.result);
        btn.disabled = false;
      };
      reader.readAsDataURL(file);
    }

    zone.addEventListener("click", (e) => {
      if (e.target.closest("#upload-btn")) return;
      input.click();
    });

    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drag-over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag-over");
      if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
    });

    input.addEventListener("change", () => {
      if (input.files[0]) setFile(input.files[0]);
    });

    btn?.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!selectedFile) return;
      const loader = document.getElementById("loader");
      loader?.classList.add("active");
      try {
        const result = await window.SmartAgroAPI.runPrediction(selectedFile);
        sessionStorage.setItem("smartAgroResult", JSON.stringify(result));
        window.location.href = "result.html";
      } catch (err) {
        alert(err.message || "Analysis failed");
        loader?.classList.remove("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSidebar();
    markTopNav();
    initUpload();
  });
})();
