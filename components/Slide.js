import Component from "../core/Component.js";

export default class Slide extends Component {
  template() {
    return /*html*/ `
      <style>
        .slide {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 0 10px;
          width: 120px;
          height: 120px;
          cursor: pointer;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-name {
          position: absolute;
          padding: 3px 0; 
          bottom: 5px;
          width: 120px;
          font-size: 14px;
          font-weight: bold;
          background-color: rgba(227, 227, 227, 0.632);
          line-height: 1.2em;
        }
      </style>
       `;
  }

  mounted() {
    const slide = this.$target;
    this.$props.forEach((item, idx) => {
      console.log(item);
      const slideItem = /*html*/ `
         <div class="slide" key="${idx}">
           <img src="${item.imgUrl}" alt="${item.name}">
           <span class="image-name">${item.name}</span>
         </div>
       `;
      slide.innerHTML += slideItem;
    });
  }
}
