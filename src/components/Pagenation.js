import Component from '../core/Component.js';

export default class Pagenation extends Component {
    template() {
      return `
      <style>
        #pagination li{
          margin-left: 16px;
        }
        #pagination .box a{
          border: none;
          border-radius: 4px;
          background-color:#f4f4f4;
          color:#000;
        }
        #pagination .active a{
          background-color:#f39c12;
          color:white;
        }
      </style>
      <nav id="pagination">
      <ul class="pagination space">
        <li class="page-item box">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true"><</span>
          </a>
        </li>
        <li class="page-item box active"><a class="page-link" href="#">1</a></li>
        <li class="page-item box"><a class="page-link" href="#">2</a></li>
        <li class="page-item box"><a class="page-link" href="#">3</a></li>
        <li class="page-item box"><a class="page-link" href="#">4</a></li>
        <li class="page-item box"><a class="page-link" href="#">5</a></li>
        <li class="page-item box">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">></span>
          </a>
        </li>
      </ul>
      </nav>
      `;
    }
  }