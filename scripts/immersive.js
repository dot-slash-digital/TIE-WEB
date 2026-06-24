const IMMERSIVE_EYE = document.getElementById("immersive-eye");

let angle = 0;

document.addEventListener("mousemove", (event) => {
  const rect = IMMERSIVE_EYE.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const raw = Math.atan2(event.clientY - cy, event.clientX - cx) * (180 / Math.PI);
  angle = Math.min(16, Math.max(-24, raw));
});

const tick = () => {
  IMMERSIVE_EYE.style.transform = `rotate(${angle}deg)`;
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
