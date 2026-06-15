const HOME_LOGO = document.getElementById("home-logo");

const NAVIGATION_WRAP = document.getElementById("navigation-wrap");

const showNavigation = () => {
  NAVIGATION_WRAP.classList.add("show");
  if (new URLSearchParams(window.location.search).get("nav") !== "open") {
    history.replaceState(null, "", "?nav=open");
  }
};

HOME_LOGO.addEventListener("click", showNavigation);

if (new URLSearchParams(window.location.search).get("nav") === "open") {
  showNavigation();
}

NAVIGATION_WRAP.style.transition = "opacity 0.25s ease";
