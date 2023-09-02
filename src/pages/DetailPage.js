import Component from '../core/Component.js';
import Header from '../components/Header.js';
import Navigator from '../components/Navigator.js';
import Footer from '../components/Footer.js';
export default class DetailPage extends Component {
  template() {
    return `
      <style>
      .DetailPage {
        width: 480px;
        left: 50%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      </style>
      <div class="DetailPage">
        <div id="header"></div>
        <div id="nav"></div>
        <div id="footer"></div>
      </div> 
    `;
  }
  mounted() {
    const $header = this.$target.querySelector("#header");
    const $nav = this.$target.querySelector("#nav");
    new Header($header, "detail");
    new Navigator($nav);
    const $footer = this.$target.querySelector("#footer");
    new Footer($footer);
  }

}

