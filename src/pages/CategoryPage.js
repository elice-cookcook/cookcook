import Component from '../core/Component.js';
import Header from '../components/Header.js';
import Navigator from '../components/Navigator.js';

export default class CategoryPage extends Component {
  template() {
    return `
        <h1>Main Page</h1>
        <div id="header"></div>
        <div id="nav"></div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector("#header");
    const $nav = this.$target.querySelector("#nav");
    new Header($header);
    new Navigator($nav);
  }
}