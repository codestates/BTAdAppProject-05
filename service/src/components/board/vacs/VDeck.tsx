/** @jsxImportSource @emotion/react */
import VCard from '@/components/board/vacs/VCard';
import { css, SerializedStyles } from '@emotion/react';

interface VDeckProps {
  amount: number;
  isBack?: boolean;
  cssProps?: SerializedStyles;
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
  transform: translate(30px);
`;

const cardModifierCss = (offset: number) => css`
  position: absolute;
  transform: translate(-${offset * 0.7}px, ${-70 + offset}px);
`;

export default VDeck;
