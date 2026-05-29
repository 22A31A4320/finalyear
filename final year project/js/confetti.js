/**
 * Agricultural emoji confetti when result contains ag-related emojis
 */
(function () {
  const AG_EMOJIS = [
    "🌿", "🍀", "☘️", "🌱", "🍃", "🌾", "🌽", "🍅", "🌻", "🪴",
    "🌿", "🍀", "☘️", "🌱", "🍃", "🌾", "🌿", "🍀", "☘️", "🌱",
  ];

  const AG_PATTERN =
    /[\u{1F33E}-\u{1F33F}\u{1F331}-\u{1F335}\u{1F337}-\u{1F34C}\u{1F490}\u{1F33B}\u{1F340}-\u{1F341}\u{1F342}-\u{1F343}\u{1F69C}\u{1F9D1}\u200D\u{1F33E}\u{1F41D}]/u;

  function hasAgEmoji(text) {
    if (!text) return false;
    if (AG_PATTERN.test(text)) return true;
    return AG_EMOJIS.some((e) => text.includes(e));
  }

  function launchConfetti(durationMs = 4500, count = 55) {
    let layer = document.querySelector(".confetti-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "confetti-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
    }

    const end = Date.now() + durationMs;

    function spawn() {
      if (Date.now() > end) return;
      const el = document.createElement("span");
      el.className = "confetti-emoji";
      el.textContent = AG_EMOJIS[Math.floor(Math.random() * AG_EMOJIS.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = 1 + Math.random() * 1.5 + "rem";
      const dur = 2.5 + Math.random() * 2.5;
      el.style.animationDuration = dur + "s";
      el.style.animationDelay = Math.random() * 0.5 + "s";
      layer.appendChild(el);
      setTimeout(() => el.remove(), (dur + 0.5) * 1000);
    }

    const interval = setInterval(spawn, 80);
    for (let i = 0; i < count; i++) setTimeout(spawn, i * 40);

    setTimeout(() => clearInterval(interval), durationMs);
  }

  function checkAndCelebrate(resultText) {
    if (hasAgEmoji(resultText)) {
      launchConfetti();
    }
  }

  window.SmartAgroConfetti = {
    hasAgEmoji,
    launchConfetti,
    checkAndCelebrate,
  };
})();
