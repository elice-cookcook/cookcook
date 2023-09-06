import Component from "../core/Component.js";

export default class Navigator extends Component {
  setup() {
    this.$category = ["soup", "rice", "onedish", "sidedish", "dessert", "etc"];
    this.$categoryName = ["국", "밥", "일품", "반찬", "후식", "기타"];
  }
  template() {
    return /*html*/ `
        <style>
          .category_container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            cursor:pointer;
          }
          .category_items {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
          .img_box {
            background-color: #ffdca4;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
          }
          .category_img {
            width: 100px;
          }
          span{
            font-weight:bold;
          }
          hr {
            border-top: 2px solid #5d5d5d;
            width: 410px;
            margin: 0 auto;
          }
        </style>
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
        <hr class="hr mt-2 mb-3" />
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
            location.href.replace("/category", "/search")
          );
          history.go(0);
        });
    });
  }
}
