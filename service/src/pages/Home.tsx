/** @jsxImportSource @emotion/react */
import VTable from '@/components/board/vacs/VTable';
import { css } from '@emotion/react';
import VChipBundle from '@/components/board/vacs/VChipBundle';
import VChips from '@/components/board/vacs/VChips';

function Home() {
  return (
    <div css={homeWrapCss}>
      <main css={tableAreaCss}>
        <VChipBundle cssProps={chipBundleModifierCss} />
        <VChips cssProps={chipModifierCss} count={3} />
        <div css={tableWrapCss}>
          <VTable />
        </div>
      </main>
    </div>
  );
}

const chipModifierCss = css`
  position: absolute;
  transform: translate(-70px);
  z-index: 2;
`;

const chipBundleModifierCss = css`
  position: absolute;
  transform: translate(-600px);
`;

const homeWrapCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const tableAreaCss = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const tableWrapCss = css`
  perspective: 300px;
  perspective-origin: center;
`;

export default Home;
