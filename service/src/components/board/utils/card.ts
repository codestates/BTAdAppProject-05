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
