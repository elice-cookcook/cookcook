import Component from "../core/Component.js";
import Header from "../components/Header.js";
import Navigator from "../components/Navigator.js";
import RecipeItem from "../components/RecipeItem.js";
import Footer from "../components/Footer.js";

export default class DetailPage extends Component {
  setup() {
    const getCurrentIdFromHash = () => {
      const hashDetail = window.location.hash.substring(1);
      const match = hashDetail.match(/detail\/(\d+)/);
      return match ? match[1] : null;
    };

    const currentId = getCurrentIdFromHash();
    console.log(currentId); // 이 id값을 통해 data를 받아와야 한다.

    /*
    임의로 정해놓은 데이터
    실제로는 id값(RCP_SEQ)에 따라 data를 받아와서 사용해야 함
    */
    this.$state = {
      RCP_PARTS_DTLS:
        "새우두부계란찜\n연두부 75g(3/4모), 칵테일새우 20g(5마리), 달걀 30g(1/2개), 생크림 13g(1큰술), 설탕 5g(1작은술), 무염버터 5g(1작은술)\n고명\n시금치 10g(3줄기)",
      RCP_WAY2: "찌기",
      MANUAL_IMG20: "",
      MANUAL20: "",
      RCP_SEQ: "28",
      INFO_NA: "99",
      INFO_WGT: "",
      INFO_PRO: "14",
      MANUAL_IMG13: "",
      MANUAL_IMG14: "",
      MANUAL_IMG15: "",
      MANUAL_IMG16: "",
      MANUAL_IMG10: "",
      MANUAL_IMG11: "",
      MANUAL_IMG12: "",
      MANUAL_IMG17: "",
      MANUAL_IMG18: "",
      MANUAL_IMG19: "",
      INFO_FAT: "17",
      HASH_TAG: "연두부",
      MANUAL_IMG02:
        "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00028_2.png",
      MANUAL_IMG03:
        "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00028_3.png",
      RCP_PAT2: "반찬",
      MANUAL_IMG04: "",
      MANUAL_IMG05: "",
      MANUAL_IMG01:
        "http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00028_1.png",
      MANUAL01: "1. 손질된 새우를 끓는 물에 데쳐 건진다.a",
      ATT_FILE_NO_MK:
        "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00028_1.png",
      MANUAL_IMG06: "",
      MANUAL_IMG07: "",
      MANUAL_IMG08: "",
      MANUAL_IMG09: "",
      MANUAL08: "",
      MANUAL09: "",
      MANUAL06: "",
      MANUAL07: "",
      MANUAL04: "",
      MANUAL05: "",
      MANUAL02:
        "2. 연두부, 달걀, 생크림, 설탕에 녹인 무염버터를 믹서에 넣고 간 뒤 새우(1)를 함께 섞어 그릇에 담는다.b",
      MANUAL03:
        "3. 시금치를 잘게 다져 혼합물 그릇(2)에 뿌리고 찜기에 넣고 중간 불에서 10분 정도 찐다.c",
      ATT_FILE_NO_MAIN:
        "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00028_2.png",
      MANUAL11: "",
      MANUAL12: "",
      MANUAL10: "",
      INFO_CAR: "3",
      MANUAL19: "",
      RCP_NA_TIP:
        "나트륨의 배출을 도와주는 것으로 알려진 칼륨이 풍부한 시금치와 소금, 간장 등의 양념 대신 새우에 들어있는 간으로 맛을 내요.",
      INFO_ENG: "220",
      MANUAL17: "",
      MANUAL18: "",
      RCP_NM: "새우 두부 계란찜",
      MANUAL15: "",
      MANUAL16: "",
      MANUAL13: "",
      MANUAL14: "",
    };
  }
  template() {
    return /*html*/ `
    <style>
    .DetailPage {
        width: 480px;
        left: 50%;
        padding: 10px;
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
      font-size:12px;
    }
</style>

<div class="DetailPage">
    <div id="header"></div>
    <div id="nav"></div>
    <h3>오늘은 내가 </h3>
    <h3><span class="orange">${this.$state.RCP_NM}</span> 요리사🍴</h3>
    <p class="orange">${this.$state.INFO_ENG}kcal</p>
    <img class="w-50" src="${this.$state.ATT_FILE_NO_MAIN}" />
    <div>
        <div class="DeatailPage_tip title my-3">
            <hr width="20%" />
            <div class="titleText orange">저감조리법 Tip</div>
            <hr width="20%" />
        </div>
        <div class="content p-3 my-2">${this.$state.RCP_NA_TIP}</div>
    </div>
    <div>
        <div class="DeatailPage_ingredients title my-3">
            <hr width="20%" />
            <div class="titleText orange">준비물</div>
            <hr width="20%" />
        </div>
        <div class="content p-3 my-2">${this.$state.RCP_PARTS_DTLS}</div>
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
        <div class="DetailPage_shareElemSection my-2">
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
    const $nav = this.$target.querySelector("#nav");
    new Header($header, "detail");
    new Navigator($nav);

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
