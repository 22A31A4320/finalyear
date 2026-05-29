/** Disease + supplement data from data/plant_data.json */
(function () {
  const { IDX_TO_CLASSES, formatLabel } = window.SmartAgroClasses;
  let plantData = null;

  async function loadData() {
    if (plantData) return plantData;
    try {
      const res = await fetch("data/plant_data.json");
      plantData = await res.json();
    } catch {
      plantData = {};
    }
    return plantData;
  }

  function getRecommendation(classIdx) {
    const entry = plantData?.[String(classIdx)] || {};
    const raw = IDX_TO_CLASSES[classIdx] || "";
    const healthy = raw.toLowerCase().includes("healthy");
    return {
      class_idx: classIdx,
      raw_label: raw,
      disease: entry.disease_name || formatLabel(raw),
      description: entry.description || "",
      prevention: entry.prevention || "",
      pesticide: entry.supplement_name || (healthy ? "No treatment required" : "SCORE FUNGICIDE"),
      supplement_name: entry.supplement_name || "",
      supplement_image: entry.supplement_image || "",
      buy_link: entry.buy_link || "",
      reference_image_url: entry.reference_image_url || "",
      is_healthy: healthy,
      emoji: healthy ? "🌿✅" : "🌾🌱🚜",
      confidence: "—",
    };
  }

  async function getRecommendationAsync(classIdx) {
    await loadData();
    return getRecommendation(classIdx);
  }

  async function getAllPills() {
    await loadData();
    return Object.keys(plantData)
      .sort((a, b) => +a - +b)
      .map((k) => plantData[k].disease_name);
  }

  window.SmartAgroDB = {
    loadData,
    getRecommendation,
    getRecommendationAsync,
    getAllPills,
  };

  loadData();
})();
