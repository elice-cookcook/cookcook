import Component from '../core/Component.js';

export default class Recommend extends Component {
  template() {
    const foodList = this.$props.foodList || [];
    
    return `
      <style>
        .slide {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 5px;
          padding: 5px;
          width: 90px;
          height: 100px;
          position: relative;
        }
        .slide img {
          width: 100%;
          height: 100%;
        }
        .image-name {
          position: absolute;
          padding: 3px 0;
          top: 40%;
          width: 90%;
          font-size: 12px;
          font-weight: bold;
          background-color: rgba(227, 227, 227, 0.632);
          visibility: hidden;
          opacity:0;
          transition: top 0.3s, opacity 0.3s;
        }
        .slide:hover .image-name {
          visibility: visible;
          opacity: 1;
        }
        .image-name.long-text {
          top: 30%;
        }
        .slider-btn {
          cursor: pointer;
          font-size: 60px;
          height: 100px;
          margin: 0 5px;
          color: grey;
        }
      </style>

      <div class="slider-btn" id="prevBtn">&#8249;</div>

      ${foodList.map((food, index) => `
        <div class="slide" key="${index}">
          <img src="${food.imgUrl}" alt="${food.name}">
          <div class="image-name ${food.name.length >= 10 ? 'long-text' : ''}">${food.name}</div>
        </div>
      `).join('')}

      <div class="slider-btn" id="nextBtn">&#8250;</div>
    `;
  }
}