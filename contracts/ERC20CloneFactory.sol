
/**
 * SPDX-License-Identifier: MIT
 */

pragma solidity ^0.8.0;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {ERC20Impl} from "./ERC20Impl.sol";

contract ERC20CloneFactory {

  address immutable public erc20Implementation;

  event ContractCreated(address indexed contractAddress, string indexed typeName);

  constructor(address _erc20Implementation) {
    erc20Implementation = _erc20Implementation;
  }
  
  function predict(bytes32 salt) external view returns (address) {
    return Clones.predictDeterministicAddress(erc20Implementation, salt);
  }

  function create(string calldata  name, string calldata symbol, string calldata _salt) external returns (ERC20Impl) {
    bytes32 salt = bytes32(uint256(keccak256(abi.encodePacked(_salt))));
    address payable instance = payable(Clones.cloneDeterministic(erc20Implementation, salt));
    ERC20Impl(instance).initialize(name, symbol);
    emit ContractCreated(instance, "ERC20Impl");
    return ERC20Impl(instance);
  }
}
