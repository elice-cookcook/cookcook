export default function SearchLogic() {
  const resultItems = [];
  const category = history.state.category;
  const keyword = history.state.keyword;
  const storage = window.localStorage;
  const data = JSON.parse(storage.getItem("recipes"));

  const allSearch = () => {
    data.forEach((item) => {
        resultItems.push(item);
    });
  };
  const categorySearch = () => {
    data.forEach((item) => {
      item.RCP_PAT2.includes(category) ? resultItems.push(item) : null;
    });
  };
  const keywordSearch = () => {
    data.forEach((item) => {
      item.RCP_NM.includes(keyword) ? resultItems.push(item) : null;
    });
  };
  const categoryAndKeywordSearch = () => {
    data.forEach((item) => {
      item.RCP_PAT2.includes(category) && item.RCP_NM.includes(keyword)
        ? resultItems.push(item)
        : null;
    });
  };

  if (category === "전체") {
    if (keyword === "") allSearch();
    else keywordSearch();
  } else {
    if (keyword === "") categorySearch();
    else categoryAndKeywordSearch();
  }

  return resultItems;
}
