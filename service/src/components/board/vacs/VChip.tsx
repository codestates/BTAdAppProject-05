/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme } from '@emotion/react';

interface VChipProps {
  cssProps?: SerializedStyles;
  amount?: number;
}

function VChip({ cssProps, amount = 10 }: VChipProps) {
  return (
    <span css={[chipCss, cssProps]}>
      <span>{amount}</span>
    </span>
  );
}

const chipCss = (theme: Theme) => css`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 121px;
  height: 86px;
  background: url('/assets/coin-chip.png') center/70% no-repeat;
  & > span {
    color: ${theme.color.black900};
    position: absolute;
    top: 28px;
    font-size: 20px;
  }
`;

export default VChip;
