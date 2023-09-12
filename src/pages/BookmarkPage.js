import Component from "../core/Component.js";
import Header from "../components/Header.js";
import Navigator from "../components/Navigator.js";
import Footer from "../components/Footer.js";
import Pagination from "../components/Pagination.js";

export default class BookmarkPage extends Component {
  setup() {
    this.$state = [
      {
        RCP_NM: "크림소스치킨롤",
        INFO_ENG: "234.12",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        RCP_PARTS_DTLS:
          "닭고기(가슴살, 150g), 새우(대하, 3마리), 베이컨(20g),\n마늘(20g), 바질…새송이버섯(1개),\n치즈(1장), 버터(10g), 소금(0.2g), 후춧가루(0.01g)",
        HASH_TAG: "닭가슴살",
      },
      {
        RCP_NM: "치킨 쇠고기 땅콩소스 꼬치",
        INFO_ENG: "148",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/20141117/20141117053805_1416213485286.jpg",
        RCP_PARTS_DTLS:
          "닭가슴살 30g, 쇠고기 등심 30g, 간장 3g, 카레가루 2g, 땅콩버터 3g, 참기름 0.5g, 올리브오일 2g, 설탕 1.5g, 생강다진것 1g",
        HASH_TAG: "가슴살",
      },
      {
        RCP_NM: "치킨완자스프",
        INFO_ENG: "236.7",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00465_2.png",
        RCP_PARTS_DTLS:
          "버터(20g), 밀가루(20g), 육수(100g), 생크림(20g)\n브로컬리(30g), 우유(100g), 마늘(10g), 양파(20g)\n소금(0.3g), 후춧가루(0.05g), 참기름(5g)",
        HASH_TAG: "",
      },
      {
        RCP_NM: "크림소스치킨롤",
        INFO_ENG: "234.12",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        RCP_PARTS_DTLS:
          "닭고기(가슴살, 150g), 새우(대하, 3마리), 베이컨(20g),\n마늘(20g), 바질…새송이버섯(1개),\n치즈(1장), 버터(10g), 소금(0.2g), 후춧가루(0.01g)",
        HASH_TAG: "닭가슴살",
      },
    ];
  }
  template() {
    return /*html*/ `
    <style>
    .BookmarkPage {
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width: 480px;           
        left: 50%;
        flex-direction: column;
        align-items: center;
        word-break : keep-all;
        display:flex;
    }
    .orange {
        color: orange;
              }

       .BookmarkPage_top {
        width:100%;
       } 

</style>

<div class="BookmarkPage px-3">
    <div id="header"></div>

        <div id="nav"></div>
    <div class="BookmarkPage_top mt-2">
    <span class="orange">🧡 찜 목록 > ${this.$state.length}개의 레시피가 있어요.</span></div>
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

    const $pagination = this.$target.querySelector("#paginationContainer");
    new Pagination($pagination, this.$state);
    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
