import Component from "../core/Component.js";

export default class Navigator extends Component {
  template() {
    return /*html*/ `<style>
    .footer_container {
        width: 480px;
        background-color: #e0e0e0;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 8px;
    }

    .contact {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
    }

    .vr {
        width: 2px;
    }

.footer_link{
          cursor:pointer;

}

.footer_link:hover{
      font-weight:bold;
      color:darkgray;
}

</style>
<div class="footer_container py-2">
    <div class="contact mb-2">
        <span class="fs-6 fw-bold">Contact Us</span>
        <div class="vr"></div>
        <div class="footer_github footer_link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <span>elice-cookcook</span>
        </div>
        <div class="footer_email footer_link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
            <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
            <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
        </svg>
        <span>elicecookcook@gmail.com</span>
        </div>
    </div>
    <span class="text-black-50">본 저작물은 <span class="footer_link">식품의약품안전처 - 조리식품의 레시피 DB</span>를 사용했으며,</span>
    <span class="text-black-50"><span class="footer_link">네이버에서 제공한 나눔글꼴</span>이 적용되어 있습니다.</span>
</div>
    `;
  }
  mounted() {
    this.$target
      .querySelector(".footer_github")
      .addEventListener("click", () => {
        window.open("https://github.com/elice-cookcook/cookcook");
      });

    this.$target
      .querySelector(".footer_email")
      .addEventListener("click", () => {
        const emailUrl = `mailto:${"elicecookcook@gmail.com"}?subject=${""}&body=${""}`;
        const emailWindow = window.open(emailUrl, "_blank");
        if (!emailWindow)
          alert(
            "이메일 클라이언트를 열 수 없습니다. 팝업 차단기 설정을 확인하세요."
          );
      });
  }
}
