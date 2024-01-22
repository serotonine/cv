import mainV from "./views/MainView.js";
import menuV from "./views/MenuView.js";

const main = document.querySelector("main");

const render = function (cv) {
  const datas = JSON.parse(JSON.stringify(cv));
  datas.forEach((data) => {
    main.insertAdjacentHTML("beforeend", mainV.renderSection(data));
  });
};

const handlerMenu = function () {
  const menus = document.querySelectorAll(".menu");
  menus.forEach((menu) => {
    menu.addEventListener("click", (e) => {
      e.preventDefault();
      // LINKS
      if (e.target.hasAttribute("href")) {
        const target = document.querySelector(e.target.getAttribute("href"));
        menuV.setActiveMenuItem(".menu__item", e.target);
        menuV.toogleMenuBurger(".menu__burger");
        const coordY = target.offsetTop;
        scrollTo({ top: coordY - 100, behavior: "smooth" });
      }
      // MENU BURGER
      if (e.target.closest(".menu__burger")) {
        menuV.toogleMenuBurger(".menu__burger");
      }
    });
  });
};

//// INIT ////
(function () {
  try {
    fetch("./src/js/cv.json")
      .then((res) => res.json())
      .then((cv) => {
        render(cv);
        menuV.renderMenu(cv);
        handlerMenu();
      });
  } catch (e) {
    console.log(`Error`, e.message);
  }
})();
