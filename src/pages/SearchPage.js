import Component from '../core/Component.js';
import Filter from '../components/filter.js';

export default class SearchPage extends Component {
  template() {
    return `
      <h1>Search Page</h1>
      <div id="filter"></div>      
    `;
  }

  mounted() {
    const $filter = this.$target.querySelector("#filter");
    new Filter($filter);
  }
}