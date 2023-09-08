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
    .DetailPage_shareElemSection {
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    .DetailPage_shareElem {
        display: flex;
        flex-direction: column;
    }

    .DetailPage_shareElem>img {
        width: 50px;
    }

    .DetailPage_shareElem>span {
        font-size: 10px;
        font-weight: bold;
        text-align: center;
    }
</style>
<div class="DetailPage_shareElemSection mt-2 mb-4">
    <div class="DetailPage_shareElem"><img src="./img/copy.png" /><span>링크복사</span></div>
    <div class="DetailPage_shareElem"><img src="./img/kakao-talk.png" /><span>카카오톡</span></div>
    <div class="DetailPage_shareElem"><img src="./img/instagram.png" /><span>인스타그램</span></div>
    <div class="DetailPage_shareElem"><img src="./img/facebook.png" /><span>페이스북</span></div>
</div>`;
  }

  mounted() {}
}
