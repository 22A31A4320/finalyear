(function () {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, dots = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    const n = Math.min(60, Math.floor((w * h) / 25000));
    dots = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 1.5,
      a: 0.15 + Math.random() * 0.25,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach((d) => {
      ctx.fillStyle = `rgba(62, 142, 88, ${d.a})`;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  init();
  draw();
})();
