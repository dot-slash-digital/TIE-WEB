import { FILM_AND_TV_SECTIONS } from "../content.js";

const FILM_INDEX = document.getElementById("film-index");

const createEntry = ({ title, type, genre, logline, href }) => {
  const entry = Object.assign(document.createElement("a"), {
    className: "entry",
    href: href || "coming-soon",
  });
  if (href) entry.target = "_blank";

  const meta = document.createElement("div");
  meta.className = "entry-meta";
  meta.append(
    Object.assign(document.createElement("h2"), {
      className: "entry-title",
      textContent: title,
    }),
    Object.assign(document.createElement("p"), {
      className: "entry-type",
      textContent: `${type} · ${genre}`,
    }),
  );

  entry.append(
    meta,
    Object.assign(document.createElement("p"), {
      className: "entry-logline",
      textContent: logline,
    }),
  );

  return entry;
};

const createSection = ({ label, entries }) => {
  const section = document.createElement("section");
  section.className = "film-section";

  const header = document.createElement("header");
  header.className = "section-header";
  header.append(
    Object.assign(document.createElement("span"), { textContent: label }),
    Object.assign(document.createElement("span"), { textContent: "Logline" }),
  );

  section.append(header, ...entries.map(createEntry));
  return section;
};

const fragment = document.createDocumentFragment();
FILM_AND_TV_SECTIONS.forEach((section) =>
  fragment.appendChild(createSection(section)),
);
FILM_INDEX.append(fragment);
