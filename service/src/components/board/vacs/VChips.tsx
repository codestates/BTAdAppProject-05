/** @jsxImportSource @emotion/react */
import VChip from '@/components/board/vacs/VChip';
import { css, SerializedStyles } from '@emotion/react';

interface VChipsProps {
  cssProps: SerializedStyles;
  count: number;
}

function VChips({ cssProps, count }: VChipsProps) {
  return (
    <div css={[chipsCss, cssProps]}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <VChip cssProps={chipModifierCss(i)} />
        ))}
    </div>
  );
}

const chipsCss = css`
  width: 121px;
  position: relative;
`;

const chipModifierCss = (offset: number) => css`
  transform: translate(0, ${-13 * offset}px);
`;

export default VChips;
