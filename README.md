# 2048_DEMO

군대에서 코딩이 너무 하고 싶은 나머지 무작정 시작한 프로젝트 👏  

사지방에서 작업하기 위해, 온라인 ide인 gitpod를 이용해서 작업을 진행함.



#### 목적

* Typescript로 React 프로젝트를 진행하는 것을 익히기
* 2048 Logic(알고리즘)을 구현할 때 사용되는 javascript(typescript)의 비동기 처리 익히기  
* React Native 개발 공부 (추후 예정)
* CSS 애니메이션 효과 적용
* 정사각형 map 외에도 다양한 Board의 2048 제작



**프로토타입 (디자인): https://ovenapp.io/view/2tF5RBk7oZd3l83ewEoTF2Xy0oVL0uBM/**





---



### # Task Management

#### 2020년 8월 12일

* init project: typescript + react

  하지만, typescript를 모르는 상태라 어떻게 시작해야하는 지조차 모름.



#### 2020년 8월 14일

* Poiemaweb의 typescript 포스팅(https://poiemaweb.com/typescript-introduction) 을 통해 typescript 맛보기 진행



#### 2020년 8월 15일

* Nomad Coder님의 Typescript 강의 (https://nomadcoders.co/typescript-for-beginners/lobby) 로 typescript 공부 진행



#### 2020년 8월 16일

* velopert님의 **React 프로젝트에서 타입스크립트 사용하기** 포스팅(https://velog.io/@velopert/series/react-with-typescript) 을 통해 Typescript를 React 프로젝트에 적용하는 것을 공부
* 개발환경 설정
* 컴포넌트에 타입스크립트 적용 (**props를 type으로 정의**)
* 함수형 컴포넌트 + hooks 에서 타입스크립트 적용 (**Generics**)



#### 2020년 8월 17일

* velopert님의 **TypeScript 환경에서 Redux를 프로처럼 사용하기** 포스팅 (https://velog.io/@velopert/use-typescript-and-redux-like-a-pro) 를 통해 typescript가 적용된 react 프로젝트에 Redux 사용하는 법 공부
* **Action type** 선언 + **액션 생성 함수** 선언
* **State type** 선언
* **Reducer** 작성
* **hook**을 이용해 컨테이너와 프레젠세이션 컴포넌트 구분 없애기 (**useSelector, useDispatch**)
* **typesafe-actions**로 리덕스 모듈 리팩토링
  * createAction / ActionType / createReducer (object map 방식 / method chainning 방식)
* 디렉토리 구성
* README.md 업로드



#### 2020년 8월 18일

* 디렉토리 구조 구성 ( **Components / Modules / Hooks / Styles** )  
* Styles의 variables 에 **colors** 객체 (색 정보를 담는 객체) 생성  
* **styled-components** 패키지 설치 및 Extension 설정 완료  
* **GameTable** 컴포넌트 생성 
* **useWindowSize** Hook 생성  



#### 2020년 8월 19일

* Basic Component 생성 ( **GameHeader, GameBoard, GameFooter** )  



#### 2020년 8월 23일

* Basic Styling Components ( **GameHeader, GameBoard** 의 기본적인 스타일링 완료 )  



#### 2020년 8월 28일

* create class **Block, BlockLine** (블록, 한 줄의 블록 Array 로직 클래스 생성)
* implement method **combineSameNumber, PushBlocks** (같은 숫자 합치기, 블록 몰아넣기 기능 구현)
* handle moveFunc with **async** (비동기 처리를 이용해, 방향키 입력 시 헨들링 하는 메서드 구현. combine후 push 작동)



#### 2020년 8월 29일

* refactoring class BlockLine
* create class **Board** & implement constructor
* implement method **randomlyLoadBlock** (임의의 빈 칸에 숫자 2를 load하는 메서드)
* implement method **initBoard**
* implement **handling methods of input directional keys** (방향키 입력 이벤트를 헨들링하는 모든 메서드 구현)
* add comments



#### # Todo

* async Action / Reducer 다루는 방법 공부 (https://react.vlpt.us/using-typescript/06-ts-redux-middleware.html)
