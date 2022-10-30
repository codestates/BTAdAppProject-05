// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract BlackJackBet {
    mapping(address => uint256) public playerBetAmount;

    event completeUserBet(string result, uint256 bet);
    event howMuch(uint256 _value);

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint256) {
        return payable(address(this)).balance;
    }

    // 유저가 게임 배팅 시 컨트랙트에 배팅 금액 송금.
    function userBet(uint256 bet) public payable {
        // 인수로 들어온 배팅 금액을 세팅
        playerBetAmount[msg.sender] = bet;
        callToContract();
    }

    // 유저 승리시 컨트랙트에서 유저에게 배팅금액의 2배를 송금
    function callContractToWinnerUser(address _to)
        public
        payable
        returns (uint256)
    {
        uint256 amount = playerBetAmount[_to] * 2;
        callNow(_to, amount);
        return amount;
    }

    function callNow(address _to, uint256 _value) public payable {
        payable(_to).transfer(_value);
    }

    function callToContract() public payable {
        require(msg.sender.balance >= msg.value, "Your Balance is not enough");
        (bool sent, ) = address(this).call{value: msg.value, gas: 1000}("");
        require(sent, "fail send ether.");
        emit completeUserBet("success", msg.value);
    }
}
