import Component from '../core/Component.js';

export default class Recommend extends Component {
  setup() {
    this.$state = {
    };
  }

  template() {
    return `
        <style>
            .slider-container {
                display: block;
                align-items: center;
                width: 100%;
            }
            h2 { 
                color: orange;
                text-align: center;
            }
            .slider {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .img-box {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3px;
                width: 88px;
                height: 80px;
                position: relative;
            }
            .img-box img {
                width: 100%;
                height: 100%;
                position: relative;
            }
            .image-text-container {
                position: absolute;
                top: 80%;
                width: 93%;
                text-align: center;
                color: black;
                font-size: 10px;
                font-weight: bold;
                background-color: rgba(227, 227, 227, 0.632);
            }
            .slider-btn {
                cursor: pointer;
                font-size: 60px;
                padding-bottom: 12px;  //modify
            }
        </style>

        <div class="slider-container">
            <h2>오늘의 추천요리</h2>
            <div class="slider">
                <div class="slider-btn" id="prevBtn">&#8249;</div>
                
                <div class="img-box" id="img1">
                    <img src="../img/food1.jpg" alt="이미지 1">
                    <div class="image-text-container">라면</div>
                </div>
                <div class="img-box" id="img2">
                    <img src="../img/food2.jpg" alt="이미지 2">
                    <div class="image-text-container">삼겹살</div>
                </div>
                <div class="img-box" id="img3">
                    <img src="../img/food3.jpg" alt="이미지 3">
                    <div class="image-text-container">콩나물국</div>
                </div>
                
                <div class="slider-btn" id="nextBtn">&#8250;</div>
            </div>
        </div>
    `;
  }

//   setEvent() {
//     this.addEvent('click', '', ({ target }) => {

//     });
//   }
}



// 이미지 너비와 글씨 너비 맞추기
// const imgBoxes = document.querySelectorAll('.img-box');

//     imgBoxes.forEach(imgBox => {
//         const img = imgBox.querySelector('img');
//         const imageTextContainer = imgBox.querySelector('.image-text-container');
        
//         // 이미지의 너비를 가져와서 .image-text-container의 너비로 설정
//         imageTextContainer.style.width = img.offsetWidth + 'px';
//     });