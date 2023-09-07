import Component from "../core/Component.js";
import Header from "../components/Header.js";
import RecipeItem from "../components/RecipeItem.js";
import Footer from "../components/Footer.js";
import api from "../api.js";

export default class DetailPage extends Component {
  template() {
    return /*html*/ `
    <style>
      .spinner-border{
        position:absolute;
        top:50%;
        left:50%;
      }

    .DetailPage {
        display: none;
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width: 480px;
        left: 50%;
        flex-direction: column;
        align-items: center;
        word-break : keep-all;
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

<div>
    <div class="spinner-border my-5" role="status"></div>
    <div class="DetailPage px-3">
    <div id="header"></div>
    <h3 class="mt-4">오늘은 내가 </h3>
    <h3><span class="DetailPage_RCP_NM orange"></span> 요리사🍴</h3>
    <p class="DetailPage_INFO_ENG orange"></p>
    <img class="DetailPage_img w-50" src="https://placehold.co/240x240?text=image" />
    <div>
        <div class="DetailPage_tip title my-3">
            <hr width="20%" />
            <div class="titleText orange">저감조리법 Tip</div>
            <hr width="20%" />
        </div>
        <div class="DetailPage_RCP_NA_TIP content text-center p-3 my-2"></div>
    </div>
    <div>
        <div class="DetailPage_ingredients title my-3">
            <hr width="20%" />
            <div class="titleText orange">준비물</div>
            <hr width="20%" />
        </div>
        <div class="DetailPage_RCP_PARTS_DTLS content text-center p-3 my-2"></div>
    </div>
    <div>
        <div class="DetailPage_recepi title mt-4">
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
</div></div>
    `;
  }
  async mounted() {
    if (history.state && history.state.data) this.$state = history.state.data;
    else {
      const getCurrentIdFromHash = () => {
        const hashDetail = window.location.hash.substring(1);
        const match = hashDetail.match(/detail\/(\d+)/);
        return match ? match[1] : null;
      };

      const currentId = getCurrentIdFromHash();
      this.$state = await api.fetchFoodById(currentId);
    }
    const spinner = document.querySelector(".spinner-border");
    spinner.remove();

    const DetailPage = document.querySelector(".DetailPage");
    DetailPage.style.display = "flex";

    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "detail",
      category: "",
      keyword: "",
    });

    const recipeContainer = this.$target.querySelector("#recipe");
    const keys = Object.keys(this.$state);
    const manualImgKeys = keys.filter(
      (key) => key.includes("MANUAL_IMG") && this.$state[key].length > 0
    );

    this.$target.querySelector(".DetailPage_RCP_NM").innerHTML =
      this.$state.RCP_NM;
    this.$target.querySelector(".DetailPage_INFO_ENG").innerHTML =
      this.$state.INFO_ENG + " kcal";
    this.$target.querySelector(".DetailPage_img").src =
      this.$state.ATT_FILE_NO_MAIN;
    this.$target.querySelector(".DetailPage_RCP_NA_TIP").innerHTML =
      this.$state.RCP_NA_TIP;
    this.$target.querySelector(".DetailPage_RCP_PARTS_DTLS").innerHTML =
      this.$state.RCP_PARTS_DTLS;

    manualImgKeys.forEach((manualImgKey, i) => {
      const item = document.createElement("div");
      const props = {
        imgUrl: this.$state[manualImgKey],
        recipe: this.$state[i < 9 ? `MANUAL0${i + 1}` : `MANUAL${i + 1}`],
      };
      new RecipeItem(item, props);
      recipeContainer.append(item);
    });

    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
