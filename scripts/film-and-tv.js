import { FILM_AND_TV_LINKS } from "../content.js";

const CENTER_COLUMN = document.getElementById("center-column");

const createLink = ([textContent, destination]) =>
  Object.assign(document.createElement("a"), {
    textContent,
    target: destination ? "_blank" : "",
    href: destination || "coming-soon",
  });

const linksFragment = document.createDocumentFragment();
FILM_AND_TV_LINKS.forEach((link) =>
  linksFragment.appendChild(createLink(link)),
);

CENTER_COLUMN.prepend(linksFragment);
