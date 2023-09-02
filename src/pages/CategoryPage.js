import Component from '../core/Component.js';
import Header from '../components/Header.js';
import Navigator from '../components/Navigator.js';
import Pagenation from '../components/Pagenation.js';
import Recommend from '../components/Recommend.js';
import Footer from '../components/Footer.js';
export default class CategoryPage extends Component {
  setup() {
    this.$state = [
      {
        RCP_NM: "크림소스치킨롤",
        INFO_ENG: "234.12",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00670_2.png",
        RCP_PARTS_DTLS:
          "닭고기(가슴살, 150g), 새우(대하, 3마리), 베이컨(20g),\n마늘(20g), 바질…새송이버섯(1개),\n치즈(1장), 버터(10g), 소금(0.2g), 후춧가루(0.01g)",
        HASH_TAG: "닭가슴살",
      },
      {
        RCP_NM: "치킨 쇠고기 땅콩소스 꼬치",
        INFO_ENG: "148",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/20141117/20141117053805_1416213485286.jpg",
        RCP_PARTS_DTLS:
          "닭가슴살 30g, 쇠고기 등심 30g, 간장 3g, 카레가루 2g, 땅콩버터 3g, 참기름 0.5g, 올리브오일 2g, 설탕 1.5g, 생강다진것 1g",
        HASH_TAG: "가슴살",
      },
      {
        RCP_NM: "치킨완자스프",
        INFO_ENG: "236.7",
        ATT_FILE_NO_MAIN:
          "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00465_2.png",
        RCP_PARTS_DTLS:
          "버터(20g), 밀가루(20g), 육수(100g), 생크림(20g)\n브로컬리(30g), 우유(100g), 마늘(10g), 양파(20g)\n소금(0.3g), 후춧가루(0.05g), 참기름(5g)",
        HASH_TAG: "",
      },
    ]; // 임시로 만들어둔 음식 정보 배열입니다.
  }
  template() {
    return `
      <style>
      .CategoryPage {
        width: 480px;
        left: 50%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #recommendContainer {
        text-align: center;
        width: 450px;
      }
      h4 { 
        color: orange;
        font-weight: bold;
      }
      .slider {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
      }
      #pagenationContainer{
        display: flex;
        justify-content: center;
        align-items: center;
      }
      </style>
      <div class="CategoryPage">
        <div id="header"></div>
        <div id="nav"></div>
        <div id="recommendContainer">
        <h4>오늘의 추천요리</h4>
        <div class="slider"></div>
        <div id="pagenationContainer"></div>   
        </div>
        <div id="footer"></div>
      </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector("#header");
    const $nav = this.$target.querySelector("#nav");
    const $pagenation = this.$target.querySelector("#pagenationContainer");
    new Pagenation($pagenation)
    new Header($header);
    new Navigator($nav);

    const $sliderContainer = this.$target.querySelector(".slider");

    let foodList = [];
    for (let i = 0; i < this.$state.length; i++) {
      if (foodList.length === 3) {
        new Recommend($sliderContainer, { foodList });
        foodList = [];
      } else {
        foodList.push({
          imgUrl: this.$state[i].ATT_FILE_NO_MAIN,
          name: this.$state[i].RCP_NM
        });
      }
    }
    if (foodList.length > 0) {
      new Recommend($sliderContainer, { foodList });
    }
    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}