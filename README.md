# 오늘 뭐먹지?
공공 데이터 활용 레시피 조회 웹 어플리케이션
- 외부 프레임워크, 데이터베이스를 사용하지 않고 바닐라 자바스크립트로만 개발한 프로젝트 

## 프로젝트 진행 기간
- 2023년 8월 21일 ~ 9월 22일

## 팀원 구성 및 역할
| 이름   | 담당 업무                     |
| ------ | ---------------------------- |
| 윤보영 | 팀장, 메인페이지, 헤더, 푸터 |
| 이선우 | 오늘의 추천요리, 최근 본 레시피, 필터링 기능 |
| 장보근 | 스플래시 스크린, 레시피 인쇄 기능, 페이지네이션 기능 |
| 최정윤 | 레시피 조회 페이지, 레시피 상세 페이지, 북마크 기능 및 페이지 |

## 프로젝트 개발 환경 
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)


## 활용 API 
식품 의약품 안전처 제공 - 조리식품의 레시피 DB 
: https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=COOKRCP01


## 프로젝트 배포 링크 
https://cookcook.netlify.app/


## 프로젝트 실행 화면
<table>
  <tbody>
    <tr>
      <td align="center"><img height="350" alt="image1" src="https://github.com/elice-cookcook/cookcook/assets/33516975/6b7706e8-c94a-4bcf-b355-f27a7d9b17b2"/><img height="350" alt="image1" src="https://github.com/elice-cookcook/cookcook/assets/33516975/76ce3d3e-f777-4d0d-9451-a1158bde87d5"/><br/><sub><b>스플래시 스크린 / 메인페이지 </b><br/>공공 DB로부터 데이터를 받아와서<br/> 로컬스토리지에 저장 후 메인페이지로 이동<br/>상단- 검색창 & 북마크 페이지 버튼 <br/>카테고리 선택 섹션 / 오늘의 추천요리 (랜덤) / 최근 본 레시피 </sub><br/></td>
    <tr/>
      <tr><td align="center"><img height="350" alt="image2" src="https://github.com/elice-cookcook/cookcook/assets/33516975/95e8f93e-4692-4c47-aa5e-71a9ff1eccb0"/><img height="350" alt="image3" src="https://github.com/elice-cookcook/cookcook/assets/33516975/330eb91a-abb3-42f9-abf7-67a0d66c1664"/><img height="350" alt="image4" src="https://github.com/elice-cookcook/cookcook/assets/33516975/41e930b3-4528-434e-85cc-d8029d5ddb9c"/><br/><sub><b>레시피 리스트 페이지 </b><br/>상단 탭의 카테고리 별 레시피 확인 / 특정 재료가 들어간 레시피 확인 / 특정 메뉴 레시피 확인 </sub><br /></td></tr>
     <tr>
<td align="center"><img height="350" alt="image2" src="https://github.com/elice-cookcook/cookcook/assets/33516975/bd503b30-05c9-42e2-8623-fc69fd900427"/><img height="350" alt="image3" src="https://github.com/elice-cookcook/cookcook/assets/33516975/ac6fbeda-8e97-4a2e-bb00-3acedbdbe73f"/><img height="350" alt="image4" src="https://github.com/elice-cookcook/cookcook/assets/33516975/0e7f2cd5-09a8-4a14-bcbd-9d4d2ab100ca"/><br/><sub><b>레시피 상세 페이지 </b><br/>음식칼로리, 북마크 저장 버튼, 음식의 사진, 저감조리법 tip, 준비물, 레시피, 인쇄버튼/이미지 가리기 버튼, 추천레시피, SNS 공유섹션 </sub><br /></td>
    </tr>
<tr>
<td align="center"><img height="250" alt="image2" src="https://github.com/elice-cookcook/cookcook/assets/33516975/492624d0-7588-4208-ad7b-ad539decb341"/><img height="350" alt="image3" src="https://github.com/elice-cookcook/cookcook/assets/33516975/7e605c32-e378-4c6e-9676-1a914baf3f7a"/><img height="350" alt="image4" src="https://github.com/elice-cookcook/cookcook/assets/33516975/a19d3cd7-d6cc-445e-aa39-904e0bd0d85b"/><br/><sub><b>레시피 상세 페이지 추가 기능</b><br/>인쇄 버튼 클릭 시 / 이미지 가리기 버튼 클릭 시 / SNS 공유 기능 중 카카오톡 공유 시 </sub><br /></td>
    </tr>
    <tr>
<td align="center"><img height="350" alt="image2" src="https://github.com/elice-cookcook/cookcook/assets/33516975/8c6ebe43-16ab-4567-a0e1-8650b5c600dd"/><img height="350" alt="image3" src="https://github.com/elice-cookcook/cookcook/assets/33516975/9bed841a-3b6e-44a4-a862-99796728c933"/><img height="350" alt="image4" src="https://github.com/elice-cookcook/cookcook/assets/33516975/08c48085-ed59-4f35-9957-7309bf4c0553"/><br/><sub><b>북마크 페이지</b><br/>북마크 버튼으로 추가한 레시피들은 북마크리스트에 저장<br/삭제버튼과 체크박스로 원하는 항목만 삭제 가능 </sub><br/></td>
    </tr>
  </tbody>
</table>
