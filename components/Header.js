import Component from "../core/Component.js";
export default class Header extends Component {
  template() {
    return `
        <style>
        .container {
          background-color: #ff9c00;
          width: 480px;
          height: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          width: 110px;
          height: 40px;
          float: left;
          padding: 5px;
          cursor: pointer;
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
        .bookmark_button, .arrow {
          cursor: pointer;
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
            <input class="header_input px-2" placeholder="오늘 뭐 먹지?" value="${this.$props.keyword}">
            <button class="header_input-button pb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
          </button>
          <div class="bookmark_button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
              <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z"/>
              <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z"/>
            </svg>
          </div>
        </div>
    `;
  }
  mounted() {
    const $logo = this.$target.querySelector(".logo");
    const $arrow = this.$target.querySelector(".arrow");
    const $bookmarkButton = this.$target.querySelector(".bookmark_button");
    if (this.$props.page === "detail") {
      $logo.style.display = "none";
      $bookmarkButton.style.color = "white";
    } else {
      $arrow.style.display = "none";
    }
    if (this.$props.page !== "category") {
      $bookmarkButton.style.display = "block";
    }
  }
  setEvent() {
    const pageMove = () => {
      const keyword = this.$target.querySelector(".header_input").value;
      history.pushState(
        { category: "전체", keyword: keyword },
        null,
        location.href.replace("category", "search")
      );
      history.go(0);
    };
    this.addEvent("click", ".logo", (e) => {
      e.preventDefault();
      history.pushState(
        { category: "전체", keyword: "" },
        null,
        location.origin + "#category"
      );
      history.go(0);
    });
    this.addEvent("click", ".bookmark_button", (e) => {
      e.preventDefault();
      history.pushState(null, null, location.origin + "#bookmark");
      history.go(0);
    });
    this.addEvent("click", ".arrow", (e) => {
      e.preventDefault();
      if (history.state && !history.state.category && !history.state.suggest){
        history.go(-1); //북마크 페이지, 최근 본 레시피, 추천요리에서 뒤로 가기
      }
      else if (history.state.suggest){
        history.go(-1);
        history.go(0);
      }
      else {
        history.pushState(
          {
            category: history.state.category,
            keyword: history.state.keyword,
            pagination: this.$props.pagination,
          },
          null,
          location.origin + "#search"
        );
        history.go(0);
      }
    });
    this.addEvent("click", ".header_input-button", (e) => {
      e.preventDefault();
      pageMove();
    });
    this.addEvent("keydown", ".header_input", (e) => {
      const code = e.code;
      if (code == "Enter") {
        pageMove();
      }
    });
  }
}
