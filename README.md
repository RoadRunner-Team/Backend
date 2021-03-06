# roadrunner-sever

roadrunner server로 nodejs 12.16.2 버전에서 개발되었다. express를 이용한 Restful API 서버이며 채팅을 위한 로직을 포함하고 있다.

## 설치 및 실행

```bash
npm install # node modules install

npm run dev # Local dev mode
```

## 중요 컴포넌트

- express: nodejs server
- sequelize: 데이터베이스와의 연동 및 데이터를 컨트롤 함
- bcrypt: 비밀번호 암호화
- swagger: API 문서화
- multer: 파일 업로드/다운로드를 위한 모듈

## 폴더 별 설명

- routes

  - API server의 경로를 정의하고 컨트롤러와 연동한다.

- middlewares

  - 라우터에서 실행할 때 공통적으로 처리하는 로직을 미들웨어로 만들어 실행시킨다.

- models

  - 데이터베이스의 스키마를 정의하고 스미카간의 관게를 정의한다.

- controllers

  - 라우터에 의해 호출되며, 서비스 로직을 통해 데이터베이스를 접근하여 데이터를 가공하여 응답을 보낸다.

- services

  - 데이터베이스로부터 데이터를 쓰거나 읽고, 수정하는 등 데이터베이스에 대한 직접적인 로직을 정의한다.

- socket (chatting)

  - 채팅을 위한 서버 (connection / join / leave / message / disconnect) 에 대한 정의와 실행 및 설정을 위한 구현체가 들어있다.

- uploads

  - 업로드된 이미지가 저장되는 폴더.

- config
  - 기본적인 설정파일

## 그 외

node version: 12.16.2
