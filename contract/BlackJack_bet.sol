// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract BlackJack {
    address _contract = address(this);
    address _player = msg.sender;
    uint256 _pBet = 10;
    string _dMsg;
    address payable p_player = payable(_player);
    address payable p_contract = payable(_contract);

    event completeUserBet(string result, string message, uint256 bet);
    event howMuch(uint256 _value);

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    // 유저가 게임 배팅 시 컨트랙트에 배팅 금액 송금.
    function userBet(uint256 bet) public payable {
        uint256 betEth;
        // 유저 배팅을 초기화 해줌
        _pBet = 0;

        // 인수로 들어온 배팅 금액을 세팅
        betEth = bet;
        _pBet += betEth;

        _dMsg = "Bet Placed.";
        // callNow(p_contract);
        callToContract();
    }

    // 유저 승리시 컨트랙트에서 유저에게 배팅금액의 2배를 송금
    function callContractToWinnerUser() public payable {
        uint256 betEth = _pBet;
        uint256 callEth = betEth * 2;

        _dMsg = "send Ehter To User.";
        callNow(p_player, callEth);
    }

    // 송금
    function callNow(address payable _to, uint256 _value) public payable {
        (bool sent, ) = _to.call{value: _value, gas: 1000}("");
        require(sent, "fail send ether.");
        emit completeUserBet("success", _dMsg, msg.value);
    }

    function callToContract() public payable {
        require(msg.sender.balance >= msg.value, "Your Balance is not enought");
        (bool sent, ) = address(this).call{value: msg.value, gas: 1000}("");
        require(sent, "fail send ether.");
        emit completeUserBet("success", _dMsg, msg.value);
    }
}
