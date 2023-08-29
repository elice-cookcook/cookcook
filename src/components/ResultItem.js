import Component from "../core/Component.js";

export default class ResultItem extends Component {
  template() {
    let name = this.$props.RCP_NM;
    let calorie = this.$props.INFO_ENG;
    let imgUrl = this.$props.ATT_FILE_NO_MAIN;
    let ingredients = this.$props.RCP_PARTS_DTLS;
    let hash_tag = this.$props.HASH_TAG;

    return /*html*/ `
    <style>
      .ResultItem{
        width:95%;
        height:130px;
        display:flex;
        background-color:#ffebcb;
        padding:10px;
        margin:15px 0;
        border-radius:5px;
        align-items:center;
        text-align:center;
      }
      .ResultItem_info{
        margin: 0 10px;
      }
      .ResultItem > img{
        height:95%;
        object-fit:cover;
      }
      .ResultItem_info_top{
        display:flex;
        justify-content:space-around;
        font-size:large;
      }
      .ResultItem_name{
        font-weight:bold;
      }
      .ResultItem_ingredients{
        font-size:small;
      }
      .ResultItem_hashtag{
        text-align:center;
      }
    </style>
        <div class="ResultItem">
        <img src="${imgUrl}" class="ResultItem_img"/>
        <div class="ResultItem_info">
        <div class="ResultItem_info_top">
        <span class="ResultItem_name">${name}</span>
        <span class="ResultItem_calorie">${calorie}kcal</span>
        </div>
        <p class="ResultItem_ingredients">재료 : ${ingredients}</p>
        <p class="ResultItem_hashtag orange">${
          hash_tag.length > 0 ? "# " + hash_tag : ""
        }<p>
        </div>
        </div>
    `;
  }
}
