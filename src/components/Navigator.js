import Component from "../core/Component.js";

export default class Navigator extends Component {
  template() {
    return `
        <style>
          .nav_container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
            color: #7f7f7f;
          }
          hr {
            border-top: 2px solid #5d5d5d;
          }
          .nav_selected {
            color: #f39c12;
            font-weight: bold;
          }
        </style>
        <div class="nav_container mt-2 px-3">
          <div class="nav_selected">전체</div>
          <div>국</div>
          <div>밥</div>
          <div>반찬</div>
          <div>일품</div>
          <div>후식</div>
          <div>기타</div>
        </div>
        <hr class="hr my-2" />
    `;
  }
}
