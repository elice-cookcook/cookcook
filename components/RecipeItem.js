import Component from "../core/Component.js";

export default class RecipeItem extends Component {
  template() {
    let imgUrl = this.$props.imgUrl;
    let text = this.$props.recipe;

    return /*html*/ `
    <div class="RecipeItem my-3">
    <p>${text}</p>
    <img src="${imgUrl}" class="w-50"/>
    </div>
    `;
  }
}
