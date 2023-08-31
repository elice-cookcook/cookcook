import Component from '../core/Component.js';
import Header from '../components/Header.js';
import Navigator from '../components/Navigator.js';
<<<<<<< HEAD
import Filter from '../components/filter.js';
=======
import Filter from '../components/Filter.js';
>>>>>>> 96240bc8952ab074c474a99205d94f9e3fd22619

export default class CategoryPage extends Component {
  template() {
    return `
        <h1>Main Page</h1>
        <div id="header"></div>
        <div id="nav"></div>
<<<<<<< HEAD
        <div id="filter"></div>
=======
        <div id="filter"></div>      
>>>>>>> 96240bc8952ab074c474a99205d94f9e3fd22619
    `;
  }

  mounted() {
    const $header = this.$target.querySelector("#header");
    const $nav = this.$target.querySelector("#nav");
    const $filter = this.$target.querySelector("#filter");
    new Header($header);
    new Navigator($nav);
<<<<<<< HEAD
=======
    const $filter = this.$target.querySelector("#filter");
>>>>>>> 96240bc8952ab074c474a99205d94f9e3fd22619
    new Filter($filter);
  }
}