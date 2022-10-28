/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';

function VTable() {
  return <div css={tableCss}></div>;
}

const tableCss = (theme: Theme) => css`
  width: 900px;
  height: 700px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid ${theme.color.black900};
  background: url('/assets/table-pattern.png') no-repeat white top center/70%;
  //transform: rotate3d(0.5, 0, 0, 7deg);
`;

export default VTable;
