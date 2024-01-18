import cv from "./cv.json" assert { type: "json" };

const main = document.querySelector("main");

const render = function (cv) {
  /*  if (Array.isArray(cv)) {
    throw new Error("cv is not an array");
  } */
  const datas = JSON.parse(JSON.stringify(cv));

  datas.forEach((data) => {
    // console.log(`data`, data);
    main.insertAdjacentHTML("beforeend", renderSection(data));
  });
};
const renderSection = function (data) {
  return ` <div class="separator">
  ${"".padEnd(100, "*")}
</div>
<!-- SECTION -->
<section class="section col-1-4" id="${renderSectionId(data.section)}">
  <h3>${data.section}</h3>
  <div class="section__wrapper">
  ${renderSectionItems(data.items)}
  </div>
    
</section>`;
};
const renderSectionItems = function (items) {
  return items
    .map(
      (item) => `
  <div class="section__item ${item.title && `col-1-3`}">
      ${renderItemTitle(item)}
      <div class="section__item--description">${renderItemDescription(
        item.description
      )}</div>
    </div>
 `
    )
    .join(``);
};
const renderItemTitle = function (item) {
  if (item.title) {
    return `<div class="section__item--title">
    <h4>${item.title}</h4>
    ${item.subtitle && `<p>${item.subtitle}</p>`}
  </div>`;
  }
  return ``;
};
const renderItemDescription = function (desc) {
  return desc.length > 1
    ? `<ul>${desc.map((item) => `<li>${item}</li>`).join(``)}</ul>`
    : `<p>${desc}</p>`;
};
const renderMenu = function (cv) {
  const sections = cv.map((el) => el.section);
  console.log(`sections`, sections);
};
const renderSectionId = function (section = "") {
  return section
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("<br/>", "")
    .replaceAll("&amp;", "");
};
//// INIT ////
(function () {
  render(cv);
  renderMenu(cv);
})();
