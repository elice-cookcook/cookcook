import Component from "../core/Component.js";

export default class Filter extends Component {
  setup() {
    this.$state = {
      listVisible: false,
    };
  }
  constructor($target, items, onSort) {
    super($target);
    this.items = items;
    this.onSort = onSort; //콜백함수 저장
  }
  template() {
    const { listVisible } = this.$state;

    return `
      <style>
        img { 
          width: 28px; 
          height: 28px; 
          float: right; 
          padding: 5px;
        }
        ul { 
          float: right; 
          list-style: none; 
          padding: 5px 0;
        }
        li { 
          border: 1px solid #ff9c00;
          box-shadow: 0px 0px 0px 1px #ff9c00;
          background-color: #eaeaea !important;
        }
      </style> 
      <img src = "./img/filter.png">
      ${
        listVisible
          ? `
        <ul>
          <li data-sort="nameAsc">👨‍🍳 이름 오름차순</li>
          <li data-sort="nameDesc">👩‍🍳 이름 내림차순</li>
          <li data-sort="caloriesLow">👨‍🍳 열량 낮은순</li>
          <li data-sort="caloriesHigh">👩‍🍳 열량 높은순</li>
        </ul>
        `
          : ""
      }
    `;
  }

  setEvent() {
    this.addEvent("click", "img", this.toggleListVisibility.bind(this));

    this.addEvent("click", "li", (e) => {
      const sortType = e.target.dataset.sort; // 클릭된 li의 data-sort 속성 값
      this.sortData(sortType); // 데이터 정렬 함수 호출
    });
  }

  // img를 클릭하면 목록이 보이는 메서드
  toggleListVisibility() {
    this.setState({ listVisible: !this.$state.listVisible });
  }

  sortData(sortType) {
    const { items } = this;
    let sortedItems = [...items]; // 새 변수에 items 복사

    // sortType에 따라 데이터 정렬
    if (sortType === "nameAsc") {
      sortedItems.sort((a, b) => a.RCP_NM.localeCompare(b.RCP_NM, "ko-KR"));
      // console.log(sortedItems);
    } else if (sortType === "nameDesc") {
      sortedItems.sort((a, b) => b.RCP_NM.localeCompare(a.RCP_NM, "ko-KR"));
      // console.log(sortedItems);
    } else if (sortType === "caloriesLow") {
      sortedItems.sort((a, b) => parseInt(a.INFO_ENG) - parseInt(b.INFO_ENG));
      // console.log(sortedItems);
    } else if (sortType === "caloriesHigh") {
      sortedItems.sort((a, b) => parseInt(b.INFO_ENG) - parseInt(a.INFO_ENG));
      // console.log(sortedItems);
    }

    // 필터링 및 정렬된 데이터를 로컬 스토리지에 저장
    localStorage.setItem("filteredData", JSON.stringify(sortedItems));
    // 부모 컴포넌트로 정렬된 데이터 전달
    this.onSort(sortedItems);
  }
}
