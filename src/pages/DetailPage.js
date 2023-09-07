import Component from "../core/Component.js";
import Header from "../components/Header.js";
import RecipeItem from "../components/RecipeItem.js";
import Footer from "../components/Footer.js";
import api from "../api.js";

export default class DetailPage extends Component {
  async setup() {
    this.$state = history.state.data;
  }
  template() {
    return /*html*/ `
    <style>
    .DetailPage {
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width: 480px;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .orange {
        color: #ff9c00;
    }

    hr {
        border: 1px thin black;
        margin: 15px;
    }

    .title {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .titleText {
        font-size: large;
    }

    .content {
        background-color: #fcc999;
        border-radius: 5px;
    }

    .DetailPage_logo{
        width:90px;
    }
    

    .DetailPage_shareElemSection{
        display:flex;
        justify-content:center;
        gap:5px;
    }

    .DetailPage_shareElem{
      display:flex;
      flex-direction:column;
    }
    
    .DetailPage_shareElem > img{
      width:50px;
    }

    .DetailPage_shareElem > span{
      font-size:10px;
      font-weight:bold;
      text-align:center;
    }
</style>

<div class="DetailPage px-3">
    <div id="header"></div>
    <h3 class="mt-4">오늘은 내가 </h3>
    <h3><span class="orange">${this.$state.RCP_NM}</span> 요리사🍴</h3>
    <p class="orange">${this.$state.INFO_ENG}kcal</p>
    <img class="w-50" src="${this.$state.ATT_FILE_NO_MAIN}" />
    <div>
        <div class="DeatailPage_tip title my-3">
            <hr width="20%" />
            <div class="titleText orange">저감조리법 Tip</div>
            <hr width="20%" />
        </div>
        <div class="content text-center p-3 my-2">${this.$state.RCP_NA_TIP}</div>
    </div>
    <div>
        <div class="DeatailPage_ingredients title my-3">
            <hr width="20%" />
            <div class="titleText orange">준비물</div>
            <hr width="20%" />
        </div>
        <div class="content text-center p-3 my-2">${this.$state.RCP_PARTS_DTLS}</div>
    </div>
    <div>
        <div class="DeatailPage_recepi title mt-4">
            <hr width="20%" />
            <div class="titleText orange">레시피</div>
            <hr width="20%" />
        </div>
        <div id="recipe" class="DeatailPage_recipe p-3"></div>
    </div>
        <hr width="90%"/>
    <section class="DetailPage_bottom">
        <div class="DetailPage_">
            <img class="DetailPage_logo" src="./img/cookcooklogo.png" />이 알려준 레시피가 마음에 들었다면?
        </div>
        <div class="DetailPage_shareElemSection mt-2 mb-4">
            <div class="DetailPage_shareElem"><img src="./img/copy.png" /><span>링크복사</span></div>
            <div class="DetailPage_shareElem"><img src="./img/kakao-talk.png" /><span>카카오톡</span></div>
            <div class="DetailPage_shareElem"><img src="./img/instagram.png" /><span>인스타그램</span></div>
            <div class="DetailPage_shareElem"><img src="./img/facebook.png" /><span>페이스북</span></div>
        </div>
    </section>
    <div id="footer"></div>
</div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "detail",
      category: history.state.category,
      keyword: history.state.keyword,
    });

    const recipeContainer = this.$target.querySelector("#recipe");
    const keys = Object.keys(this.$state);
    const manualImgKeys = keys.filter(
      (key) => key.includes("MANUAL_IMG") && this.$state[key].length > 0
    );

    manualImgKeys.forEach((manualImgKey, i) => {
      const item = document.createElement("div");
      const props = {
        imgUrl: this.$state[manualImgKey],
        recipe: this.$state[i < 9 ? `MANUAL0${i + 1}` : `MANUAL${i + 1}`],
      };
      const recipeItem = new RecipeItem(item, props);
      recipeContainer.append(item);
    });

    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
