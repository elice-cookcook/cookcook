import Component from "../core/Component.js";

export default class BookmarkItem extends Component {
  template() {
    let name = this.$props.RCP_NM;
    let calorie = this.$props.INFO_ENG;
    let imgUrl = this.$props.ATT_FILE_NO_MAIN;
    let ingredients = this.$props.RCP_PARTS_DTLS;
    let hash_tag = this.$props.HASH_TAG;

    return /*html*/ `<style>
    .BookmarkItem {
        width: 99%;
        height: 130px;
        display: flex;
        background-color: #ffebcb;
        border-radius: 5px;
        align-items: center;
        text-align: center;
        cursor:pointer;
    }

    .BookmarkItem_imgSection{
        flex:1;
    }

    .BookmarkItem_img {
        width:120px;
        height:120px;
    }

    .BookmarkItem_info {
        flex:3;
    }

    .BookmarkItem_name {
        font-weight: bold;
        font-size: 16px;
        word-break : keep-all;
    }

    .BookmarkItem_calorie{
      font-size:12px;
      color:gray;
      justify-content:center;
      align-items:center;
      align-content:center;
    }

</style>
<div class="BookmarkItem container mx-auto my-3 p-2 w-95">
    <div class="BookmarkItem_imgSection">
        <img src="${imgUrl}" class="BookmarkItem_img" /></div>
    <div class="BookmarkItem_info my-1 mx-auto">
        <p class="BookmarkItem_name my-1">${name}  <span class="BookmarkItem_calorie">${calorie}kcal</span></p>
    </div>
</div>
    `;
  }

  mounted() {
    let id = this.$props.RCP_SEQ;

    this.$target
      .querySelector(`.BookmarkItem`)
      .addEventListener("click", () => {
        history.pushState(
          { data: this.$props, keyword: history.state.keyword },
          null,
          location.href.replace(`/search`, `/detail/${id}`)
        );
        history.go(0);
      });
  }
}
