import Component from "../core/Component.js";

export default class Slide extends Component {
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
