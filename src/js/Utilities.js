class Utilities {
  getCleanId(section = "") {
    return section
      .toLowerCase()
      .trim()
      .replace(" ", "-")
      .replaceAll(/\s+|<br\/>|&amp;|\+/gi, "");
  }
}
export default new Utilities();
