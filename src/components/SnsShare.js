import Component from "../core/Component.js";

export default class SnsShare extends Component {
  setup() {
    this.setState(this.$props);
  }

  template() {
    return /*html*/ `
    <head>
      	<meta property="og:type" content="website" />
	      <meta property="og:title" content="오늘 뭐 먹지?" />
	      <meta property="og:description" content=${this.$state.RCP_NM}의 레시피가 궁금하다면? />
	      <meta property="og:url" content="" />
    </head>

    <style>
    .SnsShare {
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    .SnsShare_shareElem {
        display: flex;
        flex-direction: column;
        cursor:pointer;
    }

    .SnsShare_shareElem>img {
        width: 50px;
    }

    .SnsShare_shareElem>span {
        font-size: 10px;
        font-weight: bold;
        text-align: center;
    }
</style>
<div class="SnsShare mt-2 mb-4">
    <div class="SnsShare_shareElem linkCopy"><img src="./img/copy.png" /><span>링크복사</span></div>
    <div class="SnsShare_shareElem kakaoShare"><img src="./img/kakao-talk.png" /><span>카카오톡</span></div>
    <div class="SnsShare_shareElem instagramShare"><img src="./img/instagram.png" /><span>인스타그램</span></div>
    <div class="SnsShare_shareElem facebookShare"><img src="./img/facebook.png" /><span>페이스북</span></div>
</div>`;
  }

  mounted() {
    this.$target.querySelector(".linkCopy").addEventListener("click", () => {
      window.navigator.clipboard.writeText(window.location).then(() => {
        alert("링크가 복사되었습니다.");
      });
    });
  }
}
