/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme } from '@emotion/react';
import { Card } from '@/components/board/utils/card';

interface VCardProps {
  cssProps?: SerializedStyles;
  info?: Card;
  isBack?: boolean;
}

function VCard({ cssProps, isBack = false }: VCardProps) {
  return <span css={[(theme: Theme) => cardCss(theme, isBack), cssProps]} />;
}

const cardCss = (theme: Theme, isBack: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 140px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  background-color: white;
  ${isBack && 'background: url("/assets/compass.png") white center/60% no-repeat'};

  &::before {
    display: block;
    width: 90px;
    height: 125px;
    border: 2px solid ${theme.color.black600};
    border-radius: 10px;
    content: '';
  }
`;

export default VCard;
