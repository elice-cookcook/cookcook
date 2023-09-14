import Component from "../core/Component.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import BookmarkItem from "../components/BookmarkItem.js";

export default class BookmarkPage extends Component {
  setup() {
    this.$state = [
      {
        RCP_NM: "크림소스치킨롤",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        INFO_ENG: "234.12",
        HASH_TAG: "닭가슴살",
        RCP_PAT2: "국",
      },
      {
        RCP_NM: "치킨 쇠고기 땅콩소스 꼬치",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/20141117/20141117053805_1416213485286.jpg",
        INFO_ENG: "234.12",
        HASH_TAG: "가슴살",
        RCP_PAT2: "반찬",
      },
      {
        RCP_NM: "치킨완자스프",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00465_2.png",
        INFO_ENG: "234.12",
        HASH_TAG: "",
        RCP_PAT2: "반찬",
      },
      {
        RCP_NM: "크림소스치킨롤",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        INFO_ENG: "234.12",
        HASH_TAG: "",
        RCP_PAT2: "반찬",
      },
      {
        RCP_NM: "크림소스치킨롤",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        INFO_ENG: "234.12",
        HASH_TAG: "",
        RCP_PAT2: "밥",
      },
      {
        RCP_NM: "크림소스치킨롤",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        INFO_ENG: "234.12",
        HASH_TAG: "",
        RCP_PAT2: "반찬",
        HASH_TAG: "닭가슴살",
      },
      {
        RCP_NM: "크림소스치킨롤",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        INFO_ENG: "234.12",
        HASH_TAG: "",
        RCP_PAT2: "반찬",
        HASH_TAG: "닭가슴살",
      },
      {
        RCP_NM: "크림소스치킨롤",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        INFO_ENG: "234.12",
        HASH_TAG: "",
        RCP_PAT2: "반찬",
      },
    ];
  }
  template() {
    return /*html*/ `<style>
    .BookmarkPage {
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width: 480px;
        flex-direction: column;
        align-items: center;
        word-break: keep-all;
        display: flex;
    }

    .orange {
        color: orange;
    }

    .BookmarkPage_top {
        width: 100%;
    }

    .BookmarkContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;     
        gap:10px;
    }
</style>

<div class="BookmarkPage px-3">
    <div id="header"></div>

    <div id="nav"></div>
    <div class="BookmarkPage_top mt-2">
        <span class="orange">찜 목록 > ${this.$state.length}개의 레시피가 있어요.</span></div>
    <div class="BookmarkContainer p-1"></div>
    <div id="paginationContainer"></div>
    <div id="footer"></div>
</div>
    `;
  }
  async mounted() {
    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "bookmark",
      category: "",
      keyword: history.state ? history.state.keyword : "",
    });

    const $nav = this.$target.querySelector("#nav");
    // new Navigator($nav);

    const bookmarkContainer = this.$target.querySelector(".BookmarkContainer");
    this.$state.forEach((item) => {
      const div = document.createElement("div");
      new BookmarkItem(div, item);
      bookmarkContainer.append(div);
    });
    const plus = document.createElement("div");
    bookmarkContainer.append(plus);
    const $pagination = this.$target.querySelector("#paginationContainer");
    // new Pagination($pagination, this.$state);
    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
