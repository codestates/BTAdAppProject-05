/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme } from '@emotion/react';
import { Card } from '@/components/board/utils/card';

interface VCardProps {
  cssProps?: SerializedStyles;
  info?: Card;
  isBack?: boolean;
}

function VCard({ info, cssProps, isBack = false }: VCardProps) {
  return (
    <span css={[(theme: Theme) => cardCss(theme, info?.suit, isBack), cssProps]}>
      {info && <span>{info.face}</span>}
    </span>
  );
}

const cardCss = (theme: Theme, suit?: Card['suit'], isBack?: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 105px;
  height: 140px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  background-color: white;
  ${isBack && 'background: url("/assets/compass.png") white center/60% no-repeat'};

  & > span {
    color: ${theme.color.black900};
    font-size: 50px;
    z-index: 1;

    &::before {
      position: absolute;
      top: 10px;
      left: 10px;
      display: block;
      font-size: 35px;
      color: ${theme.color.black300};
      content: '${suit}';
    }

    &::after {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: block;
      font-size: 35px;
      color: ${theme.color.black300};
      content: '${suit}';
      transform: rotate(180deg);
    }
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 90px;
    height: 125px;
    border: 2px solid ${theme.color.black600};
    border-radius: 10px;
    content: '';
  }
`;

export default VCard;
