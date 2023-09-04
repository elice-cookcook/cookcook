import api from "../api.js";
import Component from "../core/Component.js";

/* 
이 페이지는 api 테스트/참고용 페이지이며 추후 삭제할 예정입니다.
자유롭게 테스트용으로 쓰셔도 됩니다.
*/

export default class TempPage extends Component {
  async setup() {
    const keyword1 = "오이";
    const category1 = "반찬";
    const result1 = await api.fetchFoodByCategoryAndKeyword(
      category1,
      keyword1
    );
    if (result1) {
      result1.forEach((item) => {
        this.$target.querySelector(
          "#p1"
        ).innerHTML = `${category1} > ${keyword1} ${result1.length}개의 레시피가 있습니다.`;
        this.$target.querySelector("#div1").innerHTML += `${item["RCP_NM"]},`;
      });
    } else {
      this.$target.querySelector("#p1").innerHTML =
        "존재하는 데이터가 없습니다.";
    }

    const category2 = "반찬";
    const keyword2 = "미역";
    const result2 = await api.fetchFoodByCategoryAndKeyword(
      category2,
      keyword2
    );
    if (result2) {
      result2.forEach((item) => {
        this.$target.querySelector(
          "#p2"
        ).innerHTML = `${category2} > ${keyword2} ${result2.length}개의 레시피가 있습니다.`;
        this.$target.querySelector("#div2").innerHTML += `${item["RCP_NM"]},`;
      });
    } else {
      this.$target.querySelector("#p2").innerHTML =
        "존재하는 데이터가 없습니다.";
    }

    const id1 = 28;
    const result3 = await api.fetchFoodById(id1);
    if (result3) {
      this.$target.querySelector(
        "#div3"
      ).innerHTML = `오늘은 내가 ${result3["RCP_NM"]} 요리사`;
    } else {
      this.$target.querySelector("#p3").innerHTML =
        "존재하는 데이터가 없습니다.";
    }
  }

  template() {
    return /*html*/ `
    <div>
        <div id="div1">
            <p id="p1"></p>
        </div><br>
        <div id="div2">
            <p id="p2"></p>
        </div><br>
        <div id="div3">
            <p id="p3"></p>
        </div><br>
    </div>`;
  }
  mounted() {}
}
