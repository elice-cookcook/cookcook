import LandingPage from "./LandingPage.js";
import CategoryPage from "./CategoryPage.js";
import SearchPage from "./SearchPage.js";
import DetailPage from "./DetailPage.js";
import TempPage from "./TempPage.js";

export default (main) => {
  const landing = () => new LandingPage(main);
  const category = () => new CategoryPage(main);
  const search = () => new SearchPage(main);
  const detail = () => new DetailPage(main);
  const temp = () => new TempPage(main);

  return {
    landing,
    category,
    search,
    detail,
    temp,
  };
};
