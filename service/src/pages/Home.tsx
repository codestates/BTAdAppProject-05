/** @jsxImportSource @emotion/react */
import VTable from '@/components/board/vacs/VTable';
import { css, Theme } from '@emotion/react';
import VChipBundle from '@/components/board/vacs/VChipBundle';
import VChips from '@/components/board/vacs/VChips';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, checkScoreResult, getCard, getScore } from '@/components/board/utils/card';
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/App';
import { WALLET_ERROR, WalletError } from '@/constants/errorCode';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/constants/contract';
import { Contract } from 'web3-eth-contract';
import { BallTriangle } from 'react-loader-spinner';

export type Step = 'BET' | 'DISPENSING' | 'SELECT' | 'REVEAL' | 'LOADING';

const ETHER_UNIT = 'ETH';

// TODO: 개발 완료 후 아래 eslint 다시 활성화
/*eslint-disable*/
function Home() {
  const [bettingCount, setBettingCount] = useState(1);
  const [step, setStep] = useState<Step>('BET');
  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [userDeck, setUserDeck] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [userCards, setUserCards] = useState<Card[]>([]);
  const dealerScore = useMemo(() => getScore(dealerCards, step !== 'REVEAL'), [dealerCards, step]);
  const userScore = useMemo(() => getScore(userCards), [userCards]);
  const {
    account,
    activate,
  } = useWeb3React();
  const [contract, setContract] = useState<Contract | null>(null);
  const accountRef = useRef<string | null | undefined>(null);

  const restart = () => {
    setBettingCount(1);
    setStep('BET');
    setDealerDeck([]);
    setUserDeck([]);
    setDealerCards([]);
    setUserCards([]);
  }

  useEffect(() => {
    accountRef.current = account;
  }, [account])

  const handleChipBundleClick = () => {
    if (step !== 'BET') return;
    if (bettingCount > 10) {
      alert('게임 한 판당 베팅 금액은 1 ETH 을 초과할 수 없습니다.');
      return;
    }
    setBettingCount(prev => prev + 1);
  };

  const handleChipsForBettingClick = () => {
    if (step !== 'BET' || bettingCount === 0) return;
    setBettingCount(prev => prev - 1);
  };

  const handleBettingBtnClick = async() => {
    if (bettingCount === 0) {
      alert('칩을 이용해 배팅 금액을 설정해주세요.');
      return;
    }
    if (confirm(`${bettingCount * 0.01} ${ETHER_UNIT} 만큼 베팅하여 게임을 시작하시겠습니까?\n(왼쪽의 칩들을 클릭하면 더 베팅할 수 있습니다.)`)) {
      try {
        setStep('LOADING');
        await connectMetaMask();
        const contract = connectContract();
        setContract(contract);
        setTimeout(() => bet(contract), 1000);
      } catch (e) {
        console.error(e);
      }
    }
  }

  const connectContract = () => {
    const web3 = new Web3((window as any).web3.currentProvider);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    setContract(contract);
    return contract;
  }

  const connectMetaMask = () => {
    return activate(injected, (error) => {
        const typedError = error as unknown as WalletError;
        if (error.name === 'NoEthereumProviderError') {
          alert('메타마스크 지갑을 설치해주세요.');
          window.open('https://metamask.io/download.html', '_blank');
          throw new Error('메타마스크를 설치하여야 합니다.')
        }
        if (typedError.code === WALLET_ERROR.USER_REJECT) {
          alert('지갑 연결이 취소되었습니다.');
          throw new Error('사용자가 지갑 연결을 취소하였습니다.');
        }
        console.log('error');
      })
  }

  const bet = async (contract: Contract) => {
    try {
      const account = accountRef.current;
      await contract.methods.playBlackJack().send({ from: account, value: Web3.utils.toWei((bettingCount * 10000000).toString(), 'Gwei')});
      const dealerDeck = (await contract.methods.getDealerCards(account).call()).map(getCard);
      const userDeck = (await contract.methods.getPlayerCards(account).call()).map(getCard);
      const dealerCards: Card[] = [];
      const userCards: Card[] = [];
      Array(2).fill(0).forEach(() => {
        dealerCards.push(dealerDeck.pop()!);
        userCards.push(userDeck.pop()!);
      })
      setDealerCards(dealerCards);
      setUserCards(userCards);
      setStep('DISPENSING');
      setDealerDeck(dealerDeck);
      setUserDeck(userDeck);
      setTimeout(async () => {
        if (checkScoreResult(userCards) === 'BLACKJACK') {
          alert('BLACKJACK!');
          await sendRewardToUser(contract);
          restart();
          return;
        }
        setStep('SELECT');
      }, 1000)
    } catch (error) {
      const typedError = error as unknown as WalletError;
      if (typedError.code === WALLET_ERROR.USER_REJECT) {
        alert('서명을 취소하셨습니다. 재시작합니다.');
        restart();
        return;
      }
      alert(error);
      console.error(error);
    }
  }

  const openNewDealerCard = (dealerDeck: Card[], dealerCards: Card[]) => {
    const currentDealerDeck = dealerDeck.slice();
    const newDealerCards = [...dealerCards, currentDealerDeck.pop()!];
    setDealerCards(newDealerCards);
    setDealerDeck(currentDealerDeck);
    setTimeout(async () => {
      if (await checkIsFinishedInOpeningDealerCard(newDealerCards)) {
        restart();
        return;
      }
      openNewDealerCard(currentDealerDeck, newDealerCards);
    }, 1000) // 애니메이션 시간
  }

  const checkIsFinishedInOpeningDealerCard = async (dealerCards: Card[]) => {
    const dealerResult = checkScoreResult(dealerCards, true, userScore);
    if (dealerResult === 'BLACKJACK') {
      alert("LOSE! :: Dealer's BLACKJACK");
      return 1;
    }
    if (dealerResult === 'BURST') {
      alert("WIN! :: Dealer's BURST");
      await sendRewardToUser();
      return 1;
    }
    if (dealerResult === 'LOSE') {
      alert("WIN!");
      await sendRewardToUser();
      return 1;
    }
    if (dealerResult === 'WIN') {
      alert("LOSE!");
      return 1;
    }
    return 0;
  }

  const sendRewardToUser = async (contractPayLoad?: Contract) => {
    const errorAlertMsg = `상금을 드리는 과정에 오류가 있습니다. 이 문구를 캡처하여 증빙을 남겨주십시오.\n베팅금액: ${bettingCount * 0.1}ETH`;
    const currentContract = contractPayLoad || contract;
    if (!currentContract) {
      alert(errorAlertMsg);
      return;
    }
    alert(`승리하여 베팅금액의 두 배인 ${bettingCount * 0.02}ETH 금액을 지갑으로 전송하기 위해 서명을 해주십시오.\n서명 후 지갑을 확인하여 전송받은 금액을 확인해주세요.`);
    try {
      await currentContract!.methods.callContractToWinnerUser('0xFA629b7aa4272d683c7e22E5be5a485B157dC2ff').send({from: '0xFA629b7aa4272d683c7e22E5be5a485B157dC2ff'});
    } catch (error) {
      const typedError = error as unknown as WalletError;
      if (typedError.code === WALLET_ERROR.USER_REJECT) {
        alert('서명을 취소하셨습니다. 재시작합니다.');
        restart();
        return;
      }
      alert(error);
      console.error(error);
    }
  }

  const handleStayBtnClick = () => {
    setStep('REVEAL');
    setTimeout(async () => {
      if (await checkIsFinishedInOpeningDealerCard(dealerCards)) {
        restart();
        return;
      }
      openNewDealerCard(dealerDeck, dealerCards);
    }, 500) // 딜러의 덮인 카드가 드러내진 것을 확인하는 시간
  }

  const handleHitBtnClick = () => {
    setStep('DISPENSING');
    const currentUserDeck = userDeck.slice();
    const newUserCards = [...userCards, currentUserDeck.pop()!];
    setUserCards(newUserCards)
    setUserDeck(currentUserDeck);
    setTimeout(async () => {
      const userResult = checkScoreResult(newUserCards);
      if (userResult === 'BLACKJACK') {
        alert('BLACKJACK!');
        await sendRewardToUser();
        restart();
        return;
      }
      if (userResult === 'BURST') {
        alert('BURST!');
        restart();
        return;
      }
      setStep('SELECT');
    }, 1000) // 애니메이션 시간
  }

  return (
    <div css={homeWrapCss}>
      <main css={tableAreaCss}>
        <VChipBundle cssProps={chipBundleModifierCss} onClick={handleChipBundleClick} />
        <VChips
          cssProps={chipsModifierCss}
          chipCssProps={chipModifierCss}
          count={bettingCount}
          onClick={handleChipsForBettingClick}
        />
        <div css={tableWrapCss}>
          <VTable
            step={step}
            dealerCards={dealerCards}
            dealerScore={dealerScore}
            userCards={userCards}
            userScore={userScore}
          />
        </div>
      </main>
      <div css={buttonWrapCss}>
        {
          (() => {
            switch (step) {
              case 'BET':
                return <button css={buttonCss} onClick={handleBettingBtnClick}>BETTING</button>;
              case 'LOADING':
                return <button css={(theme) => buttonCss(theme, true)}>
                  <BallTriangle ariaLabel="loading-indicator" color={'#fff'} width={40} height={40}/>
                </button>
              case 'SELECT':
                return <>
                  <button css={buttonCss} onClick={handleStayBtnClick}>STAY</button>
                  <button css={buttonCss} onClick={handleHitBtnClick}>HIT</button>
                </>
              default:
                return <></>
            }
          })()
        }
      </div>
    </div>
  );
}

const chipsModifierCss = css`
  position: absolute;
  transform: translate(-70px);
  z-index: 2;
`;

const chipModifierCss = css`
  animation: moveChip 1s;
  -moz-animation: moveChip 1s; /* Firefox */
  -webkit-animation: moveChip 1s; /* Safari and Chrome */

  @keyframes moveChip {
    from {
      transform: translateX(-500px);
    }
    to {
      transform: traslateX(0px);
    }
  }
  @-moz-keyframes moveChip {
    from {
      transform: translateX(-500px);
    }
    to {
      transform: traslateX(0px);
    }
  }
  @-webkit-keyframes moveChip {
    from {
      transform: translateX(-500px);
    }
    to {
      transform: traslateX(0px);
    }
  }
`;

const chipBundleModifierCss = css`
  position: absolute;
  transform: translate(-600px);
`;

const homeWrapCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  width: 100%;
  height: 100vh;
`;

const tableAreaCss = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const tableWrapCss = css`
  perspective: 300px;
  perspective-origin: center;
`;

const buttonWrapCss = css`
  display: flex;
  height: 63px;
  gap: 20px;
`

const buttonCss = (theme: Theme, isHoverDisabled: boolean = false) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 63px;
  background-color: ${theme.color.black300};
  color: white;
  font-weight: 800;
  font-size: 32px;
  border-radius: 20px;
  
  ${!isHoverDisabled && `
    &:hover {
      background-color: ${theme.color.black600};
    }
  `}
`

export default Home;
