import Component from "../core/Component.js";
import Slide from "./Slide.js";

export default class Recommend extends Component {
  setup() {
    this.$state = {
      currentIndex: 0, // 현재 보이는 슬라이드의 인덱스
    };
  }
  template() {
    return /*html*/ `
      <style>
        .Recommend_slideContainer{
          display:flex;
        }

        .slider-btn {
          cursor: pointer;
          font-size: 60px;
          height: 100px;
          margin: 0 5px;
          color: grey;
        }
      </style>

      <div class="slider-btn" id="prevBtn">&#8249;</div>

      <div class="Recommend_slideContainer"></div>

      <div class="slider-btn" id="nextBtn">&#8250;</div>
    `;
  }

  mounted() {
    const slideContainer = this.$target.querySelector(
      ".Recommend_slideContainer"
    );
    new Slide(
      slideContainer,
      this.$props.batchedFoodList[this.$state.currentIndex]
    );
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
    const { batchedFoodList } = this.$props;
    const lastIndex = batchedFoodList.length - 1;
    if (param === "prev") {
      if (currentIndex === 0) this.setState({ currentIndex: lastIndex });
      else this.setState({ currentIndex: currentIndex - 1 });
    } else if (param === "next") {
      if (currentIndex === lastIndex) this.setState({ currentIndex: 0 });
      else this.setState({ currentIndex: currentIndex + 1 });
    }
  }
}
