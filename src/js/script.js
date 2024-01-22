//import cv from "./cv.json" assert { type: "json" };

const main = document.querySelector("main");

const render = function (cv) {
  const datas = JSON.parse(JSON.stringify(cv));

  datas.forEach((data) => {
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
      // LINKS
      if (e.target.hasAttribute("href")) {
        const target = document.querySelector(e.target.getAttribute("href"));
        setActiveMenuItem(e.target);
        toogleMenuBurger();
        const coordY = target.offsetTop;
        scrollTo({ top: coordY - 100, behavior: "smooth" });
      }
      // MENU BURGER
      if (e.target.closest(".menu__burger")) {
        toogleMenuBurger();
      }
    });
  });
};
const setActiveMenuItem = function (trigger) {
  const menuItems = document.querySelectorAll(".menu__item");
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
  console.log(trigger);
  trigger.classList.add("active");
};
const toogleMenuBurger = function () {
  ["closed", "open"].forEach((classe) =>
    document.querySelector(".menu__burger").classList.toggle(classe)
  );
};
//// INIT ////
(function () {
  try {
    fetch("./src/js/cv.json")
      .then((res) => res.json())
      .then((cv) => {
        render(cv);
        renderMenu(cv);
        handlerMenu();
      });
  } catch (e) {
    console.log(`Error`, e.message);
  }
})();
