import Component from "../core/Component.js";

export default class RecipeItem extends Component {
  template() {
    let imgUrl = this.$props.imgUrl;
    let text = this.$props.recipe;

    return /*html*/ `
    <style>
      .RecipeItem{
        display:flex;
        flex-direction:column;
      }
      img{
        align-self:center;
      }
      p{
        text-align:center;
        word-break : keep-all;
      }
    </style>

    <div class="RecipeItem my-3">
    <p>${text}</p>
    <img src="${imgUrl}" class="w-50"/>
    </div>
    `;
  }
}
