import Component from "../core/Component.js";
import api from "../api.js";
export default class LandingPage extends Component {
  template() {
    return /*html*/ `
      <style>
        *{
            margin: 0;
            padding: 0;
        }
        
        .SplashScreenContainer{
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background-color: #fffaf2;
        }
        
        .SplashScreenTitle{
            display: flex;
            justify-content: center;
            margin-top: 140px;
        }
        
        .SplashScreenTitle img{
            width: 90%;
        }
        
        .slideContainer{
            margin-top: 50px;
            text-align:center;
            width:480px;
            height: 200px;
            overflow:hidden;
        }
        .slideImages{
          display:flex;
          align-items:center;
          transform: translate(-10px);
          height: 200px;
        }
        .slideImages .slideImg{
          width:140px;
          height:auto;
          margin-right: 20px;
        }
        .slideImages > :nth-child(2){
          width:180px;
          height:auto;
        }
        .SplashScreenContainer p{
          color: #32383e;
          text-align:center;
        }

        .spinner-border {
          width: 40px;
          height: 40px;
        }
      </style>
      <div class="SplashScreenContainer">
        <div class="SplashScreenTitle">
          <img src="./img/TitleLogo.png" alt="logo_image">
        </div>
        <div class="slideContainer">
          <div class="slideImages">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00215_2.png">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00328_2.png">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00301_2.png">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00263_2.png">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00388_2.png">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00215_2.png">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00328_2.png">
            <img class="slideImg" src="http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00301_2.png">
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-warning my-5" role="status"></div>
        </div>
        <p>레시피를 불러오는 중...</p>
      </div>
      `;
  }
  mounted() {
    const slide = this.$target.querySelector("#slideImages");
    const currentTranslate = -10;
    const moveLength = 160;
    let currentSlide = 1;

    const slideFrameTiming = {
      duration: 1000,
      easing: "ease",
      fill: "forwards",
    };
    const slideImgGrow = [{ width: "140px" }, { width: "180px" }];
    const slideImgShrink = [{ width: "180px" }, { width: "140px" }];
    const slideImgFrameTiming = {
      duration: 1000,
      easing: "ease",
      fill: "forwards",
    };

    const moveSlide = () => {
      if (currentSlide === 6) {
        const prevImage = this.$target.querySelector(
          `#slideImages > :nth-child(${currentSlide + 1})`
        );

        slide.style.transform = `translate(${currentTranslate}px)`;
        prevImage.animate(slideImgShrink, slideImgFrameTiming);
        currentSlide = 1;
      }
      const slideFrame = [
        {
          transform: `translate(${
            currentTranslate - moveLength * (currentSlide - 1)
          }px)`,
        },
        {
          transform: `translate(${
            currentTranslate - moveLength * currentSlide
          }px)`,
        },
      ];
      const prevImage = this.$target.querySelector(
        `#slideImages > :nth-child(${currentSlide + 1})`
      );
      const nextImage = this.$target.querySelector(
        `#slideImages > :nth-child(${currentSlide + 2})`
      );

      slide.animate(slideFrame, slideFrameTiming);
      prevImage.animate(slideImgShrink, slideImgFrameTiming);
      nextImage.animate(slideImgGrow, slideImgFrameTiming);
      currentSlide += 1;
    };
    moveSlide();
    setInterval(moveSlide, 1000);

    const dataLoad = async () => {
      try {
        const result = await api.fetchFoodAll();
        window.localStorage.setItem("recipes", JSON.stringify(result));
        history.pushState(
          { category: "전체", keyword: "" },
          null,
          location.origin + "#category"
        );
        history.go(0);
      } catch (error) {
        console.log(error);
      }
    };
    dataLoad();
  }
}
