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
  const markup = cv
    .map((el) => {
      const target = renderSectionId(el.section);
      const section = el.section.trim().replaceAll("<br/>", "");
      return `<li class='menu__item'><a href='#${target}'>${el.section
        .trim()
        .replaceAll("<br/>", "&nbsp;")}</a></li>`;
    })
    .join(``);
  const menus = document.querySelectorAll(".menu > ul");
  menus.forEach((menu) => menu.insertAdjacentHTML("afterbegin", markup));
};
const renderSectionId = function (section = "") {
  return section
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("<br/>", "")
    .replaceAll("&amp;", "");
};
const handlerMenu = function () {
  const menus = document.querySelectorAll(".menu");
  menus.forEach((menu) => {
    menu.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.hasAttribute("href")) {
        const target = document.querySelector(
          e.target.getAttribute("href")
        ).offsetTop;
        console.dir(target);
        scrollTo({ top: target - 100, behavior: "smooth" });
      }
    });
  });
};

//// INIT ////
(function () {
  render(cv);
  renderMenu(cv);
  handlerMenu();
})();
