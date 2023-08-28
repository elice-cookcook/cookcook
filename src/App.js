import Router from "./Router.js";
import Component from "./core/Component.js";
import createPages from "./pages/index.js";

export default class App extends Component {
  template() {
    return `
    <main></main>
    `;
  }

  mounted() {
    const $main = this.$target.querySelector("main");
    const pages = createPages($main);

    const router = new Router($main);
    router.addRoute("#/", pages.landing);
    router.addRoute("#/category", pages.category);
    router.addRoute("#/search", pages.search);
    router.addRoute("#/detail", pages.detail);
    router.start();
  }
}
