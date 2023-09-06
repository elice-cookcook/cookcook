import Component from '../core/Component.js';
import ResultItem from "./ResultItem.js";

export default class Pagination extends Component {
    template() {
      return `
      <style>
      .pagination-container {
        display: flex;
        justify-content: center;
        margin-bottom:16px;
      }
      .page-button {
        border: none;
        border-radius: 4px;
        background-color: #f4f4f4;
        color: #000;
        margin: 0 5px;
        padding: 5px 10px;
        cursor: pointer;
      }
      .page-button.active {
        background-color: #f39c12;
        color: white;
      }
      </style>
      <div id="resultItemContainer"></div>
      <div class="pagination-container">
        <div class="buttonContainer">
        </div>
      </div>
      `;
    }

    mounted(){
      const resultItemContainer = this.$target.querySelector("#resultItemContainer");
      const buttonContainer = this.$target.querySelector(".buttonContainer");

      let recipes = this.$props;
      let currentPage = 0;
      const numberOfRecipe = recipes.length;
      const recipesPerPage = 4;
      const buttonsPerPage = 5;
      const requiredPage = Math.ceil(numberOfRecipe/recipesPerPage)

      // 페이지를 매개변수로 받고 버튼리스트를 렌더링하는 함수. 페이지는 0부터
      const renderButtons = (page) => {
        const startPage = Math.floor(page/5)*5;
        buttonContainer.innerHTML = "";

        const previousPageBtn = document.createElement("button");
        previousPageBtn.classList.add("page-button", "previousPage");
        previousPageBtn.innerText = "<";
        previousPageBtn.addEventListener('click', ()=>{handlePageBtnClick('prev')});
        buttonContainer.append(previousPageBtn);

        for(let i=startPage; i<startPage+buttonsPerPage && i<requiredPage; i++){
          const pageBtn = document.createElement("button");
          pageBtn.classList.add("page-button");
          pageBtn.id = `page${i}`;
          pageBtn.innerText = `${i+1}`;
          pageBtn.addEventListener('click', ()=>{handlePageBtnClick(i)});
          buttonContainer.append(pageBtn);
        }

        const nextPageBtn = document.createElement("button");
        nextPageBtn.classList.add("page-button", "nextPage");
        nextPageBtn.innerText = ">";
        nextPageBtn.addEventListener('click', ()=>{handlePageBtnClick('next')});
        buttonContainer.append(nextPageBtn);
      }

      // 페이지를 매개변수로 받고 레시피목록을 렌더링하는 함수. 페이지는 0부터
      const renderPage = (page) => {
        resultItemContainer.innerHTML="";
        const startRecipeNumber = page*recipesPerPage
        for(let i = startRecipeNumber; i<startRecipeNumber+recipesPerPage && i<numberOfRecipe; i++){
          const rcp = document.createElement("div");
          new ResultItem(rcp, recipes[i]);
          resultItemContainer.append(rcp);
        }
      }

      const handlePageBtnClick = (page) => {
        if(page === 'prev' && currentPage > 0){
          currentPage -= 1;
          renderButtons(currentPage);
          renderPage(currentPage);
        }
        else if(page === 'next' && currentPage < requiredPage){
          currentPage += 1
          renderButtons(currentPage);
          renderPage(currentPage);
        }
        else if(Number.isInteger(page)){
          currentPage = page;
          renderButtons(currentPage);
          renderPage(currentPage);
        }
        this.$target.querySelector(`#page${currentPage}`).classList.add("active");
      }

      renderButtons(currentPage);
      renderPage(currentPage);
      // 현재 페이지에 해당하는 버튼 활성화
      this.$target.querySelector(`#page${currentPage}`).classList.add("active");
    }

  }