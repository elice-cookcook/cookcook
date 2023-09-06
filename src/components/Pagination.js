import Component from '../core/Component.js';
import ResultItem from "./ResultItem.js";

export default class Pagination extends Component {
    setup(){
      // [현재 페이지, 레시피객체 배열]
      this.$state = [0, []];
    }

    template() {
      return `
      <style>
        #pagination .page-item a{
          border: none;
          border-radius: 4px;
          background-color:#f4f4f4;
          color:#000;
        }
        #pagination .active a{
          background-color:#f39c12;
          color:white;
        }
      </style>
      <div id="resultItemContainer"></div>
      <div class="d-flex justify-content-center">
      <nav id="pagination" class="justify-content-center">
      <ul id="buttonContainer" class="pagination">
      </ul>
      </nav>
      </div>
      `;
    }

    mounted(){
      const buttonContainer = this.$target.querySelector("#buttonContainer");
      const resultItemContainer = this.$target.querySelector("#resultItemContainer");

      this.$state[1] = this.$props;
      this.$state[0] = 0;
      const numberOfRecipe = this.$state[1].length;
      const recipesPerPage = 4;
      const buttonsPerPage = 5;
      const requiredPage = Math.ceil(numberOfRecipe/recipesPerPage)

      // 페이지를 매개변수로 받고 버튼리스트를 렌더링하는 함수. 페이지는 0부터
      const renderButtons = (currentPage) => {
        const startPage = Math.floor(currentPage/5)*5;
        buttonContainer.innerHTML = "";
        buttonContainer.innerHTML += 
        `<li id="previousPage" class="page-item mx-2">
        <a class="page-link" href="#">
        <span aria-hidden="true"><</span>
        </a></li>`
        for(let i=startPage; i<startPage+buttonsPerPage && i<requiredPage; i++){
          buttonContainer.innerHTML += 
          `<li id="page${i}" class="page-item mx-2"><a class="page-link" href="#">${i+1}</a></li>`
        }
        buttonContainer.innerHTML += 
        `<li id="nextPage" class="page-item mx-2">
        <a class="page-link" href="#">
        <span aria-hidden="true">></span>
        </a></li>`
      }

      // 페이지를 매개변수로 받고 레시피목록을 렌더링하는 함수. 페이지는 0부터
      const renderPage = (page) => {
        resultItemContainer.innerHTML="";
        const startRecipeNumber = page*recipesPerPage
        for(let i = startRecipeNumber; i<startRecipeNumber+recipesPerPage && i<numberOfRecipe; i++){
          const rcp = document.createElement("div");
          new ResultItem(rcp, this.$state[1][i]);
          resultItemContainer.append(rcp);
        }
      }

      renderButtons(0);
      renderPage(0);
      // 현재 페이지에 해당하는 버튼 활성화
      this.$target.querySelector(`#page${this.$state[0]}`).classList.add("active");
    }
  }