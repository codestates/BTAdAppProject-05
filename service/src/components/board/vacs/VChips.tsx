/** @jsxImportSource @emotion/react */
import VChip from '@/components/board/vacs/VChip';
import { css, SerializedStyles } from '@emotion/react';
import { MouseEventHandler } from 'react';

interface VChipsProps {
  count: number;
  cssProps?: SerializedStyles;
  chipCssProps?: SerializedStyles;
  onClick: MouseEventHandler;
}

function VChips({ cssProps, chipCssProps, count, onClick }: VChipsProps) {
  return (
    <div css={[chipsCss, cssProps]} onClick={onClick}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <VChip cssProps={{ ...chipCssProps, ...chipModifierCss(i, chipCssProps) }} />
        ))}
    </div>
  );
}

const chipsCss = css`
  width: 121px;
  position: relative;
`;

const chipModifierCss = (offset: number, cssProps?: SerializedStyles) =>
  css(
    `
  top: ${-13 * offset}px;
`,
    [cssProps],
  );

export default VChips;
