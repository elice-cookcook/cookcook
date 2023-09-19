import Component from "../core/Component.js";
import Filter from "../components/Filter.js";
import Header from "../components/Header.js";
import Pagination from "../components/Pagination.js";
import Navigator from "../components/Navigator.js";
import SearchLogic from "../utils/SearchLogic.js";

export default class SearchPage extends Component {
  setup() {
    const category = history.state.category;
    const keyword = history.state.keyword;
    // this.$state 초기화
    this.$state = {
      category: category,
      keyword: keyword,
      items: SearchLogic(category, keyword), //categorypage에서 불러오면 추후 수정할 예정
    };

    // 로컬 스토리지에서 필터링된 데이터 가져오기
    let filteredData = localStorage.getItem("filteredData");

    // 로컬 스토리지에 필터링한 데이터가 있다면, 이를 파싱하여 items에 저장
    if (filteredData) {
      const storedCategory = localStorage.getItem("category");
      const storedKeyword = localStorage.getItem("keyword");

      // 현재의 category 및 keyword와 저장된 category 및 keyword 비교 후 일치하면 filteredData 사용
      if (storedCategory === category && storedKeyword === keyword) {
        this.$state.items = JSON.parse(filteredData);
        return;
      }
    }
  }

  template() {
    return /*html*/ `
    <style>
        .SearchPage {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .orange {
            color: orange;
        }

        .SearchPage_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        #filter {
          position: absolute;
          right: 0;
        }
    </style>
    <div class="SearchPage px-3">
        <div id="header"></div>
        <div id="nav"></div>
        <section class="SearchPage_top">
            <div id="filter"></div>
        </section>
        <div id="resultItemContainer"></div>
        <div id="paginationContainer"></div>
        </div>
  `;
  }

  mounted() {
    const $searchPageTop = this.$target.querySelector(".SearchPage_top");
    const $resultBlock = document.createElement("div");
    if (this.$state.items.length === 0) {
      const $resultItemContainer = document.querySelector(
        "#resultItemContainer"
      );
      const $emptyItem = document.createElement("div");
      $emptyItem.insertAdjacentHTML(
        "beforeend",
        `
        <div class="my-5">검색 결과가 없습니다.</div>
        `
      );
      $resultItemContainer.prepend($emptyItem);
    } else {
      $resultBlock.insertAdjacentHTML(
        "beforeend",
        `<span class="orange">${
          this.$state.items.length
        }</span> 개의 <span class="orange">
        ${this.$state.category} ${this.$state.keyword.length > 0 ? ">" : ""} ${
          this.$state.keyword
        }</span> 레시피가 있어요
        `
      );
      $searchPageTop.prepend($resultBlock);
      const $pagination = this.$target.querySelector("#paginationContainer");
      new Pagination($pagination, this.$state.items);
      const $filter = this.$target.querySelector("#filter");
      new Filter($filter, this.$state.items, (sortedItems) => {
        // Filter 컴포넌트에서 데이터가 정렬되면 이 콜백 함수를 호출하여 상태 업데이트
        this.setState({ items: sortedItems });
      });
    }
    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "search",
      category: history.state.category,
      keyword: history.state.keyword,
    });
    const $nav = this.$target.querySelector("#nav");
    new Navigator($nav);
  }
}
