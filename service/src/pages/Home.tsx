/** @jsxImportSource @emotion/react */
import VTable from '@/components/board/vacs/VTable';
import { css } from '@emotion/react';

function Home() {
  return (
    <div css={homeWrapCss}>
      <main css={tableAreaCss}>
        <VTable />
      </main>
    </div>
  );
}

const homeWrapCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const tableAreaCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 300px;
  perspective-origin: center;
`;

export default Home;
