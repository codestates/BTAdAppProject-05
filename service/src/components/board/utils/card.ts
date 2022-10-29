const SUITS = ['♥️', '♣️', '♠️', '♦️'] as const;

const FACES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

export interface Card {
  suit: typeof SUITS[number];
  face: typeof FACES[number];
}
export const getCard = (cardIndex: number): Card => {
  return {
    suit: SUITS[Math.floor(cardIndex / 13)],
    face: FACES[cardIndex % 13],
  };
};

export const getScore = (cards: Card[], ignoresLast: boolean = false) => {
  let includesA = false;
  const score = cards.reduce<number>((acc, { face }, idx) => {
    if (ignoresLast && idx === cards.length - 1) {
      return acc;
    }
    let cardValue;
    switch (face) {
      case 'A':
        includesA = true;
        cardValue = 11;
        break;
      case 'K':
      case 'Q':
      case 'J':
        cardValue = 10;
        break;
      default:
        cardValue = Number(face);
    }
    return acc + cardValue;
  }, 0);

  if (includesA && score > 21) {
    return score - 10;
  }
  return score;
};
