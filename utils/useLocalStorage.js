const getLocalStorageData = (localStorageKey = "") =>
  localStorage.getItem(localStorageKey) === null
    ? []
    : JSON.parse(localStorage.getItem(localStorageKey));

const setLocalStorageData = (localStorageKey = "", setData = []) => {
  console.log(setData);
  localStorage.setItem(localStorageKey, JSON.stringify(setData));
};

export { getLocalStorageData, setLocalStorageData };
