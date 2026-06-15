const createOverlay = (background, zIndex) => {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "fixed",
    inset: "0",
    background,
    zIndex,
    transition: "opacity 0.75s ease",
    pointerEvents: "none",
  });
  document.body.appendChild(el);
  return el;
};

const BLACK_HOLD_MS = 300;
const BEIGE_HOLD_MS = 200;

const isRootWithoutNav =
  (window.location.pathname === "/" ||
    window.location.pathname === "/index.html") &&
  new URLSearchParams(window.location.search).get("nav") !== "open";

const blackOverlay = createOverlay("#000", "10000");
const beigeOverlay = isRootWithoutNav
  ? null
  : createOverlay("var(--beige-bgr)", "9999");

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      blackOverlay.style.opacity = "0";
      blackOverlay.addEventListener(
        "transitionend",
        () => {
          blackOverlay.remove();
          if (!beigeOverlay) return;
          setTimeout(() => {
            beigeOverlay.style.opacity = "0";
            beigeOverlay.addEventListener(
              "transitionend",
              () => beigeOverlay.remove(),
              { once: true },
            );
          }, BEIGE_HOLD_MS);
        },
        { once: true },
      );
    }, BLACK_HOLD_MS);
  });
});
