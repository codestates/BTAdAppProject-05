/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme } from '@emotion/react';

interface VChipBundleProps {
  amountPerChip?: number;
  cssProps?: SerializedStyles;
}

function VChipBundle({ amountPerChip = 10, cssProps }: VChipBundleProps) {
  return <span css={[theme => chipBundleCss(theme, amountPerChip), cssProps]} />;
}

const chipBundleCss = (theme: Theme, amountPerChip: number) => css`
  position: relative;
  width: 229px;
  height: 317px;
  background: url('/assets/coin-chip-bundle.png') no-repeat center/70%;
  font-size: 20px;
  color: ${theme.color.black900};
  cursor: pointer;

  &::before {
    position: absolute;
    content: '${amountPerChip}';
    left: 67px;
    top: 63px;
  }

  &::after {
    position: absolute;
    content: '${amountPerChip}';
    left: 143px;
    top: 175px;
  }
`;

export default VChipBundle;
