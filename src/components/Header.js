import Component from '../core/Component.js';
export default class Header extends Component {
  template() {
    return `
        <style>
        .container {
          background-color: #ff9c00;
          width: 450px;
          height: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }
        .logo {
          width: 110px;
          height: 40px;
          float: left;
        }
        .input_container {
          display: flex;
        }
        .header_input {
          width: 200px;
          height: 30px;
          border: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .header_input-button {
          background-color: #f1c40f;
          border: none;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          width: 32px;
          height: 30px;
        }
        </style>
        <div class="container">
          <img class="logo" src="./img/cookcooklogo.png">
          <div class="arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="22" fill="white" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          </div>
          <div class="input_container">
            <input class="header_input px-2" placeholder="오늘 뭐 먹지?">
            <button class="header_input-button pb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
          </button>
          <div class="home_button">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
            </svg>
          </div>
        </div>
    `;
  }
  mounted() {
    const $logo = this.$target.querySelector(".logo");
    const $arrow = this.$target.querySelector(".arrow");
    const $homeButton = this.$target.querySelector(".home_button");
    if(this.$props === "detail") {
      $logo.style.display = "none";
      $homeButton.style.color = "white";
    }
    else {
      $arrow.style.display = "none";
    }
    if(this.$props !== "category") {
      $homeButton.style.display = "block";
    }
  }
}