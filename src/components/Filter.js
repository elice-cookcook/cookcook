import Component from '../core/Component.js';

export default class Filter extends Component {
  template() {
    return `
      <style>
        img { 
          width: 28px; 
          height: 28px; 
          float: right; 
          padding: 5px;
        }
      </style> 
      <img src = "./img/filter.png">
    `;
  }
}
