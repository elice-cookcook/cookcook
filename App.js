import Router from "./Router.js";
import Component from "./core/Component.js";
import createPages from "./pages/index.js";
import Footer from "./components/Footer.js";

export default class App extends Component {
  template() /*html*/ {
    return `
    <main>

    </main>
    <footer></footer>
    `;
  }

  mounted() {
    const $main = this.$target.querySelector("main");
    const pages = createPages($main);
    const id = [...Array(3367).keys()].map((i) => i); // 추후 데이터 불러온 뒤 데이터 id 배열로 교체 필요(임시로 0~9까지 넣어 두었습니다.)

    const router = new Router($main);
    router.addRoute("#", pages.landing);
    router.addRoute("#category", pages.category);
    router.addRoute("#search", pages.search);
    router.addRoute("#temp", pages.temp);
    router.addRoute("#bookmark", pages.bookmark);
    id.forEach((item) => router.addRoute(`#detail/${item}`, pages.detail));
    router.start();

    new Footer(this.$target.querySelector("footer"));
  }
}
