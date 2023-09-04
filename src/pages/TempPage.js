import api from "../api.js";
import Component from "../core/Component.js";

/* 
이 페이지는 api 테스트/참고용 페이지이며 추후 삭제할 예정입니다.
*/
export default class TempPage extends Component {
  setup() {}
  template() {
    return /*html*/ `
    <div>
    temp
    </div>`;
  }
  mounted() {
    console.log(api.fetchFoodAll());
  }
}
