// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "contracts/BlackJack_bet.sol";

contract BlackJack is BlackJackBet {
    uint deckSize = 52;
    uint[] deck;
    uint[] dealerCards;
    uint[] playerCards;
    event completeShuffle(string result, string message);
    event completeAll(string result, string message);
    mapping(address => uint[]) public playerCardDeckMap;
    mapping(address => uint[]) public dealerCardDeckMap;

    function createDeck() public {
        for (uint i = 0; i < deckSize; i++){
            deck.push(i);
        }
    }

    function shuffleDeck() public {
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
        playerCardDeckMap[msg.sender] = playerCards;

        for (uint i = 6; i < 12; i++) {
            uint card = deck[deck.length - 1];
            deck.pop();
            dealerCards.push(card);
        }
        dealerCardDeckMap[msg.sender] = dealerCards;

        emit completeShuffle("success", "Card is Ready!");
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

    function playBlackJack() public payable {
        uint betAmount = msg.value;
        address userAddress = msg.sender;
        userBet(betAmount);
        playerBetAmount[userAddress] = betAmount;
        createDeck();
        shuffleDeck();
        emit completeAll("success", "Play is Ready!");
    }

}