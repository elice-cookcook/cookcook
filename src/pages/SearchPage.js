import ResultItem from "../components/ResultItem.js";
import Component from "../core/Component.js";
import Filter from "../components/Filter.js";
import Header from "../components/Header.js";
import Pagination from "../components/Pagination.js";
import Navigator from "../components/Navigator.js";
import Footer from "../components/Footer.js";
import api from "../api.js";

export default class SearchPage extends Component {
  setup() {
    console.log("history", history);
    const category = history.state.category;
    const keyword = history.state.keyword;
    this.$state = { category: category, keyword: keyword, items: [] };
  }

  template() {
    return /*html*/ `
    <style>
      .SearchPage{
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width:480px;
        left:50%;
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      .orange {
        color:orange;
      }
      .SearchPage_top{
        width:100%;
        display:flex;
        justify-content:space-between;
      }
    </style>
      <div class="SearchPage px-3">
      <div id="header"></div>
      <div id="nav"></div>
      <section class="SearchPage_top">
      <div id="filter"></div>
      </section>
      <div class="spinner-border my-5" role="status"></div>
      <div id="resultItemContainer"></div>
      <div id="paginationContainer"></div>
      <div id="footer"></footer>
      </div>
  `;
  }

  mounted() {
    const fetchFunc = async (type) => {
      let result;
      switch (type) {
        case "all": {
          result = await api.fetchFoodAll();
          break;
        }
        case "keyword": {
          result = await api.fetchFoodByKeyword(this.$state.keyword);
          break;
        }
        case "category": {
          result = await api.fetchFoodByCategory(this.$state.category);
          break;
        }
        default: {
          result = await api.fetchFoodByCategoryAndKeyword(
            this.$state.category,
            this.$state.keyword
          );
        }
      }
      if (result) {
        await result.forEach((item) => this.$state.items.push(item));
      } else {
        console.log("error");
      }
      await this.$state.items.forEach((obj) => {
        const item = document.createElement("div");
        new ResultItem(item, obj);
        resultItemContainer.append(item);
      });

      const spinner = document.querySelector(".spinner-border");
      spinner.remove();

      const $searchPageTop = this.$target.querySelector(".SearchPage_top");
      const $resultBlock = document.createElement("div");
      $resultBlock.insertAdjacentHTML(
        "beforeend",
        `
        <span class="orange">${this.$state.items.length}</span>개의 <span class="orange">${this.$state.category} > ${this.$state.keyword}</span> 레시피가 있어요
      `
      );
      $searchPageTop.prepend($resultBlock);

      const $pagination = this.$target.querySelector("#paginationContainer");
      new Pagination($pagination);
      const $filter = this.$target.querySelector("#filter");
      new Filter($filter);
    };
    if (this.$state.category === "전체") {
      if (this.$state.keyword === "") fetchFunc("all");
      else fetchFunc("keyword");
    } else {
      if (this.$state.keyword === "") fetchFunc("category");
      else fetchFunc();
    }

    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "search",
      category: history.state.category,
      keyword: history.state.keyword,
    });
    const $nav = this.$target.querySelector("#nav");
    new Navigator($nav);

    const resultItemContainer = this.$target.querySelector(
      "#resultItemContainer"
    );

    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
