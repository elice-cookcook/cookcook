import ResultItem from "../components/ResultItem.js";
import Component from "../core/Component.js";
import Filter from "../components/Filter.js";
import Header from "../components/Header.js";
import Pagenation from "../components/Pagenation.js";

/* 호출 시 아래와 같은 형식의 props를 넘겨주어야 합니다. 
  {method:"category",keyword:"국/찌개||일품||반찬||후식||기타"} or 
  {method:"search",keyword:"검색단어"}

  검색 단어 ex) 치킨, 국수, 샐러드 등 사용자 입력

  method를 다르게 설정한 이유는 api에서 해당 데이터를 가져올 때 작성하는 쿼리와 함수가 다르기 때문
*/
export default class SearchPage extends Component {
  setup() {
    this.$props = { method: "search", keyword: "치킨" }; //임시로 설정

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
    ]; // 임시로 만들어둔 음식 정보 배열입니다.
  }

  template() {
    return /*html*/ `
    <style>
      .SearchPage{
        width:480px;
        left:50%;
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      .orange {
        color:orange;
      }
      .SearchPage_top{
        width:100%;
        display:flex;
        justify-content:space-between;
      }
    </style>
      <div class="SearchPage p-3">
      <div id="header">Header</div>
      <div id="navigator">Navigator</div>
      <section class="SearchPage_top">
      <div>
      <span class="orange">${this.$state.length}</span>
      개의
      <span class="orange">${this.$props.keyword}</span> 
      레시피가 있어요
      </div>
      <div id="filter"></div>
      </section>
      <div id="resultItemContainer"></div>
      <div id="pagenationContainer"></div>
      </div>
  `;
  }

  mounted() {
    const $header = this.$target.querySelector("#header");
    new Header($header, "search");

    const resultItemContainer = this.$target.querySelector(
      "#resultItemContainer"
    );

    this.$state.forEach((obj) => {
      const item = document.createElement("div");
      const resultItem = new ResultItem(item, obj); // ResultItem 컴포넌트 생성

      resultItemContainer.append(item);
    });

    const $pagenation = this.$target.querySelector("#pagenationContainer");
    new Pagenation($pagenation)
    const $filter = this.$target.querySelector("#filter");
    new Filter($filter);
  }
}
