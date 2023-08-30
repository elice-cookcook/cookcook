import Component from '../core/Component.js';
import Header from '../components/Header.js';
import Navigator from '../components/Navigator.js';
import Filter from '../components/filter.js';

export default class CategoryPage extends Component {
  template() {
    return `
        <h1>Main Page</h1>
        <div id="header"></div>
        <div id="nav"></div>
        <div id="filter"></div>      
    `;
  }

  mounted() {
    const $header = this.$target.querySelector("#header");
    const $nav = this.$target.querySelector("#nav");
    new Header($header);
    new Navigator($nav);
    const $filter = this.$target.querySelector("#filter");
    new Filter($filter);
  }
}