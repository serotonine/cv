import utilities from "../Utilities.js";

class MainView {
  renderSection(data) {
    return ` <div class="separator">
    ${"".padEnd(100, "*")}
  </div>
  <!-- SECTION -->
  <section class="section col-1-4" id="${utilities.getCleanId(data.section)}">
    <h3>${data.section}</h3>
    <div class="section__wrapper">
    ${this._renderSectionItems(data.items)}
    </div>
  </section>`;
  }

  _renderSectionItems(items) {
    return items
      .map(
        (item) => `
    <div class="section__item ${item.title && `col-1-3`}">
        ${this._renderItemTitle(item)}
        <div class="section__item--description">${this._renderItemDescription(
          item.description
        )}</div>
      </div>
   `
      )
      .join(``);
  }
  _renderItemTitle(item) {
    if (item.title) {
      return `<div class="section__item--title">
      <h4>${item.title}</h4>
      ${item.subtitle && `<p>${item.subtitle}</p>`}
    </div>`;
    }
    return ``;
  }
  _renderItemDescription = function (desc) {
    return desc.length > 1
      ? `<ul>${desc.map((item) => `<li>${item}</li>`).join(``)}</ul>`
      : `<p>${desc}</p>`;
  };
}
export default new MainView();
