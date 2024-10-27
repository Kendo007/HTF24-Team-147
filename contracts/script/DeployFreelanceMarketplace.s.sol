// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.sol";
import {FreelanceMarketplace} from "../src/FreelanceMarketplace.sol";

contract DeployFreelanceMarketplace is Script {

    function run() external returns (FreelanceMarketplace) {
        HelperConfig helper = new HelperConfig();
        address priceFeed = helper.activeConfig();

        vm.startBroadcast();
        FreelanceMarketplace marketplace = new FreelanceMarketplace(priceFeed);
        vm.stopBroadcast();

        return marketplace;
    }
}
