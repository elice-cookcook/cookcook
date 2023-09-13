import Component from "../core/Component.js";

export default class ResultItem extends Component {
  template() {
    let name = this.$props.RCP_NM;
    let calorie = this.$props.INFO_ENG;
    let imgUrl = this.$props.ATT_FILE_NO_MAIN;
    let ingredients = this.$props.RCP_PARTS_DTLS;
    let hash_tag = this.$props.HASH_TAG;

    return /*html*/ `<style>
    .ResultItem {
        width: 99%;
        height: 130px;
        display: flex;
        background-color: #ffebcb;
        border-radius: 5px;
        align-items: center;
        text-align: center;
        cursor:pointer;
    }

    .ResultItem_imgSection{
        flex:1;
    }

    .ResultItem_img {
        width:120px;
        height:120px;
    }

    .ResultItem_info {
        flex:3;
    }

    .ResultItem_name {
        font-weight: bold;
        font-size: 16px;
        word-break : keep-all;
    }

    .ResultItem_calorie{
      font-size:12px;
      color:gray;
      justify-content:center;
      align-items:center;
      align-content:center;
    }

    .ResultItem_ingredients {
        font-size: 12px;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: keep-all;
    }

    .ResultItem_hashtag {
        font-size: 13px;
        font-weight:bold;
    }


</style>
<div class="ResultItem container mx-auto my-3 p-2 w-95">
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
    let id = this.$props.RCP_SEQ;

    this.$target.querySelector(`.ResultItem`).addEventListener("click", () => {
      history.pushState(
        { data: this.$props, keyword: history.state.keyword },
        null,
        location.href.replace(`/search`, `/detail/${id}`)
      );
      history.go(0);
    });
  }
}
