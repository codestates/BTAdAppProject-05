/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import VDeck from '@/components/board/vacs/VDeck';
import VCard from '@/components/board/vacs/VCard';
import { Card } from '@/components/board/utils/card';

interface VTableProps {
  dealerCards: Card[];
  userCards: Card[];
}

function VTable({ dealerCards, userCards }: VTableProps) {
  return (
    <div css={tableCss}>
      <section css={dealerZoneCss}>
        {dealerCards.map((info, i) => {
          if (i === dealerCards.length - 1) {
            return <VCard cssProps={cardModifierCss(false)} isBack />;
          }
          return <VCard cssProps={cardModifierCss(false)} info={info} />;
        })}
      </section>
      <section css={centerAreaCss}>
        <VDeck amount={12} isBack />
      </section>
      <section css={userZoneCss}>
        {userCards.map(info => (
          <VCard cssProps={cardModifierCss(true)} info={info} />
        ))}
      </section>
    </div>
  );
}

const dealerZoneCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 150px;
`;

const centerAreaCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  gap: 50px;
`;

const userZoneCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 150px;
  transition: all 2s;
`;

const tableCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 45px 0;
  width: 900px;
  height: 700px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid ${theme.color.black900};
  background: url('/assets/table-pattern.png') no-repeat white top center/70%;
  transform: rotate3d(0.5, 0, 0, 7deg);
`;

const cardModifierCss = (isUserCard: boolean) => css`
  max-width: 15em;
  overflow: hidden;
  animation: dispense 1s, ${isUserCard ? 'moveCardToUser 1s' : 'moveCardToDealer 1s'};

  @keyframes dispense {
    0% {
      max-width: 0;
    }
    99% {
      max-width: 15em;
    }
    100% {
      max-width: 15em;
      visibility: visible;
    }
  }

  @-moz-keyframes dispense {
    0% {
      max-width: 0;
    }
    99% {
      max-width: 15em;
    }
    100% {
      max-width: 15em;
      visibility: visible;
    }
  }

  @-webkit-keyframes dispense {
    0% {
      max-width: 0;
    }
    99% {
      max-width: 15em;
    }
    100% {
      max-width: 15em;
      visibility: visible;
    }
  }

  @keyframes moveCardToUser {
    from {
      transform: translateY(-100px);
    }
    to {
      transform: traslateY(0px);
    }
  }
  @-moz-keyframes moveCardToUse {
    from {
      transform: translateY(-100px);
    }
    to {
      transform: traslateY(0px);
    }
  }
  @-webkit-keyframes moveCardToUse {
    from {
      transform: translateY(-100px);
    }
    to {
      transform: traslateY(0px);
    }
  }

  @keyframes moveCardToDealer {
    from {
      transform: translateY(100px);
    }
    to {
      transform: traslateY(0px);
    }
  }
  @-moz-keyframes moveCardToDealer {
    from {
      transform: translateY(100px);
    }
    to {
      transform: traslateY(0px);
    }
  }
  @-webkit-keyframes moveCardToDealer {
    from {
      transform: translateY(100px);
    }
    to {
      transform: traslateY(0px);
    }
  }
`;

export default VTable;
