import Component from "../core/Component.js";
import {
  setLocalStorageData,
  getLocalStorageData,
} from "../utils/useLocalStorage.js";

export default class BookmarkItem extends Component {
  constructor($target, $props, selectable) {
    super($target, $props); // Component의 생성자 호출
    this.selectable = selectable;
    this.setState({
      selectable: this.selectable,
    });
  }

  setup() {
    this.setState({
      selectable: false,
    });
  }

  template() {
    let name = this.$props.RCP_NM;
    let imgUrl = this.$props.ATT_FILE_NO_MAIN;
    let hash_tag = this.$props.HASH_TAG;
    let calorie = this.$props.INFO_ENG;
    let id = this.$props.RCP_SEQ;

    return /*html*/ `
    <style>
        .BookmarkItem {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            cursor: pointer;
            border-radius:10px;
            padding:0.3rem;
        }

        .BookmarkItem_checkboxDiv {
            z-index: 1;
            width: 100%;
            height: 0;
            text-align: right;
            zoom: 1.5;
        }

        .BookmarkItem_imgDiv {
            width: 100%;
            height: 130px;
            border-radius: 5px;
            overflow: hidden;
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
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .BookmarkItem_calorie {
            font-size: 11px;
            color: gray;
        }

        .BookmarkItem_hashtag {
            font-size: 10px;
        }
    </style>

    <div class="BookmarkItem">
        <div class="BookmarkItem_checkboxDiv">
        <input class="BookmarkItem_checkbox mx-1" type="checkbox"/>
        </div>
        <div class="BookmarkItem_clickableDiv">
        <div class="BookmarkItem_imgDiv">
            <img src="${imgUrl}" class="BookmarkItem_img" /> </div>
        <div class="BookmarkItem_nameDiv">
            <span class="BookmarkItem_name mt-1">${name}</span>
            <span class="BookmarkItem_calorie">${calorie}kcal</span>
            <span class="BookmarkItem_hashtag orange">${
              hash_tag.length > 0 ? "#" + hash_tag : ""
            }<span>
        </div>
        </div>
    </div>
    `;
  }

  mounted() {
    let id = this.$props.RCP_SEQ;
    const bookmarkItem = this.$target.querySelector(".BookmarkItem");
    const checkboxDiv = this.$target.querySelector(".BookmarkItem_checkboxDiv");
    const checkbox = this.$target.querySelector(".BookmarkItem_checkbox");
    const clickableDiv = this.$target.querySelector(
      `.BookmarkItem_clickableDiv`
    );

    checkboxDiv.style.display = this.$state.selectable ? "" : "none";

    checkbox.addEventListener("change", () => {
      bookmarkItem.style.background = checkbox.checked ? "#ffebcb" : "none";
      const currentDeleteTargets = getLocalStorageData("deleteTargets");
      if (checkbox.checked) {
        currentDeleteTargets.push(id);
        setLocalStorageData("deleteTargets", currentDeleteTargets);
      } else {
        setLocalStorageData(
          "deleteTargets",
          currentDeleteTargets.filter((item) => item !== id)
        );
      }
    });

    clickableDiv.addEventListener("click", () => {
      history.pushState(
        { data: this.$props, keyword: "" },
        null,
        location.href.replace(`bookmark`, `detail/${id}`)
      );
      history.go(0);
    });
  }
}
