const HOME_LOGO = document.getElementById("home-logo");

const NAVIGATION_WRAP = document.getElementById("navigation-wrap");

const showNavigation = () => {
  NAVIGATION_WRAP.classList.add("show");
  if (new URLSearchParams(window.location.search).get("nav") !== "open") {
    history.replaceState(null, "", "?nav=open");
  }
};

HOME_LOGO.addEventListener("click", () => {
  NAVIGATION_WRAP.style.transition = "opacity 0.25s ease";
  showNavigation();
});

if (new URLSearchParams(window.location.search).get("nav") === "open") {
  showNavigation();
}

// Eye pupil tracking
const HOME_HEAD_EYE = document.getElementById("home-head-eye");
const MAX_DRIFT_PX = 10;

let eyeX = 0;
let eyeY = 0;

document.addEventListener("mousemove", (event) => {
  const rect = HOME_HEAD_EYE.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  const dist = Math.hypot(dx, dy);
  const clamp = Math.min(dist, MAX_DRIFT_PX);
  eyeX = dist > 0 ? (dx / dist) * clamp : 0;
  eyeY = dist > 0 ? (dy / dist) * clamp : 0;
});

document.addEventListener("mouseleave", () => {
  eyeX = 0;
  eyeY = 0;
});

const tickEye = () => {
  HOME_HEAD_EYE.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
  requestAnimationFrame(tickEye);
};

requestAnimationFrame(tickEye);
