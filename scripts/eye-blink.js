const TRANSITION_MS = 1000;
const MIN_DELAY_MS = 500;
const startTime = Date.now();

const GLOBAL_WRAP = document.getElementById("global-wrap");

const BLINK_OVERLAY = Object.assign(document.createElement("div"), {
  id: "blink-overlay",
});

const BLINK_GRADIENT = Object.assign(document.createElement("div"), {
  id: "blink-gradient",
});

BLINK_OVERLAY.append(BLINK_GRADIENT);
document.body.prepend(BLINK_OVERLAY);

// Open once page is ready — pageshow fires on both normal loads and bfcache restores
window.addEventListener("pageshow", (event) => {
  const elapsed = Date.now() - startTime;
  const remaining = event.persisted ? 0 : Math.max(0, MIN_DELAY_MS - elapsed);
  setTimeout(
    () =>
      requestAnimationFrame(() => {
        GLOBAL_WRAP.classList.add("visible");
        BLINK_OVERLAY.classList.add("open");
      }),
    remaining,
  );
});

// Close before navigating to internal links
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || link.target === "_blank") return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  BLINK_OVERLAY.classList.remove("open");
  setTimeout(() => {
    window.location.href = link.href;
  }, TRANSITION_MS);
});
