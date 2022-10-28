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
    }

    // function getPlayerCards() public view returns (uint[] memory){
    //     uint[] memory playerCards;
    //     for (uint i = 0; i < 6; i++) {
    //         playerCards[i] = deck[i];
    //     }
    //     return playerCards;
    // }

    // function getDealerCards() public view returns (uint[] memory){
    //     uint[] memory dealerCards;
    //     for (uint i = 0; i < 6; i++) {
    //         dealerCards[i] = deck[i];
    //     }
    //     return dealerCards;
    // }
}