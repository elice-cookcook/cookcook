import Component from "../core/Component.js";

export default class BookmarkItem extends Component {
  template() {
    let name = this.$props.RCP_NM;
    let imgUrl = this.$props.ATT_FILE_NO_MAIN;
    let hash_tag = this.$props.HASH_TAG;
    let category = this.$props.RCP_PAT2;
    let calorie = this.$props.INFO_ENG;

    return /*html*/ `
    <style>
    .BookmarkItem {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        cursor: pointer;
    }

    .BookmarkItem_delete{
      z-index:1;
      width:100%; 
      height:10px;
      color:gray;
  text-align: right;
    }

    .BookmarkItem_imgDiv {
    width: 100%;
    height: 130px;
    border-radius: 5px;
    overflow:hidden;
}
.BookmarkItem_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

    .BookmarkItem_name {
        font-weight: bold;
        font-size: 12px;
        overflow: hidden;
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 1 ;
        -webkit-box-orient: vertical;
    }

    .BookmarkItem_calorie{
        font-size: 11px;
        color:gray;
    }

    .BookmarkItem_hashtag{
        font-size: 10px;
    }

</style>

<div class="BookmarkItem p-1">
        <span class="BookmarkItem_delete">❌</span>
    <div class="BookmarkItem_imgDiv">
      <img src="${imgUrl}" class="BookmarkItem_img" />  </div>
    <div class="BookmarkItem_nameDiv">
        <span class="BookmarkItem_name mt-1">${name}</span>
        <span class="BookmarkItem_calorie">${calorie}kcal</span>
            <span class="BookmarkItem_hashtag orange">${
              hash_tag.length > 0 ? "# " + hash_tag : ""
            }<span>
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
