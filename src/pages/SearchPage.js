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
    ];
  }

  template() {
    return /*html*/ `
      <div>
        <h2>Counter Component</h2>
        <div id="resultItemContainer"></div>
      </div>
    `;
  }

  mounted() {
    const resultItemContainer = this.$target.querySelector(
      "#resultItemContainer"
    );
    this.$state.forEach((obj) => {
      new ResultItem(resultItemContainer, obj);
    });
  }
}
