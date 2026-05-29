(function () {
  function render(data) {
    document.getElementById("result-title").textContent = data.disease || "—";
    document.title = "Smart Agro — " + (data.disease || "Result");

    document.getElementById("out-description").textContent = data.description || "—";
    document.getElementById("out-prevention").textContent = data.prevention || "—";
    document.getElementById("out-pesticide").textContent =
      data.supplement_name || data.pesticide || "—";
    document.getElementById("out-confidence").textContent =
      "Model confidence: " + (data.confidence || "—");

    const preview = document.getElementById("result-preview");
    const uploaded = sessionStorage.getItem("smartAgroImage");
    if (uploaded && preview) preview.src = uploaded;

    const supImg = document.getElementById("supplement-image");
    if (supImg && data.supplement_image) {
      supImg.src = data.supplement_image;
      supImg.style.display = "block";
    }

    const buyBtn = document.getElementById("buy-link");
    if (buyBtn) {
      if (data.buy_link) {
        buyBtn.href = data.buy_link;
        buyBtn.style.display = "inline-flex";
        buyBtn.target = "_blank";
        buyBtn.rel = "noopener noreferrer";
      } else {
        buyBtn.style.display = "none";
      }
    }

    if (data.class_idx === 4 || (data.disease || "").includes("Background")) {
      document.getElementById("out-prevention").textContent =
        data.prevention || "Please upload a clear photo of a plant leaf.";
    }

    const text = [data.disease, data.description, data.emoji].join(" ");
    window.SmartAgroConfetti?.checkAndCelebrate(text);
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await window.SmartAgroDB.loadData();
    let data;
    try {
      const raw = sessionStorage.getItem("smartAgroResult");
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }
    if (!data) {
      data = window.SmartAgroDB.getRecommendation(17);
      data.confidence = "92.4%";
    }
    render(data);
  });
})();
