import Component from "../core/Component.js";
import { getLocalStorageData } from "../utils/useLocalStorage.js";
import Slide from "./Slide.js";

export default class Recent extends Component {
  constructor($target, props) {
    super($target, props);
    this.currentIndex = 0;
  }
  setup() {
    const recentRecipe = getLocalStorageData("recentRecipe");
    this.$state = {
      currentIndex: 0,
      recentRecipe: recentRecipe,
    };
  }

  template() {
    return /*html */ `
      <style>
        .Recent_slideContainer{
          display:flex;
        }

        .recent-slider-btn {
          cursor: pointer;
          font-size: 60px;
          height: 100px;
          margin: 0 5px;
          color: grey;
        }
      </style>

      ${
        this.$state.recentRecipe.length > 3
          ? `<style> .recent-slider-btn { visibility: visible; } </style>`
          : `<style> .recent-slider-btn { visibility: hidden; } </style>`
      }

      <div class="recent-slider-btn" id="prevBtn">&#8249;</div>

      <div class="Recent_slideContainer"></div>

      <div class="recent-slider-btn" id="nextBtn">&#8250;</div>
    `;
  }
  mounted() {
    const slideContainer = this.$target.querySelector(".Recent_slideContainer");
    const recentlyList = this.$state.recentRecipe;

    for (let i = 0; i < 3 - recentlyList.length; i++) {
      slideContainer.innerHTML += `<div class="slide">
            <img src="https://ifh.cc/g/FnGKV7.png">
           <span class="image-name">최근 본 레시피 없음</span>
          </div>`;
    }

    const batchedFoodList = []; // 3개씩 batch로 묶음
    for (let i = 0; i < recentlyList.length; i += 3) {
      batchedFoodList.push(recentlyList.slice(i, i + 3));
    }

    const currentBatch = batchedFoodList[this.$state.currentIndex];
    if (recentlyList.length > 0) new Slide(slideContainer, currentBatch);
  }

  setEvent() {
    this.addEvent("click", "#prevBtn", (e) => {
      this.moveSlide.bind(this)("prev");
    });
    this.addEvent("click", "#nextBtn", (e) => {
      this.moveSlide.bind(this)("next");
    });
  }

  moveSlide(param) {
    const { currentIndex } = this.$state;
    const lastIndex = Math.ceil(this.$state.recentRecipe.length / 3) - 1;
    if (param === "prev") {
      if (currentIndex === 0) this.setState({ currentIndex: lastIndex });
      else this.setState({ currentIndex: currentIndex - 1 });
    } else if (param === "next") {
      if (currentIndex === lastIndex) this.setState({ currentIndex: 0 });
      else this.setState({ currentIndex: currentIndex + 1 });
    }
  }
}
