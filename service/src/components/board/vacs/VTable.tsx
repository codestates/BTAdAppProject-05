/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import VDeck from '@/components/board/vacs/VDeck';

function VTable() {
  return (
    <div css={tableCss}>
      <section css={centerAreaCss}>
        <VDeck amount={12} isBack />
      </section>
    </div>
  );
}

const centerAreaCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 150px;
`;

const tableCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  width: 900px;
  height: 700px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid ${theme.color.black900};
  background: url('/assets/table-pattern.png') no-repeat white top center/70%;
  transform: rotate3d(0.5, 0, 0, 7deg);
`;

export default VTable;
