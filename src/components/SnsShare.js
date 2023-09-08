import Component from "../core/Component.js";

export default class SnsShare extends Component {
  template() {
    return /*html*/ `
            <div class="DetailPage_shareElemSection mt-2 mb-4">
            <div class="DetailPage_shareElem"><img src="./img/copy.png" /><span>링크복사</span></div>
            <div class="DetailPage_shareElem"><img src="./img/kakao-talk.png" /><span>카카오톡</span></div>
            <div class="DetailPage_shareElem"><img src="./img/instagram.png" /><span>인스타그램</span></div>
            <div class="DetailPage_shareElem"><img src="./img/facebook.png" /><span>페이스북</span></div>
        </div>`;
  }

  mounted() {}
}
