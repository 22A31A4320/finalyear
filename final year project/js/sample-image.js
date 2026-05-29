/**
 * Sample leaf image — Apple Black Rot (demo upload)
 */
(function () {
  const SAMPLE_PATH = "assets/images/sample-leaf-apple-black-rot.png";

  function loadSample() {
    const preview = document.getElementById("upload-preview");
    const placeholder = document.getElementById("upload-placeholder");
    const uploadBtn = document.getElementById("upload-btn");

    if (!preview) return;

    preview.src = SAMPLE_PATH;
    preview.classList.add("visible");
    placeholder?.classList.add("hidden");
    uploadBtn && (uploadBtn.disabled = false);

    fetch(SAMPLE_PATH)
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          sessionStorage.setItem("smartAgroImage", e.target.result);
          sessionStorage.setItem("smartAgroUseSample", "1");
        };
        reader.readAsDataURL(blob);
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("use-sample-btn")?.addEventListener("click", loadSample);
    if (window.location.hash === "#sample") loadSample();
  });

  window.SmartAgroSample = { loadSample, SAMPLE_PATH };
})();
