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

    // 현재 인덱스에 해당하는 배치 가져오기
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
        }
        .image-name {
          position: absolute;
          padding: 3px 0;
          top: 40%;
          width: 90%;
          font-size: 12px;
          font-weight: bold;
          background-color: rgba(227, 227, 227, 0.632);
          visibility: hidden;
          opacity:0;
          transition: top 0.3s, opacity 0.3s;
        }
        .slide:hover .image-name {
          visibility: visible;
          opacity: 1;
        }
        .image-name.long-text {
          top: 30%;
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

    // img를 클릭하면 해당 detailpage로 이동
    this.addEvent("click", "img", (e) => {
      // 클릭된 이미지 요소 가져오기
      const clickedImg = e.target;
      // 클릭된 이미지의 alt 속성에서 food name 가져오기
      const foodName = clickedImg.getAttribute("alt");

      // 원본 items 배열에서 foodName과 일치하는 데이터 찾기
      const selectedItem = this.$props.items.find(
        (item) => item.RCP_NM === foodName
      );

      // detail 페이지로 이동
      if (selectedItem) {
        history.pushState(
          { data: selectedItem, keyword: "" },
          null,
          location.href.replace("/category", `/detail/${selectedItem.RCP_SEQ}`)
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
