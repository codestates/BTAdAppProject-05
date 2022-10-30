/** @jsxImportSource @emotion/react */
import VTable from '@/components/board/vacs/VTable';
import { css, Theme } from '@emotion/react';
import VChipBundle from '@/components/board/vacs/VChipBundle';
import VChips from '@/components/board/vacs/VChips';
import { useMemo, useState } from 'react';
import { Card, checkScoreResult, getCard, getScore } from '@/components/board/utils/card';
import { DUMMY_CARDS } from '@/dummy/test';
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/App';
import { WALLET_ERROR, WalletError } from '@/constants/errorCode';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/constants/contract';
import { Contract } from 'web3-eth-contract';

export type Step = 'BET' | 'DISPENSING' | 'SELECT' | 'REVEAL';

const ETHER_UNIT = 'Gwei';

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
    chainId,
    account,
    active,
    activate,
    deactivate
  } = useWeb3React();
  const [contract, setContract] = useState<Contract | null>(null);

  const restart = () => {
    setBettingCount(1);
    setStep('BET');
    setDealerDeck([]);
    setUserDeck([]);
    setDealerCards([]);
    setUserCards([]);
  }

  const handleChipBundleClick = () => {
    if (step !== 'BET') return;
    if (bettingCount > 10) {
      alert('게임 한 판당 베팅 금액은 100을 초과할 수 없습니다.');
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
    if (confirm(`${bettingCount * 10} ${ETHER_UNIT} 만큼 베팅하여 게임을 시작하시겠습니까?`)) {
      try {
        await connectMetaMask();
        console.log(account, chainId);
        const contract = connectContract();
        const test = await contract.methods.createDeck().call();
        console.log(test);
        bet();
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
    });
  }

  const bet = () => {
    setStep('DISPENSING');
    const dealerDeck = DUMMY_CARDS.DEALER.map(getCard);
    const userDeck = DUMMY_CARDS.USER.map(getCard);
    Array(2).fill(0).forEach(() => {
      setDealerCards(prev => [...prev, dealerDeck.pop()!]);
      setUserCards(prev => [...prev, userDeck.pop()!]);
    })
    setDealerDeck(dealerDeck);
    setUserDeck(userDeck);
    setStep('SELECT');
  }

  const openNewDealerCard = (dealerDeck: Card[], dealerCards: Card[]) => {
    const currentDealerDeck = dealerDeck.slice();
    const newDealerCards = [...dealerCards, currentDealerDeck.pop()!];
    setDealerCards(newDealerCards);
    setDealerDeck(currentDealerDeck);
    setTimeout(() => {
      if (checkIsFinishedInOpeningDealerCard(newDealerCards)) {
        restart();
        return;
      }
      openNewDealerCard(currentDealerDeck, newDealerCards);
    }, 1000) // 애니메이션 시간
  }

  const checkIsFinishedInOpeningDealerCard = (dealerCards: Card[]) => {
    const dealerResult = checkScoreResult(dealerCards, true, userScore);
    if (dealerResult === 'BLACKJACK') {
      alert("LOSE! :: Dealer's BLACKJACK");
      return 1;
    }
    if (dealerResult === 'BURST') {
      alert("WIN! :: Dealer's BURST");
      return 1;
    }
    if (dealerResult === 'LOSE') {
      alert("WIN!");
      return 1;
    }
    if (dealerResult === 'WIN') {
      alert("LOSE!");
      return 1;
    }
    return 0;
  }


  const handleStayBtnClick = () => {
    setStep('REVEAL');
    setTimeout(() => {
      if (checkIsFinishedInOpeningDealerCard(dealerCards)) {
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
    setTimeout(() => {
      const userResult = checkScoreResult(newUserCards);
      if (userResult === 'BLACKJACK') {
        alert('BLACKJACK!');
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

const buttonCss = (theme: Theme) => css`
  width: 210px;
  height: 63px;
  background-color: ${theme.color.black300};
  color: white;
  font-weight: 800;
  font-size: 32px;
  border-radius: 20px;
  
  &:hover {
    background-color: ${theme.color.black600};
  }
`

export default Home;
