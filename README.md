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
5. 5일차
	+ front : 반응형 추가 및 전체 css 정리, v-focus등록후 사용, 기존 focus 오류존재 ( focus해제안됨 )
6. 6일차
	+ front : `<component>`의 `is`속성을 이용해서 `SurveyForm`분기처리 간단화, transition적용
7. 7일차
	+ front : 컴포넌트명, 컴포넌트 옵션순서, 안쓰는 데이터 등등 코드정리 및 구조정리 and SurveyForm분기처리로 같은 컴포넌트에서 프롭스를 이용해서 답변 or 생성, 수정 처리
8. 8일차
	+ front : subTitle추가, 설문지 활성/비활성화, 코드정리 ( css순서 및 한줄짜리 methods제거 )
	+ server : DB title의 subTitle추가
9. 9일차 ~ 10일차
	+ front : 설문결과 보는 페이지 추가
	+ server : 설문결과 DB에서 조회하는 코드 추가

## 문제
1. transition을 적용하는데 생성과 삭제의 위치가 각각 달라서 적용하기가 애매함 ( form생성시 )
2. formList의 form삭제시 형제의 데이터를 물려받는 경우가 있음... 이유는 모르겠음
3. `<template v-for="~" :key="~">`사용시 eslint에서 오류 ( 스타일가드에서 v-for v-if같이사용할 때 권고하는 형식대로 했는데 경고표시나는데 이유가 뭘까 )

## 사용한 것
+ vue.js
+ node.js
+ sequelize
+ mysql
+ swagger ( 하다가 막혀가지고 임시중지 )

