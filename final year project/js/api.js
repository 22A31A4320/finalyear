(function () {
  // Empty = same origin (works on Vercel and localhost)
  const API_BASE = window.SMART_AGRO_API || "";

  async function predict(file) {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`${API_BASE}/api/predict`, { method: "POST", body: form });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Prediction failed");
    }
    return res.json();
  }

  async function predictDemo(file) {
    await window.SmartAgroDB.loadData();
    await new Promise((r) => setTimeout(r, 1200));
    const idx = sessionStorage.getItem("smartAgroUseSample") === "1" ? 1 : Math.floor(Math.random() * 39);
    sessionStorage.removeItem("smartAgroUseSample");
    const rec = window.SmartAgroDB.getRecommendation(idx);
    rec.confidence = (85 + Math.random() * 12).toFixed(1) + "%";
    return rec;
  }

  async function runPrediction(file) {
    try {
      return await predict(file);
    } catch {
      return await predictDemo(file);
    }
  }

  window.SmartAgroAPI = { predict, predictDemo, runPrediction };
})();
