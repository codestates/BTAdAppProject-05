/** @jsxImportSource @emotion/react */
import VCard from '@/components/board/vacs/VCard';
import { css } from '@emotion/react';

interface VDeckProps {
  amount: number;
  isBack?: boolean;
}
function VDeck({ amount, isBack = false }: VDeckProps) {
  return (
    <div css={deckCss}>
      {Array(amount)
        .fill(0)
        .map((_, i) => (
          <VCard cssProps={cardModifierCss(amount - i)} isBack={isBack} />
        ))}
    </div>
  );
}

const deckCss = css`
  position: relative;
`;

const cardModifierCss = (offset: number) => css`
  transform: translate(-${offset * 0.7}px, ${offset}px);
`;

export default VDeck;
