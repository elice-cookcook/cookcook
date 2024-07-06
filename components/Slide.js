import Component from "../core/Component.js";

export default class Slide extends Component {
  constructor($target, $props, isSuggest = 0) {
    super($target, $props);
    this.isSuggest = isSuggest;
  }

  setEvent() {
    this.addEvent("click", ".slide", (e) => {
      if (selectedItem) {
        history.pushState(
          this.isSuggest
            ? { data: selectedItem, keyword: "", suggest: true }
            : { data: selectedItem, keyword: "" },
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
          this.isSuggest
            ? { data: item, keyword: "", suggest: true }
            : { data: item, keyword: "" },
          null,
          location.href.replace("category", `detail/${item.RCP_SEQ}`)
        );
        history.go(0);
      };
      const slideItem = document.createElement("div");
      slideItem.className = "slide";
      slideItem.addEventListener("click", goDetail);
      slideItem.insertAdjacentHTML(
        "beforeend",
        `
           <img src="${item.ATT_FILE_NO_MAIN}" alt="${item.RCP_NM}">
           <span class="image-name">${item.RCP_NM}</span>
       `
      );
      slideContainer.append(slideItem);
    });
  }
}
