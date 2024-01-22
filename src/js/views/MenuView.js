import utilities from "../Utilities.js";

class MenuView {
  _parentEl;
  constructor(parentEl) {
    this._parentEl = parentEl;
  }
  renderMenu = function (cv) {
    const markup = cv
      .map((el) => {
        const target = utilities.getCleanId(el.section);
        return `<li class='menu__item'><a href='#${target}'>${el.section
          .trim()
          .replaceAll(/<br\/>/gi, "&nbsp;")}</a></li>`;
      })
      .join(``);
    const menus = document.querySelectorAll(`${this._parentEl} > ul`);
    menus.forEach((menu) => menu.insertAdjacentHTML("afterbegin", markup));
  };

  setActiveMenuItem(context, activeEL) {
    const menuItems = document.querySelectorAll(context);
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    activeEL.classList.add("active");
  }

  toogleMenuBurger(domEl = "") {
    ["closed", "open"].forEach((classe) =>
      document.querySelector(domEl).classList.toggle(classe)
    );
  }
}
export default new MenuView(".menu");
