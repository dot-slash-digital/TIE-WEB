const TRANSITION_MS = 750;
const MIN_DELAY_MS = 500;
const startTime = performance.now();

const GLOBAL_WRAP = document.getElementById("global-wrap");
const BLINK_OVERLAY = document.getElementById("blink-overlay");

// On the bare landing (index without ?nav=open), skip the blink-in entirely
const isIndex =
  window.location.pathname.endsWith("/") ||
  window.location.pathname.endsWith("index.html");
const isLanding =
  isIndex && !new URLSearchParams(window.location.search).has("nav");

if (isLanding) {
  BLINK_OVERLAY.classList.add("skip");
}

// Open once page is ready — pageshow fires on both normal loads and bfcache restores
window.addEventListener("pageshow", (event) => {
  if (isLanding) {
    GLOBAL_WRAP.classList.add("visible");
    return;
  }
  const elapsed = performance.now() - startTime;
  const remaining = event.persisted ? 0 : Math.max(0, MIN_DELAY_MS - elapsed);
  setTimeout(
    () =>
      requestAnimationFrame(() => {
        BLINK_OVERLAY.classList.add("open");
        requestAnimationFrame(() => {
          GLOBAL_WRAP.classList.add("visible");
        });
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
  BLINK_OVERLAY.classList.remove("open", "skip");
  setTimeout(() => {
    GLOBAL_WRAP.style.opacity = "0";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        window.location.href = link.href;
      }),
    );
  }, TRANSITION_MS);
});
