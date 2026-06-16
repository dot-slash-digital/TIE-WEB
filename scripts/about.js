import { ABOUT_PARAGRAPHS } from "../content.js";

const ABOUT_PARAS = document.getElementById("about-paras");

const createPara = (textContent) =>
  Object.assign(document.createElement("div"), {
    textContent,
  });

const parasFragment = document.createDocumentFragment();
ABOUT_PARAGRAPHS.forEach((para) => parasFragment.appendChild(createPara(para)));

ABOUT_PARAS.prepend(parasFragment);
