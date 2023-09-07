import Component from "../core/Component.js";

export default class Navigator extends Component {
  setup() {
    this.$category = ["전체", "밥", "국", "반찬", "일품", "후식", "기타"];
    this.$state = {
      category: history.state.category,
      keyword: history.state.keyword,
    };
  }
  template() {
    return `
        <style>
          .nav_container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 35px;
            color: #7f7f7f;
          }
          hr {
            border-top: 2px solid #5d5d5d;
          }
          .nav_selected {
            color: #f39c12;
            font-weight: bold;
          }
          .nav_container div {
            cursor: pointer;
          }
        </style>
        <div class="nav_container mt-2 px-3">
          ${this.$category
            .map(
              (item) => `
              <div class="nav_item_${item}">${item}</div>
            `
            )
            .join("")}
        </div>
        <hr class="hr my-2" />
    `;
  }
  mounted() {
    const currentCategory = document.querySelector(
      `.nav_item_${this.$state.category}`
    );
    currentCategory.classList.add("orange");
  }
  setEvent() {
    this.$category.forEach((item) => {
      this.addEvent("click", `.nav_item_${item}`, () => {
        history.pushState(
          { category: item, keyword: this.$state.keyword },
          null,
          location.href
        );
        history.go(0);
      });
    });
  }
}
