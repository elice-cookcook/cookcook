import Component from "../core/Component.js";
import Header from "../components/Header.js";
import RecipeItem from "../components/RecipeItem.js";
import Footer from "../components/Footer.js";
import api from "../api.js";
import SnsShare from "../components/SnsShare.js";
import Suggestion from "../components/Suggestion.js";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/useLocalStorage.js";

export default class DetailPage extends Component {
  constructor($target, $props) {
    super($target, $props); // Component의 생성자 호출
    this.bookmarked = false;
  }

  template() {
    return /*html*/ `
<style>
    .spinner-border {
      position:absolute;
        top: 50%;
        left: 50%;
    }

    .DetailPage {
        display: flex;
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width: 480px;
        left: 50%;
        min-height: 100%;
        flex-direction: column;
        align-items: center;
        word-break: keep-all;
    }

    .DetailPage_bookmarkDiv {
        z-index: 1;
        width: 100%;
        height: 0;
        text-align: right;
        cursor: pointer;
        padding-top: 0.5rem;
    }

    .DetailPage_bookmarkDiv > svg{
        border: 1px orange solid;
        padding:0.3rem;
        border-radius: 5px;
        fill: orange;
    }

    .orange {
        color: #ff9c00;
    }

    h3 {
        text-align: center;
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

    .DetailPage_logo {
        width: 90px;
    }

    .DetailPage_menu {
        display: flex;
        justify-content:flex-end;
        width:100%;
        height:0.5rem;
        z-index:1;
    }

    .DetailPage_menu > svg  {
        fill: gray;
        cursor:pointer;
        border: 1px solid gray;
        padding:0.3rem;
        border-radius: 5px;
        margin:0 0.1rem;
    }

    .DetailPage_menu .focus {
      fill:white;
      background-color:gray;
    }

    .hidden {
        display: none;
    }

    .suggestions{
      text-align: center;
      width: 450px;
      margin: 11.5px 0;
    }
    
    .suggestionContainer{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 110px;
    }

    @media print {
        @page {
            margin: 0;
        }

        #header {
            display: none;
        }

        .DetailPage_bookmarkDiv{
            display: none;
        }

        .content {
            background-color: #fcc999 !important;
            -webkit-print-color-adjust: exact;
        }

        .DetailPage_bottom {
            display: none;
        }

        .DetailPage_menu {
            display: none;
        }

        .suggestions{
          display: none;
        }

        #footer {
            display: none;
        }
    }
</style>

<div>
    <div class="spinner-border" role="status"></div>
    <div class="DetailPage px-3">
        <div id="header"></div>
        <div class="DetailPage_bookmarkDiv">
            <svg class="DetailPage_bookmarkAdd hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path d="M16 10.975v13.025l-6-5.269-6 5.269v-24h6.816c-.553.576-1.004 1.251-1.316 2h-3.5v17.582l4-3.512 4 3.512v-8.763c.805.19 1.379.203 2 .156zm4-6.475c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" /></svg>
        <svg class="DetailPage_bookmarkRemove hidden" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path d="M16 10.975v13.025l-6-5.269-6 5.269v-24h6.816c-1.123 1.168-1.816 2.752-1.816 4.5 0 3.736 3.162 6.768 7 6.475zm4-6.475c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-5v1h5v-1z"/></svg>
                </div>
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
            <div class="DetailPage_recipe title mt-4">
                <hr width="20%" />
                <div class="titleText orange">레시피</div>
                <hr width="20%" />
            </div>

            <div class="DetailPage_menu">
                    <svg id="hideBtn" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <svg id="printBtn" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                    </svg>
            </div>

    <div id="recipe" class="DeatailPage_recipe p-3"></div>
    </div>
        <hr width="90%"/>
        <div class="suggestions">
          <p>이런 레시피는 어떠세요?</p>
        <div class="suggestionContainer"></div>
        <hr width="401px"/>
    </div>
      <section class="DetailPage_bottom">
          <div class="DetailPage_">
              <img class="DetailPage_logo" src="./img/cookcooklogo.png" />이 알려준 레시피가 마음에 들었다면?
          </div>
          <div class="DetailPage_shareElemSection mt-2 mb-4">
          </div>
      </section>
    <div id="footer"></div>
    </div>
</div>
    `;
  }

  async mounted() {
    window.addEventListener("load", () => 
      setTimeout(() => {window.scrollTo(0,0)})
      );

    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "detail",
      category: "",
      keyword: history.state ? history.state.keyword : "",
      pagination: history.state ? history.state.pagination : "",
    });

    if (!history.state || !history.state.data) {
      const getCurrentIdFromHash = () => {
        const hashDetail = window.location.hash.substring(1);
        const match = hashDetail.match(/detail\/(\d+)/);
        return match ? match[1] : null;
      };
      const currentId = getCurrentIdFromHash();
      history.pushState(
        { data: await api.fetchFoodById(currentId), keyword: "" },
        null
      );
    }
    
    this.$state = history.state.data;

    // 중복되지 않는 무작위 숫자를 생성하는 메서드
    function getRandomNumbers(max, count) {
      const randomNumbers = new Set();

      while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * max);
        randomNumbers.add(randomNumber);
      }

      return Array.from(randomNumbers);
    }

    // 비슷한 레시피 객체를 최대 3개까지 배열에 담아 리턴
    const getSugesstions = () => {
      const rcpCategory = this.$state.RCP_PAT2;
      const rcpMethod = this.$state.RCP_WAY2;
      const rcpName = this.$state.RCP_NM;
      const recipes = getLocalStorageData('recipes');

      const sameCategory = recipes.filter(rcp => rcp.RCP_PAT2 === rcpCategory && rcp.RCP_NM !== rcpName);
      const sameMethod = sameCategory.filter(rcp => rcp.RCP_WAY2 === rcpMethod);

      let result = [];
      if(sameMethod.length<1){
        const selectedNumbers = getRandomNumbers(sameCategory.length, 3);
        result = selectedNumbers.map(idx => sameCategory[idx]);
      }else if(sameMethod.length<4){
        result = sameMethod;
      }else{
        const selectedNumbers = getRandomNumbers(sameMethod.length, 3);
        result = selectedNumbers.map(idx => sameMethod[idx]);
      }
      return result;
    }

    // 페이지 랜더링
    const $suggestionContainer = this.$target.querySelector(".suggestionContainer");

    new Suggestion($suggestionContainer, getSugesstions());

    const spinner = document.querySelector(".spinner-border");
    spinner.remove();

    document.title = `${this.$state.RCP_NM} | 오늘 뭐 먹지?`;
    this.isBookmarked = getLocalStorageData("bookmark").find(
      (item) => item.RCP_SEQ === this.$state.RCP_SEQ
    )
      ? true
      : false;

    document.title = `${this.$state.RCP_NM} | 오늘 뭐 먹지?`;

    const bookmarkRemoveBtn = this.$target.querySelector(
      ".DetailPage_bookmarkRemove"
    );

    const bookmarkAddBtn = this.$target.querySelector(
      ".DetailPage_bookmarkAdd"
    );

    const setBookmark = () => {
      if (!this.isBookmarked) {
        bookmarkAddBtn.classList.remove("hidden");
        bookmarkRemoveBtn.classList.add("hidden");
      } else {
        bookmarkRemoveBtn.classList.remove("hidden");
        bookmarkAddBtn.classList.add("hidden");
      }
    };
    setBookmark();

    bookmarkAddBtn.addEventListener("click", () => {
      alert(`${this.$state.RCP_NM}를 북마크 리스트에 추가했습니다.`);
      const currentBookmark = getLocalStorageData("bookmark");
      currentBookmark.unshift(this.$state);
      setLocalStorageData("bookmark", currentBookmark);
      this.isBookmarked = true;
      setBookmark();
    });

    bookmarkRemoveBtn.addEventListener("click", () => {
      alert(`${this.$state.RCP_NM}를 북마크 리스트에서 삭제했습니다.`);
      let currentBookmark = getLocalStorageData("bookmark");
      setLocalStorageData(
        "bookmark",
        currentBookmark.filter((item) => item.RCP_SEQ !== this.$state.RCP_SEQ)
      );
      this.isBookmarked = false;
      setBookmark();
    });

    const hideBtn = this.$target.querySelector("#hideBtn");
    hideBtn.addEventListener("click", () => {
      const images = this.$target.querySelectorAll(".RecipeItem img");
      images.forEach((image) => image.classList.toggle("hidden"));
    });

    const printBtn = this.$target.querySelector("#printBtn");
    printBtn.addEventListener("click", () => {
      window.print();
    });

    const recipeContainer = this.$target.querySelector("#recipe");
    const keys = Object.keys(this.$state);
    const manualImgKeys = keys.filter(
      (key) => key.includes("MANUAL_IMG") && this.$state[key].length > 0
    );
    manualImgKeys.sort();

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

    // 이전에 저장된 데이터 가져오기
    const previousArray = JSON.parse(localStorage.getItem("recentRecipe"));

    const newItem = {
      imgUrl: this.$state.ATT_FILE_NO_MAIN,
      name: this.$state.RCP_NM,
    };

    // 중복되지 않은 데이터만 배열 앞에 추가
    if (!previousArray.some((item) => item.name === newItem.name)) {
      if (
        previousArray.length >= 3 &&
        previousArray.some(
          (item) => item.name === "최근 본 레시피가 없습니다🍪"
        )
      ) {
        previousArray.pop(); // defaultitem가 있을때, 삭제
      }
      previousArray.unshift(newItem);
      localStorage.setItem("recentRecipe", JSON.stringify(previousArray));
    }

    manualImgKeys.forEach((manualImgKey, i) => {
      const item = document.createElement("div");
      const props = {
        imgUrl: this.$state[manualImgKey],
        recipe: this.$state[i < 9 ? `MANUAL0${i + 1}` : `MANUAL${i + 1}`],
      };
      new RecipeItem(item, props);
      recipeContainer.append(item);
    });

    new SnsShare(
      this.$target.querySelector(".DetailPage_shareElemSection"),
      this.$state
    );
    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
