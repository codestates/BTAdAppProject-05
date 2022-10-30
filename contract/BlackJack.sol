// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "contracts/BlackJack_bet.sol";

contract BlackJack is BlackJackBet {
    event completeShuffle(string result, string message);
    event completeAll(string result, string message);
    mapping(address => uint[]) public playerCardDeckMap;
    mapping(address => uint[]) public dealerCardDeckMap;

    function createDeck() public pure returns (uint[] memory){
        uint deckSize = 52;
        uint[] memory deck = new uint[](52);
        for (uint i = 0; i < deckSize; i++){
            deck[i] = i;
        }
        return deck;
    }

    function shuffleDeck(uint[] memory deck) public {
        uint[] memory dealerCards = new uint[](8);
        uint[] memory playerCards = new uint[](8);
        for (uint i = 0; i < deck.length; i++) {
            uint n = i + uint(keccak256(abi.encodePacked(block.timestamp))) % (deck.length - i);
            uint temp = deck[n];
            deck[n] = deck[i];
            deck[i] = temp;
        }

        for (uint i = 0; i < 6; i++) {
            uint card = deck[i];
            playerCards[i] = card;
        }
        playerCardDeckMap[msg.sender] = playerCards;

        for (uint i = 6; i < 12; i++) {
            uint card = deck[i];
            dealerCards[i - 6] = card;
        }
        dealerCardDeckMap[msg.sender] = dealerCards;

        emit completeShuffle("success", "Card is Ready!");
    }   

    function getDealerCards(address user) public view returns (uint[] memory){
        return dealerCardDeckMap[user];
    }

    function getPlayerCards(address user) public view returns (uint[] memory){
        return playerCardDeckMap[user];
    }

    function playBlackJack() public payable {
        uint betAmount = msg.value;
        address userAddress = msg.sender;
        userBet(betAmount);
        playerBetAmount[userAddress] = betAmount;
        uint[] memory deck = createDeck();
        shuffleDeck(deck);
        emit completeAll("success", "Play is Ready!");
    }
}