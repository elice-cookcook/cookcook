import Component from "../core/Component.js";
import Header from "../components/Header.js";
import RecipeItem from "../components/RecipeItem.js";
import Footer from "../components/Footer.js";

export default class BookmarkPage extends Component {
  template() {
    return /*html*/ `
    <style>
    .BookmarkPage {
        margin: 0 auto;
        border: 1px solid #eaeaea;
        width: 480px;
        flex-direction: column;
        align-items: center;
        word-break : keep-all;
    }

</style>

<div>
    <div class="BookmarkPage">
    <div id="header"></div>
    <div id="footer"></div>
</div></div>
    `;
  }
  async mounted() {
    const $header = this.$target.querySelector("#header");
    new Header($header, {
      page: "bookmark",
      category: "",
      keyword: history.state ? history.state.keyword : "",
    });
    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }
}
