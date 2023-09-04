const keyID = "f7be7011ace14af396ee";
// const request = async (url) => {
//   try {
//     let result = await fetch(url)
//       .catch()
//       .then((res) => res.json())
//       .then((data) => data["COOKRCP01"]["row"]);
//     return result;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
const request = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data["COOKRCP01"]["row"] ?? null;
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
};
// 한번에 호출가능한 api 갯수가 1000개이므로, 시작위치 : 1, 종료위치 : 1001으로 설정함
const api = {
  // 전체 데이터 받아옴
  fetchFoodAll: () => {
    return request(
      `http://openapi.foodsafetykorea.go.kr/api/${keyID}/COOKRCP01/json/1/1001`
    );
  },
  // 해당 카테고리 데이터 받아옴
  fetchFoodByCategory: (caregory) => {
    return request(
      `http://openapi.foodsafetykorea.go.kr/api/${keyID}/COOKRCP01/json/1/1001/RCP_PAT2=${caregory}`
    );
  },
  // 이름에 헤당 키워드가 포함되는 데이터 받아옴
  fetchFoodByKeyword: (keyword) => {
    return request(
      `http://openapi.foodsafetykorea.go.kr/api/${keyID}/COOKRCP01/json/1/1001/RCP_NM=${keyword}`
    );
  },
  // 해당 카테고리이면서 이름에 해당 키워드가 포함되는 데이터 받아옴
  fetchFoodByCategoryAndKeyword: (category, keyword) => {
    return request(
      `http://openapi.foodsafetykorea.go.kr/api/${keyID}/COOKRCP01/json/1/1001/RCP_PAT2=${category}&RCP_NM=${keyword}`
    );
  },
  // 해당 id를 RCP_SEQ로 갖는 데이터 받아옴
  fetchFoodById: async (id) => {
    const data = await api.fetchFoodAll();
    return Object.values(data).find((v) => v["RCP_SEQ"] === `${id}`);
  },

  // 데이터 중 특정 카테고리만 필터링함
  filterByCategory: (data, category) => {
    // data는 filter를 적용할 객체
    return Object.values(data).filter((v) => v["RCP_PAT2"] === `${category}`);
  },

  // 데이터 중 특정 키워드만 필터링함
  filterByKeyword: (data, keyword) => {
    // data는 filter를 적용할 객체
    return Object.values(data).filter((v) => v["RCP_NM"].includes(keyword));
  },
};

export default api;
