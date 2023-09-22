import Component from "../core/Component.js";

export default class Navigator extends Component {
  setup() {
    this.$category = ["rice", "soup", "onedish", "sidedish", "dessert", "etc"];
    this.$categoryName = ["밥", "국", "일품", "반찬", "후식", "기타"];
  }
  template() {
    return /*html*/ `
    <div class="category_items px-4">
        ${this.$category
          .map(
            (item, idx) => `
        <div class="category_container mb-2 category_item_${item}">
            <div class="img_box">
                <img class="category_img" src="./img/${item}.png">
            </div>
            <span class="category_item_text">${this.$categoryName[idx]}</span>
        </div>
        `
          )
          .join("")}
    </div>
    <hr class="hr" />
    `;
  }

  mounted() {
    this.$category.forEach((item, idx) => {
      this.$target
        .querySelector(`.category_item_${item}`)
        .addEventListener("click", () => {
          history.pushState(
            { category: this.$categoryName[idx], keyword: "" },
            null,
            location.href.replace("category", "search")
          );
          history.go(0);
        });
    });
  }
}
