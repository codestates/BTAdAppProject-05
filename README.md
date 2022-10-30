<div align=center>
<img width="937" alt="image" src="https://user-images.githubusercontent.com/67793530/198898749-fcd55da6-2d09-42ea-ad31-85c61a895747.png">
</div>


> 갑자기 나타난 해적이 칼로 위협하며 내기를 하자고 제안하고 있어요. 이런, 도망갈 수가 없어요!


# Tomas Jacob Black
이 게임은 이더(Ether)를 걸고 진행하는 탈중앙화 블랙잭 게임입니다.
단, 다음과 같이 블랙잭 규칙 중 일부가 제거되었습니다.
```
스플릿(Split), 더블다운(Double Down), 인슈어런스(Insurance), 이븐머니(Even Money), 서렌더(Surrender)가 없습니다.
```
[블랙잭 규칙 보러가기](https://namu.wiki/w/%EB%B8%94%EB%9E%99%EC%9E%AD(%EC%B9%B4%EB%93%9C%EA%B2%8C%EC%9E%84)#s-4)

<br/>

# 시작하는 법
### 사이트 접속하기 (미완성)
- https://thomas-jacob-black.netlify.app/ 에서 Goerli 테스트넷 환경으로 플레이할 수 있도록 준비중이나
아직 불완전한 관계로 아래의 2번의 방법을 시도해주세요. 

### 로컬에서 실행하기
- 메타마스크 세팅하기
  1. [가나슈(Ganache)](https://trufflesuite.com/ganache/)를 실행합니다.
  2. 가나슈에 설정되어있는 RPC Server를 이용해 메타마스크에 네트워크를 새로 생성하고, 해당 네트워크를 선택합니다.
  3. 가나슈에서 제공하는 개인키를 이용해 가나슈 accounts를 메타마스크로 가져옵니다.
- 가나슈 Provider로 컨트랙트 배포하기
  1. [Remix IDE](https://remix.ethereum.org/)에 접속합니다.
  2. 레포지토리의 contract 폴더에 있는 `BlackJack.sol`, `BlackJack_bet.sol` 파일을 Remix IDE의 contracts 폴더에 복사합니다.
  3. Remix에서 `BlackJack.sol` 파일을 컴파일 합니다.
  4. `Ganache Provider` 환경에서 `1 Ether`와 함께 배포합니다.
- 로컬에서 블랙잭 게임 켜기
  1. 레포지토리의 service 폴더를 클론 받습니다.
  2. `service > src > constants > constract.ts` 파일 안에 있는 `CONTRACT_ADDRESS` 변수값에 배포한 컨트랙트의 Address를 넣습니다.
  3. service 폴더 루트에서 `yarn start` 명령을 입력합니다.
  4. 게임을 즐깁니다!

<br/>

# 게임 장면
### 전체적인 과정 <br/>

https://user-images.githubusercontent.com/67793530/198903360-0dcafd47-fde1-4241-a689-fc2b03cd2046.mov


### 베팅하기 <br/>

https://user-images.githubusercontent.com/67793530/198902155-6f60b1d9-2bdf-4ffc-83ae-8a5b88e7da05.mov

### 승리 <br/>

https://user-images.githubusercontent.com/67793530/198902139-aed1db76-a51a-4d54-9b95-e4933c02f854.mov

### 패배 <br/>

https://user-images.githubusercontent.com/67793530/198902159-24ebb2ea-7147-4308-9322-651e7a322341.mov

### 블랙잭 승리 <br/>

https://user-images.githubusercontent.com/67793530/198902161-423a0f95-d0e6-4257-856f-747f78f5fa41.mov

