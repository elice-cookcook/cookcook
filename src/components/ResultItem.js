import Component from "../core/Component.js";

export default class ResultItem extends Component {
  template() {
    let name = this.$props.RCP_NM;
    let calorie = this.$props.INFO_ENG;
    let imgUrl = this.$props.ATT_FILE_NO_MAIN;
    let ingredients = this.$props.RCP_PARTS_DTLS;
    let hash_tag = this.$props.HASH_TAG;
    return /*html*/ `
        <div class="ResultItem">
        <img src="${imgUrl}" class="ResultItem_img"/>
        <span class="ResultItem_name">${name}</span>
        <span class="ResultItem_calorie">${calorie}kcal</span>
        <p class="ResultItem_ingredients">재료 : ${ingredients}</p>
        <p>${hash_tag.length > 0 ? "# " + hash_tag : ""}<p>
        </div>
    `;
  }
}
