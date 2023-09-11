import Component from "../core/Component.js";
import api from "../api.js";
export default class LandingPage extends Component {
  template() {
    return `
      <style>
        *{
            margin: 0;
            padding: 0;
        }
        
        .SplashScreenContainer{
            width: 480px;
            height: 853px;
            margin: 0 auto;
            border: 1px solid #eaeaea;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background-color: #fffaf2;
        }
        
        .SplashScreenTitle{
            display: flex;
            justify-content: center;
            margin-top: 140px;
        }
        
        .SplashScreenTitle img{
            width: 90%;
        }
        
        .SplashScreenSlide{
            margin-top: 30px;
            overflow: hidden;
        }
        
        .SplashScreenSlide ul{
            list-style: none;
            white-space:nowrap;
            margin-left: 4px;
        }
        
        .SplashScreenListItem{
            display:inline-block;
            margin-right: 10px;
        }
        
        .SplashScreenListItem img{
            width: 100px;
        }
        
        .SplashScreenContainer .SplashScreenBelow{
            display: flex;
            justify-content: center;
            margin-top: 30px;
        }
        .spinner-border {
          width: 40px;
          height: 40px;
        }
      </style>
      <div class="SplashScreenContainer">
        <div class="SplashScreenTitle">
          <img src="./img/TitleLogo.png" alt="logo_image">
        </div>
        <div class="SplashScreenSlide">
          <ul>
              <li class="SplashScreenListItem"><img src="./img/bob.jpg"></li>
              <li class="SplashScreenListItem"><img src="./img/bob.jpg"></li>
              <li class="SplashScreenListItem"><img src="./img/bob.jpg"></li>
              <li class="SplashScreenListItem"><img src="./img/bob.jpg"></li>
              <li class="SplashScreenListItem"><img src="./img/bob.jpg"></li>
          </ul>
        </div>
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-warning my-5" role="status"></div>
        </div>
      </div>
      `;
  }
  mounted() {
    const dataLoad = async () => {
      try {
        const result = await api.fetchFoodAll();
        window.localStorage.setItem("recipes", JSON.stringify(result));
        history.pushState(
          { category: "전체", keyword: "" },
          null,
          location.href + "category"
        );
        history.go(0);
      } catch (error) {
        console.log(error);
      }
    };
    dataLoad();
  }
}
