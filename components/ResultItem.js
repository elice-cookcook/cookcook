import Component from "../core/Component.js";

export default class ResultItem extends Component {
  template() {
    let name = this.$props.recipe.RCP_NM;
    let calorie = this.$props.recipe.INFO_ENG;
    let imgUrl = this.$props.recipe.ATT_FILE_NO_MAIN;
    let ingredients = this.$props.recipe.RCP_PARTS_DTLS;
    let hash_tag = this.$props.recipe.HASH_TAG;

    return /*html*/ `
    <div class="ResultItem container mx-auto my-2 p-2 w-95">
        <div class="ResultItem_imgSection">
            <img src="${imgUrl}" class="ResultItem_img" /></div>
        <div class="ResultItem_info my-1 mx-auto">
            <p class="ResultItem_name my-1">${name}  <span class="ResultItem_calorie">${calorie}kcal</span></p>
            <p class="ResultItem_ingredients">재료 : ${ingredients}</p>
            <span class="ResultItem_hashtag orange">${
              hash_tag.length > 0 ? "# " + hash_tag : ""
            }<span>
        </div>
    </div>
    `;
  }

  mounted() {
    let id = this.$props.recipe.RCP_SEQ;
    this.$target.querySelector(`.ResultItem`).addEventListener("click", () => {
      history.pushState(
        {
          data: this.$props.recipe,
          category: history.state.category,
          keyword: history.state.keyword,
          pagination: this.$props.pagination,
        },
        null,
        location.href.replace("search", `detail/${id}`)
      );
      history.go(0);
    });
  }
}
