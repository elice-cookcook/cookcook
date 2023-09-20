import Component from "../core/Component.js";

export default class Slide extends Component {
  template() {
    return /*html*/ `
      <style>
        .slide {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 0 10px;
          width: 120px;
          height: 120px;
          cursor: pointer;
          position: relative;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-name {
          position: absolute;
          padding: 3px 0; 
          bottom: 5px;
          width: 120px;
          font-size: 14px;
          font-weight: bold;
          background-color: rgba(227, 227, 227, 0.632);
          line-height: 1.2em;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      </style>
       `;
  }
  setEvent() {
    this.addEvent("click", ".slide", (e) => {
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
  mounted() {
    const slideContainer = this.$target;

    this.$props.forEach((item) => {
      const goDetail = () => {
        history.pushState(
          { data: item, keyword: "" },
          null,
          location.href.replace("category", `detail/${item.RCP_SEQ}`)
        );
        history.go(0);
      };
      const slideItem = document.createElement("div");
      slideItem.className = "slide";
      slideItem.addEventListener("click", goDetail);
      slideItem.innerHTML = /*html*/ `
           <img src="${item.ATT_FILE_NO_MAIN}" alt="${item.RCP_NM}">
           <span class="image-name">${item.RCP_NM}</span>
       `;
      slideContainer.append(slideItem);
    });
  }
}
