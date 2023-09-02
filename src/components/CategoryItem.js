import Component from '../core/Component.js';

export default class Navigator extends Component {
  template() {
    const category = ['soup', 'rice', 'onedish', 'sidedish', 'dessert', 'etc'];
    const categoryName = ['국/찌개', '밥', '일품', '반찬', '후식', '기타'];

    return `
        <style>
          .category_container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
          }
          .category_items {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
          .img_box {
            background-color: #ffdca4;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
          }
          .category_img {
            width: 100px;
          }
          hr {
            border-top: 2px solid #5d5d5d;
            width: 410px;
            margin: 0 auto;
          }
        </style>
        <div class="category_container">
          <div class="category_items px-4">
            ${category.map((item, idx) => `
                <div class="category_container mb-2">
                    <div class="img_box">
                        <img class="category_img" src="./img/${item}.png">
                    </div>
                    <div>${categoryName[idx]}</div>
                </div>
            `).join('')}
          </div>
        </div>
        <hr class="hr mt-2 mb-3" />
    `;
  }
}