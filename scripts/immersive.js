const IMMERSIVE_EYE = document.getElementById("immersive-eye");
const LERP = 0.25;

let targetAngle = 0;
let currentAngle = 0;

document.addEventListener("mousemove", (event) => {
  const rect = IMMERSIVE_EYE.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const raw =
    Math.atan2(event.clientY - cy, event.clientX - cx) * (180 / Math.PI);
  targetAngle = Math.min(16, Math.max(-24, raw));
});

const tick = () => {
  currentAngle += (targetAngle - currentAngle) * LERP;
  IMMERSIVE_EYE.style.transform = `rotate(${currentAngle}deg)`;
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
