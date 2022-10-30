// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract BlackJack {
    uint deckSize = 52;
    uint[] deck;
    uint[] dealerCards;
    uint[] playerCards;
    event completeShuffle(string result, string message);

    function createDeck() public returns(uint[] memory){
        for (uint i = 0; i < deckSize; i++){
            deck.push(i);
        }
      return deck;
    }

    function shuffleDeck() external {
        for (uint i = 0; i < deck.length; i++) {
            uint n = i + uint(keccak256(abi.encodePacked(block.timestamp))) % (deck.length - i);
            uint temp = deck[n];
            deck[n] = deck[i];
            deck[i] = temp;
        }

        for (uint i = 0; i < 6; i++) {
            uint card = deck[deck.length - 1];
            deck.pop();
            playerCards.push(card);
        }

        for (uint i = 6; i < 12; i++) {
            uint card = deck[deck.length - 1];
            deck.pop();
            dealerCards.push(card);
        }

        emit completeShuffle("success", "Card Deck is Ready!");
    }   

    function getDealerCards() public view returns (uint[] memory){
        return dealerCards;
    }

    function getPlayerCards() public view returns (uint[] memory){
        return playerCards;
    }

    function getDeck() public view returns (uint[] memory){
        return deck;
    }
}