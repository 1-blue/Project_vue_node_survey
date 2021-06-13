# 설문조사 프로젝트
Vue와 Node를 이용한 설문조사 시스템 구축

## 일정
1. 1일차 : vue프로젝트생성 및 DB테이블생성
2. 2일차
	+ front : navigation-bar구현,  vuex와 cookie이용한 관리자계정 로그인 구현
	+ server : swagger, jwt인증
3. 3일차
	+ front : 설문지생성관련 컴포넌트 작업중 ( vue3지식 부족으로 공식문서 정독한번하고 시작할 생각 )
	+ front : 설문지 생성 관련 컴포넌트 작업 완료 ( 디자인제외 )
	+ server : 설문지 생성과 설문지 리스트 불러오는 DB연동완료
4. 4일차
	+ front : 설문지 수정, 삭제, 게시 및 종료 코드추가
	+ server : 설문지 수정, 삭제, 게시 및 종료 관련 DB코드 추가
	+ 해야할것... 코드정리, $refs, setup 공부 및 css추가 ( 해야할거 다하고 사용자 설문입력받는 로직 추가할 예정 )


## 사용한 것
+ vue.js
+ node.js
+ sequelize
+ mysql
+ swagger ( 하다가 막혀가지고 임시중지 )