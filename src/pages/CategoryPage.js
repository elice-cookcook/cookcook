import Component from '../core/Component.js';
import Header from '../components/Header.js';
import Navigator from '../components/Navigator.js';
import Filter from '../components/Filter.js';

export default class CategoryPage extends Component {
  template() {
    return `
      <style>
      .CategoryPage {
        width: 480px;
        left: 50%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      </style>
      <div class="CategoryPage">
        <div id="header"></div>
        <div id="nav"></div>
        <div id="filter"></div>   
      </div>   
    `;
  }

  mounted() {
    const $header = this.$target.querySelector("#header");
    const $nav = this.$target.querySelector("#nav");
    new Header($header, "category");
    new Navigator($nav);
    const $filter = this.$target.querySelector("#filter");
    new Filter($filter);
  }
}