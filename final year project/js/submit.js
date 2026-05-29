/**
 * submit.html — simulate deep learning inference, store result, redirect
 */
(function () {
  const APPLE_BLACK_ROT = {
    disease: "Apple — Black Rot 🍎",
    confidence: "94.6%",
    pesticide: "Captan + Thiophanate-methyl",
    dosage: "2 g/L foliar spray; repeat every 10–14 days",
    safety: "Apply in dry weather; use mask & gloves 🧑‍🌾",
    emoji: "🌾🍎🌱🚜",
    crop: "Apple",
    classId: "Class 4 / 39 (CNN Linear-33)",
  };

  const OUTCOMES = [
    APPLE_BLACK_ROT,
    {
      disease: "Tomato Early Blight 🍅",
      confidence: "91.8%",
      pesticide: "Mancozeb / Azoxystrobin",
      dosage: "2 g/L — weekly interval",
      safety: "Re-entry after 48h; wear gloves 🧤",
      emoji: "🌾🍅🌱",
    },
    {
      disease: "Potato Late Blight 🥔",
      confidence: "96.1%",
      pesticide: "Metalaxyl + Mancozeb",
      dosage: "2.5 g/L — preventive spray",
      safety: "Do not apply near harvest 🌿",
      emoji: "🚜🌽🌾",
    },
    {
      disease: "Leaf Spot (General) 🍃",
      confidence: "88.4%",
      pesticide: "Copper Oxychloride",
      dosage: "3 g/L — morning application",
      safety: "Avoid drift to water bodies 💧",
      emoji: "🪴☘️🧑‍🌾",
    },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    loader?.classList.add("active");

    const useSample = sessionStorage.getItem("smartAgroUseSample") === "1";
    const pick = useSample ? APPLE_BLACK_ROT : OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)];
    sessionStorage.setItem("smartAgroResult", JSON.stringify(pick));
    sessionStorage.removeItem("smartAgroUseSample");

    setTimeout(() => {
      window.location.href = "predict-output.html";
    }, 2200);
  });
})();
