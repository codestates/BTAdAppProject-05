/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';

interface VChipBundleProps {
  amountPerChip?: number;
  cssProps?: SerializedStyles;
  onClick: MouseEventHandler;
}

function VChipBundle({ amountPerChip = 0.01, cssProps, onClick }: VChipBundleProps) {
  return <span css={[theme => chipBundleCss(theme, amountPerChip), cssProps]} onClick={onClick} />;
}

const chipBundleCss = (theme: Theme, amountPerChip: number) => css`
  position: relative;
  width: 229px;
  height: 317px;
  background: url('/assets/coin-chip-bundle.png') no-repeat center/70%;
  font-size: 18px;
  color: ${theme.color.black900};
  cursor: pointer;

  &::before {
    position: absolute;
    content: '${amountPerChip}';
    left: 59px;
    top: 64px;
  }

  &::after {
    position: absolute;
    content: '${amountPerChip}';
    left: 135px;
    top: 175px;
  }
`;

export default VChipBundle;
