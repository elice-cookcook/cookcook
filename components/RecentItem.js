import Component from "../core/Component.js";

export default class Recent extends Component {
  constructor($target, props) {
    super($target, props);
    this.currentIndex = 0;
  }
  setup() {
    const defaultItemData = {
      imgUrl: "https://ifh.cc/g/FnGKV7.png",
      name: "최근 본 레시피가 없습니다🍪",
    };
    const defaultitem = Array(3).fill(defaultItemData);

    // 'recentRecipe' 키의 값이 없다면 defaultitem으로 설정
    if (!localStorage.getItem("recentRecipe")) {
      localStorage.setItem("recentRecipe", JSON.stringify(defaultitem));
    }

    this.$state = {
      currentIndex: 0,
      recentRecipe: JSON.parse(localStorage.getItem("recentRecipe")) || [],
    };
  }

  template() {
    const recentlyList = this.$state.recentRecipe;

    const batchedFoodList = []; // 3개씩 batch로 묶음
    for (let i = 0; i < recentlyList.length; i += 3) {
      const batch = recentlyList.slice(i, i + 3);
      batchedFoodList.push(batch);
    }
    const currentBatch = batchedFoodList[this.$state.currentIndex];

    // 슬라이드 생성
    let slides = currentBatch.map(
      (food, index) => `
         <div class="slide" key="${index}">
           <img src="${food.imgUrl}" alt="${food.name}">
           <div class="image-name ${
             food.name.length >= 10 ? "long-text" : ""
           }">${food.name}</div>
         </div>
       `
    );

    // 빈 공간이 생기지 않게 default img 추가
    while (slides.length < 3) {
      slides.push(`
            <div class="slide">
              <img src="https://ifh.cc/g/FnGKV7.png">
            </div>
        `);
    }

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

      ${slides.join("")}

      <div class="recent-slider-btn" id="nextBtn">&#8250;</div>
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
    const batchedFoodListLength = Math.ceil(
      this.$state.recentRecipe.length / 3
    );
    if (currentIndex === 0) {
      this.setState({ currentIndex: batchedFoodListLength - 1 });
    } else {
      this.setState({ currentIndex: currentIndex - 1 });
    }
  }
  nextSlide() {
    const { currentIndex } = this.$state;
    const batchedFoodListLength = Math.ceil(
      this.$state.recentRecipe.length / 3
    );
    if (currentIndex === batchedFoodListLength - 1) {
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ currentIndex: currentIndex + 1 });
    }
  }
}
