import Component from "../core/Component.js";
import Header from "../components/Header.js";
import BookmarkItem from "../components/BookmarkItem.js";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/useLocalStorage.js";

export default class BookmarkPage extends Component {
  setup() {
    const bookmark =
      getLocalStorageData("bookmark") === null
        ? []
        : getLocalStorageData("bookmark");

    this.setState({
      toggleCheck: false,
      data: bookmark,
    });

    setLocalStorageData("deleteTargets", []);
    this.targetNum = 0;
  }
  template() {
    return /*html*/ `
<div class="BookmarkPage px-3">
    <div id="header"></div>
    <div class="BookmarkPage_top">
        <span class="orange">북마크 목록 &nbsp;>&nbsp; ${this.$state.data.length}개의 레시피가 있어요.</span>
        <div>
        <span class="BookmarkPage_checkedNum orange mx-1">${this.targetNum}개 선택</span>
        <span class="BookmarkPage_deleteBtn btn btn-outline-warning">삭제</span>
        <span class="BookmarkPage_checkeBtn btn btn-outline-warning" data-bs-toggle="button">선택</span>
        </div>
        </div>
    <div class="BookmarkContainer"></div>
    <div class="BookmarkIsNullContainer">
    <p>북마크에 추가된 레시피가 없어요.</p>
    <p>아래 버튼을 눌러, 레시피를 구경하고 북마크에 추가해보세요!</p>
    <div class="BookmarkPage_goSearchBtn btn btn-warning">GO SEARCH →</div>
    </div>
<div id="footer"></div>
</div>
    `;
  }
  setDeleteTargetNum = (num) => {
    this.$target.querySelector(
      ".BookmarkPage_checkedNum"
    ).innerHTML = `${num}개 선택`;
  };
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
      if (confirm(`${this.targetNum}개의 레시피가 삭제됩니다.`)) {
        const deleteTargets = getLocalStorageData("deleteTargets");
        let bookmark = getLocalStorageData("bookmark");
        for (const id of deleteTargets)
          bookmark = bookmark.filter((item) => item.RCP_SEQ !== id);
        setLocalStorageData("bookmark", bookmark);
        this.setup();
      }
    });

    toggleBtn.addEventListener(
      "click",
      function () {
        let isSelected = this.$state.toggleCheck;
        this.setState({
          toggleCheck: !isSelected,
          data: this.$state.data,
        });
      }.bind(this)
    );
    const bookmarkIsNullContainer = this.$target.querySelector(
      ".BookmarkIsNullContainer"
    );
    const bookmarkContainer = this.$target.querySelector(".BookmarkContainer");

    if (this.$state.data.length === 0) {
      this.$target.querySelector(".BookmarkPage_checkeBtn").style.display =
        "none";
      this.$target
        .querySelector(".BookmarkPage_goSearchBtn")
        .addEventListener("click", () => {
          history.pushState(
            { category: "전체", keyword: "" },
            null,
            location.href.replace("bookmark", "search")
          );
          history.go(0);
        });
    } else {
      bookmarkIsNullContainer.style.display = "none";
      this.$state.data.forEach((item) => {
        const div = document.createElement("div");
        new BookmarkItem(div, item, this.$state.toggleCheck);
        bookmarkContainer.append(div);
      });
    }

    const checkboxes = document.querySelectorAll(".BookmarkItem input");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", () => {
        checkbox.checked ? this.targetNum++ : this.targetNum--;
        this.$target.querySelector(
          ".BookmarkPage_checkedNum"
        ).innerHTML = `${this.targetNum}개 선택`;
      });
    });
  }
}
