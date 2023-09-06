import Component from '../core/Component.js';

export default class Pagination extends Component {
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
      <nav id="pagination">
      <ul id="buttonContainer" class="pagination">
      </ul>
      </nav>
      `;
    }
    mounted(){
      const buttonContainer = this.$target.querySelector("#buttonContainer");

      const recipes = this.$props;
      const numberOfRecipe = recipes.length;
      const recipesPerPage = 4;
      const buttonsPerPage = 5;
      const requiredPage = Math.ceil(numberOfRecipe/recipesPerPage)
      const currentPage = 0;

      const renderButtons = () => {
        // 레시피 갯수에 맞는 페이지버튼 랜더링하는 함수
        // 클릭 막으려면 li에 .disabled 추가할것
        buttonContainer.innerHTML = "";
        buttonContainer.innerHTML += 
        `<li id="previousPage" class="page-item mx-2">
        <a class="page-link" href="#">
        <span aria-hidden="true"><</span>
        </a></li>`
        for(let i=0; i<buttonsPerPage && i<requiredPage; i++){
          buttonContainer.innerHTML += 
          `<li id="page${i}" class="page-item mx-2"><a class="page-link" href="#">${i+1}</a></li>`
        }
        buttonContainer.innerHTML += 
        `<li id="nextPage" class="page-item mx-2">
        <a class="page-link" href="#">
        <span aria-hidden="true">></span>
        </a></li>`
      }
      renderButtons();

      // 현재 페이지에 해당하는 버튼 활성화
      this.$target.querySelector(`#page${currentPage}`).classList.add("active");

      const renderPage = (page) => {

      }
    }
  }