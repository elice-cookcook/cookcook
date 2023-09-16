import Component from "../core/Component.js";

export default class Suggestion extends Component {
  constructor($target, recipes) {
    super($target, recipes);
  }
  template() {
    return `
      <style>
        .slide {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 5px;
          padding: 5px;
          width: 110px;
          height: 110px;
          position: relative;
          cursor: pointer;
        }
        .slide img {
          width: 100%;
          height: 100%;
        }
        .image-name {
          position: absolute;
          padding: 3px 0;
          top: 40%;
          width: 90%;
          font-size: 12px;
          font-weight: bold;
          background-color: rgba(227, 227, 227, 0.632);
          visibility: hidden;
          opacity:0;
          transition: top 0.3s, opacity 0.3s;
        }
        .slide:hover .image-name {
          visibility: visible;
          opacity: 1;
        }
        .image-name.long-text {
          top: 30%;
        }
      </style>
      ${this.$props
        .map((recipe,index) => `
          <div class="slide" key="${index}">
            <img src="${recipe.ATT_FILE_NO_MAIN}">
            <div class="image-name ${
              recipe.RCP_NM.length >= 10 ? "long-text" : ""
            }">${recipe.RCP_NM}</div>
          </div>
        `
        )
        .join("")}
    `;
  }

  setEvent() {
    // .slide를 클릭하면 해당 detailpage로 이동
    this.addEvent("click", ".slide", (e) => {
      const clickedIdx = e.target.getAttribute("key");
      const selectedItem = this.recipes[clickedIdx];
      
      // detail 페이지로 이동
      if (selectedItem) {
        history.pushState(
          { data: selectedItem, keyword: "" },
          null,
          location.href.replace("category", `detail/${selectedItem.RCP_SEQ}`)
        );
        history.go(0);
      }
    });
  }
}
