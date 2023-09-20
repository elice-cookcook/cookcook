import Component from "../core/Component.js";
import Header from "../components/Header.js";
import Recommend from "../components/Recommend.js";
import RecentItem from "../components/RecentItem.js";
import CategoryItem from "../components/CategoryItem.js";
import SearchLogic from "../utils/SearchLogic.js";

export default class CategoryPage extends Component {
  setup() {
    const category = history.state.category;
    const keyword = history.state.keyword;

    this.$state = {
      category: category,
      keyword: keyword,
      items: [],
    };
  }

  template() {
    return /*html*/ `
      <style>
      .CategoryPage {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #recommendContainer, #recentContainer {
        text-align: center;
        width: 450px;
        margin: 11.5px 0;
      }
      h4 { 
        color: orange;
        font-weight: bold;
      }
      .slider, .slider-recent {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
      }
      </style>
      <div class="CategoryPage px-3">
        <div id="header"></div>
        <h4 class="my-3">카테고리</h4>
        <div id="categoryItem"></div>
        <div id="recommendContainer">
        <h4>오늘의 추천요리</h4>
        <div class="slider"></div> 
        </div>
        <div id="recentContainer">
        <h4>최근 본 레시피</h4>
        <div class="slider-recent"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    this.$state.items = SearchLogic();
    const recipes = JSON.parse(window.localStorage.getItem("recipes"));
    const $header = this.$target.querySelector("#header");
    new Header($header, { page: "category", category: "전체", keyword: "" });

    const $categoryItem = this.$target.querySelector("#categoryItem");
    new CategoryItem($categoryItem);
    const $sliderContainer = this.$target.querySelector(".slider");

    // 중복되지 않는 무작위 숫자를 생성하는 메서드
    const getRandomNumbers = (min, max, count) => {
      const randomNumbers = new Set();
      while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const imgUrl = recipes[randomNumber].ATT_FILE_NO_MAIN;
        // img가 존재할 때만 randomNumber를 추가하도록
        if (imgUrl) {
          randomNumbers.add(randomNumber);
        }
      }
      return Array.from(randomNumbers);
    };

    const selectedNumbers = getRandomNumbers(1, 1001, 9);

    const foodList = selectedNumbers.map((idx) => ({
      imgUrl: recipes[idx].ATT_FILE_NO_MAIN,
      name: recipes[idx].RCP_NM,
    }));

    const batchSize = 3;
    const batchedFoodList = [];
    for (let i = 0; i < foodList.length; i += batchSize) {
      const batch = foodList.slice(i, i + batchSize);
      batchedFoodList.push(batch);
    }

    new Recommend($sliderContainer, {
      batchedFoodList,
      items: this.$state.items,
    });

    const $recentItemContainer = this.$target.querySelector(".slider-recent");
    new RecentItem($recentItemContainer, {
      items: this.$state.items,
    });
  }
}
