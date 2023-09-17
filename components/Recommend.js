import Component from "../core/Component.js";

export default class Recommend extends Component {
  setup() {
    this.$state = {
      currentIndex: 0, // 현재 보이는 슬라이드의 인덱스
    };
  }
  constructor($target, props) {
    super($target, props);
    this.currentIndex = 0;
  }
  template() {
    const { batchedFoodList } = this.$props;
    const currentBatch = batchedFoodList[this.$state.currentIndex];

    return `
      <style>
        .slide {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 5px;
          padding: 5px;
          width: 110px;
          height: 110px;
          position: relative;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }
        .image-name {
          position: absolute;
          padding: 3px 0;
          bottom: 5px;
          width: 110px;
          font-size: 12px;
          font-weight: bold;
          background-color: rgba(227, 227, 227, 0.632);
          cursor: pointer;
          line-height: 1.2em;
        }
        .image-name.long-text {
          word-break: break-all;
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

      ${currentBatch
        .map(
          (food, index) => `
          <div class="slide" key="${index}">
            <img src="${food.imgUrl}" alt="${food.name}">
            <div class="image-name ${
              food.name.length >= 10 ? "long-text" : ""
            }">${food.name}</div>
          </div>
        `
        )
        .join("")}

      <div class="slider-btn" id="nextBtn">&#8250;</div>
    `;
  }

  setEvent() {
    this.addEvent("click", "#prevBtn", (e) => {
      this.prevSlide.bind(this)();
    });
    this.addEvent("click", "#nextBtn", (e) => {
      this.nextSlide.bind(this)();
    });

    // .slide를 클릭하면 해당 detailpage로 이동
    this.addEvent("click", ".slide", (e) => {
      const clickedElem = e.target.closest(".slide");
      const foodName = clickedElem.querySelector("img").getAttribute("alt");

      // 원본 items 배열과 일치하는 데이터
      const selectedItem = this.$props.items.find(
        (item) => item.RCP_NM === foodName
      );

      if (selectedItem) {
        history.pushState(
          { data: selectedItem, keyword: "" },
          null,
          location.href.replace("category", `detail/${selectedItem.RCP_SEQ}`)
        );
        history.go(0);
      }
    });
  }

  prevSlide() {
    const { currentIndex } = this.$state;
    const { batchedFoodList } = this.$props;
    const lastIndex = batchedFoodList.length - 1;
    if (currentIndex === 0) {
      this.setState({ currentIndex: lastIndex });
    } else {
      this.setState({ currentIndex: currentIndex - 1 });
    }
  }
  nextSlide() {
    const { currentIndex } = this.$state;
    const { batchedFoodList } = this.$props;
    const lastIndex = batchedFoodList.length - 1;
    if (currentIndex === lastIndex) {
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ currentIndex: currentIndex + 1 });
    }
  }
}
