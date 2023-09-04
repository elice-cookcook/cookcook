const keyID = "f7be7011ace14af396ee";
const request = async (url) => {
  try {
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
    }
  } catch (error) {
    console.log(error);
    return { data: null };
  }
};

const api = {
  fetchFoodAll: () => {
    return request(
      `http://openapi.foodsafetykorea.go.kr/api/${keyID}/COOKRCP01/json/1/1000`
    );
  },
};

export default api;
