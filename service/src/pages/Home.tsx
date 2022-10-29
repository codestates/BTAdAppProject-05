/** @jsxImportSource @emotion/react */
import VTable from '@/components/board/vacs/VTable';
import { css, Theme } from '@emotion/react';
import VChipBundle from '@/components/board/vacs/VChipBundle';
import VChips from '@/components/board/vacs/VChips';
import { useMemo, useState } from 'react';
import { Card, checkScoreResult, getCard, getScore } from '@/components/board/utils/card';
import { DUMMY_CARDS } from '@/dummy/test';

type STEP = 'BET' | 'DISPENSING' | 'SELECT' | 'REVEAL';

const ETHER_UNIT = 'Gwei';

// TODO: 개발 완료 후 아래 eslint 다시 활성화
/*eslint-disable*/
function Home() {
  const [bettingCount, setBettingCount] = useState(1);
  const [step, setStep] = useState<STEP>('BET');
  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [userDeck, setUserDeck] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [userCards, setUserCards] = useState<Card[]>([]);
  const dealerScore = useMemo(() => getScore(dealerCards, step !== 'REVEAL'), [dealerCards]);
  const userScore = useMemo(() => getScore(userCards), [userCards, step]);


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

  const handleBettingBtnClick = () => {
    if (bettingCount === 0) {
      alert('칩을 이용해 배팅 금액을 설정해주세요.');
      return;
    }
    if (confirm(`${bettingCount * 10} ${ETHER_UNIT} 만큼 베팅하여 게임을 시작하시겠습니까?`)) {
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
  }

  const handleStayBtnClick = () => {

  }

  const handleHitBtnClick = () => {
    setStep('DISPENSING');
    const currentUserDeck = userDeck.slice();
    const newUserCards = [...userCards, currentUserDeck.pop()!];
    setUserCards(newUserCards)
    setUserDeck(currentUserDeck);
    setTimeout(() => {
      if (checkScoreResult(newUserCards) === 'BLACKJACK') {
        alert('BLACKJACK!');
        restart();
        return;
      }
      if (checkScoreResult(newUserCards) === 'BURST') {
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
                  <button css={buttonCss}>STAY</button>
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
