import Component from "../core/Component.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import BookmarkItem from "../components/BookmarkItem.js";

export default class BookmarkPage extends Component {
  setup() {
    const bookmark =
      localStorage.getItem("bookmark") === null
        ? []
        : JSON.parse(localStorage.getItem("bookmark"));
    this.setState({
      toggleCheck: false,
      data: bookmark,
    });
  }
  template() {
    return /*html*/ `<style>
    .BookmarkPage {
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width: 480px;
        flex-direction: column;
        align-items: center;
        word-break: keep-all;
        display: flex;
        min-height: 100%;
    }

    .orange {
        color: orange;
    }

    .BookmarkPage_top {
        width: 100%;
        display:flex;
        padding : 0.5rem 0.5rem 0.3rem 0.5rem;
        justify-content:space-between;
    }

    .BookmarkPage_checkedNum{
      font-size:12px;
    }

    .BookmarkPage_top > div >.btn {
      --bs-btn-padding-y: .25rem; 
      --bs-btn-padding-x: .5rem; 
      --bs-btn-font-size: .75rem;
    }

    .BookmarkContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;     
        gap:0.2rem;
    }

</style>
<div class="BookmarkPage px-3">
    <div id="header"></div>
    <div id="nav"></div>
    <div class="BookmarkPage_top">
        <span class="orange">찜 목록 &nbsp;>&nbsp; ${this.$state.data.length}개의 레시피가 있어요.</span>
        <div>
        <span class="BookmarkPage_checkedNum orange mx-1">2개 선택</span>
        <span class="BookmarkPage_deleteBtn btn btn-outline-warning">삭제</span>
        <span class="BookmarkPage_checkeBtn btn btn-outline-warning" data-bs-toggle="button">선택</span>
        </div>
        </div>
    <div class="BookmarkContainer"></div>
<div id="footer"></div>
</div>
    `;
  }
  async mounted() {
    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "bookmark",
      category: "",
      keyword: history.state ? history.state.keyword : "",
    });

    const checkdNum = this.$target.querySelector(".BookmarkPage_checkedNum");
    const toggleBtn = this.$target.querySelector(".BookmarkPage_checkeBtn");
    const deleteBtn = this.$target.querySelector(".BookmarkPage_deleteBtn");

    if (this.$state.toggleCheck) {
      toggleBtn.classList.add("active");
      toggleBtn.innerHTML = "취소";
      deleteBtn.style.display = "";
      checkdNum.style.display = "";
    } else {
      toggleBtn.classList.remove("active");
      toggleBtn.innerHTML = "선택";
      deleteBtn.style.display = "none";
      checkdNum.style.display = "none";
    }

    deleteBtn.addEventListener("click", () => {
      if (confirm(`2개의 레시피가 삭제됩니다.`)) this.setup();
    });

    toggleBtn.addEventListener(
      "click",
      function () {
        let isSelected = this.$state.toggleCheck;
        this.setState({ toggleCheck: !isSelected, data: this.$state.data });
      }.bind(this)
    );

    const bookmarkContainer = this.$target.querySelector(".BookmarkContainer");
    this.$state.data.forEach((item) => {
      const div = document.createElement("div");
      new BookmarkItem(div, item, this.$state.toggleCheck);
      bookmarkContainer.append(div);
    });
    const plus = document.createElement("div");
    bookmarkContainer.append(plus);

    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
