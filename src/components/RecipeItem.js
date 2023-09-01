import Component from "../core/Component.js";

export default class RecipeItem extends Component {
  template() {
    let imgUrl = this.$props.imgUrl;
    let text = this.$props.recipe;

    return /*html*/ `
    <style>
      img{
        align-content:center;
      }
    </style>
    <div class="RecipeItem">
    <p>${text}</p>
    <img src="${imgUrl}"/>
    </div>
    `;
  }
}
