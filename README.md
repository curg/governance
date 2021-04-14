# CURG Governance
### ⭐️ 소개
커그 연구 그룹의 내부 안건 투표를 위한 웹 사이트

### Ainize
[![Run on Ainize](https://ainize.ai/images/run_on_ainize_button.svg)](https://master-governance-curg.endpoint.ainize.ai/)

https://ainize.web.app/redirect?git_repo=https://github.com/curg/governance

### 설치하기
```sh
$ docker build -t curg .
$ docker run -d -p 3000:3000 curg
```

### 사용법
크롬 브라우저에 [Klaytn Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en) 지갑이 설치되어 있어야 하고, 네트워크가 Baobab 테스트넷으로 설정되어 있어야 한다.

### 📚 기술 스택
**리액트**<br/>
의심할 여지 없는 명불허전 현재 프론트 기술 1-Tier

**Recoil**<br/>
페이스북에서 개발한 상태 관리 라이브러리 "굉장히 심플하다"

**PQV**<br/>
제곱 투표의 시빌 공격(Cybil Attack) 취약점을 해결한 확률적 제곱 투표(Probabilitc Quadratic Voting) 방식을 기반으로 두고 있다.

**Klaytn**<br/>
카카오 자회사 그라운드X 에서 개발한 이더리움 기반 블록체인으로 CURG 웹사이트에서는 이 Klaytn을 백엔드 서버로 이용한다.<br/>
백엔드 코드가 어떻게 작성되었는지 궁금하다면 [여기](https://github.com/curg/v1)를 참고하면 된다.<br/><br/>
클레이튼에서는 web3.js대신 caver.js를 이용해서 Klaytn 서버와 통신한다.
