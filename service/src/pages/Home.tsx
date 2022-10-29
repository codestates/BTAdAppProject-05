/** @jsxImportSource @emotion/react */
import VTable from '@/components/board/vacs/VTable';
import { css } from '@emotion/react';
import VChipBundle from '@/components/board/vacs/VChipBundle';
import VChips from '@/components/board/vacs/VChips';
import { useState } from 'react';

function Home() {
  const [bettingCount, setBettingCount] = useState(2);

  const handleChipBundleClick = () => {
    if (bettingCount > 10) {
      alert('게임 한 판당 베팅 금액은 100을 초과할 수 없습니다.');
      return;
    }
    setBettingCount(prev => prev + 1);
  };

  const handleChipsForBettingClick = () => {
    if (bettingCount === 0) return;
    setBettingCount(prev => prev - 1);
  };

  return (
    <div css={homeWrapCss}>
      <main css={tableAreaCss}>
        <VChipBundle cssProps={chipBundleModifierCss} onClick={handleChipBundleClick} />
        <VChips
          cssProps={chipsModifierCss}
          chipCssProps={chipModifierCss}
          count={bettingCount}
          onClick={handleChipsForBettingClick}
        />
        <div css={tableWrapCss}>
          <VTable />
        </div>
      </main>
    </div>
  );
}

const chipsModifierCss = css`
  position: absolute;
  transform: translate(-70px);
  z-index: 2;
`;

const chipModifierCss = css`
  animation: myship 1s;
  -moz-animation: myship 1s; /* Firefox */
  -webkit-animation: myship 1s; /* Safari and Chrome */

  @keyframes myship {
    from {
      transform: translateX(-500px);
    }
    to {
      transform: traslateX(0px);
    }
  }
  @-moz-keyframes myship {
    from {
      transform: translateX(-500px);
    }
    to {
      transform: traslateX(0px);
    }
  }
  @-webkit-keyframes myship {
    from {
      transform: translateX(-500px);
    }
    to {
      transform: traslateX(0px);
    }
  }
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
