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
        }
        .slide img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .image-name {
          position: absolute;
          padding: 3px 0;
          bottom: 5px;
          width: 110px;
          font-size: 12px;
          font-weight: bold;
          background-color: rgba(227, 227, 227, 0.632);
          cursor: pointer;
          line-height: 1.2em;
        }
        .image-name.long-text {
          word-break: break-all;
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
      const clickedElem = e.target.closest(".slide");
      const clickedIdx = clickedElem.getAttribute("key");
      const selectedItem = this.$props[clickedIdx];
      
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
