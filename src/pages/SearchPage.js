import ResultItem from "../components/ResultItem.js";
import Component from "../core/Component.js";

export default class SearchPage extends Component {
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
    ]; // 임시로 만들어둔 음식 정보 배열입니다.
  }

  template() {
    return /*html*/ `
    <style>
      .SearchPage{
        width:480px;
        left:50%;
      }
      .orange {
        color:orange;
      }
      .SearchPage_top{
        display:flex;
        justify-content:space-between;
      }
    </style>
      <div class="SearchPage">
      <section class="SearchPage_top">
      <div>
      <span class="orange">${this.$state.length}</span>
      개의
      <span class="orange">국수</span> 
      레시피가 있어요
      </div>
      <div>▼</div>
      </section>
        <div id="resultItemContainer"></div>
        <div>1 2 3 4 5</div>
      </div>
    `;
  }

  mounted() {
    const resultItemContainer = this.$target.querySelector(
      "#resultItemContainer"
    );

    this.$state.forEach((obj) => {
      // ResultItem 컴포넌트 생성
      const item = document.createElement("div");
      const resultItem = new ResultItem(item, obj);

      // ResultItem 컴포넌트의 내용을 #resultItemContainer에 추가
      resultItemContainer.append(item);
    });
  }
}
