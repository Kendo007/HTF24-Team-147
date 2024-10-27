// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;

import {DeployFreelanceMarketplace} from "../../script/DeployFreelanceMarketplace.s.sol";
import {Test, console} from "forge-std/Test.sol";
import {FreelanceMarketplace} from "../../src/FreelanceMarketplace.sol";

contract FundMeTest is Test {
    FreelanceMarketplace marketplace;
    address USER = makeAddr("Kendo");
    uint256 USER_BALANCE = 100e18;

    function setUp() external {
        // This function is called before each test function
        DeployFreelanceMarketplace deploy = new DeployFreelanceMarketplace();
        marketplace = deploy.run();
        vm.deal(USER, USER_BALANCE);
    }

    function testProjectCreatedSuccessfully() public {
        uint256 projectId = 1;
        uint256 amount = 1e18;

        uint256 marketplaceBalance = address(marketplace).balance;

        vm.prank(USER);
        marketplace.createProject{value: amount}(projectId);
        
        assertEq(marketplace.getProject(1).client, USER);
        assertEq(marketplace.getProject(1).amount, amount);
        assertEq(address(marketplace).balance, marketplaceBalance + amount);
        assertEq(USER.balance, USER_BALANCE - amount);
    }

    function testProjectCreationFailedDueToProjectExists() public {
        uint256 projectId = 1;
        uint256 amount = 1e18;

        vm.prank(USER);
        marketplace.createProject{value: amount}(projectId);
        
        vm.expectRevert(FreelanceMarketplace.FreelanceMarketplace__ProjectExists.selector);
        vm.prank(USER);
        marketplace.createProject{value: amount}(projectId);
    }

    function testProjectCreationFailedDueToInsufficientFunds() public {
        vm.expectRevert(FreelanceMarketplace.FreelanceMarketplace__AmountZero.selector);  

        vm.prank(USER);
        marketplace.createProject{value: 0}(1);
    }

    modifier projectCreated() {
        vm.prank(USER);
        marketplace.createProject{value: 1e18}(1);
        _;
    }

    function testFreeLancerApplyForProject() public projectCreated {
        address freelancer1 = makeAddr("Freelancer1");
        address freelancer2 = makeAddr("Freelancer2");

        vm.prank(freelancer1);
        marketplace.applyForProject(1);

        vm.prank(freelancer2);
        marketplace.applyForProject(1);
        
        assertEq(marketplace.getProject(1).freelancers.length, 2);
        assertEq(marketplace.getProject(1).freelancers[0], freelancer1);
        assertEq(marketplace.getProject(1).freelancers[1], freelancer2);
    }

    function testOneLancerMultipleApplyForProject() public projectCreated {
        address client = makeAddr("Client");
        vm.deal(client, 100e18);

        vm.prank(client);
        marketplace.createProject{value: 10e18}(2);

        address freelancer = makeAddr("Freelancer");

        vm.startPrank(freelancer);
        marketplace.applyForProject(1);
        marketplace.applyForProject(2);
        vm.stopPrank();
        
        assertEq(marketplace.getProject(1).freelancers[0], freelancer);
        assertEq(marketplace.getProject(2).freelancers[0], freelancer);
    }

    function testAllocationFailedDueToDifferentClient() public projectCreated {
        address client = makeAddr("Client");
        vm.deal(client, 100e18);

        vm.prank(client);
        marketplace.createProject{value: 10e18}(2);

        address freelancer = makeAddr("Freelancer");

        vm.prank(freelancer);
        marketplace.applyForProject(2);

        vm.expectRevert(FreelanceMarketplace.FreelanceMarketplace__OnlyClientCanPerformAction.selector);
        vm.prank(USER);
        marketplace.allocateFreelancer(2, freelancer);
    }

    function testFreeLancerAllocatedSuccessfully() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        assertEq(marketplace.getProject(1).freelancer, freelancer);
    }

    function testAmountIncreased() public projectCreated {
        uint256 amount = 1e17;

        vm.prank(USER);
        marketplace.increaseProjectAmount{value: amount}(1);
        
        assertEq(marketplace.getProject(1).amount, 11e17);
        assertEq(USER.balance, USER_BALANCE - 1e17 - 1e18);
    }

    function testAmountDecreasedAfterAllocatingFreelancer() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        vm.expectRevert(FreelanceMarketplace.FreelanceMarketplace__ProjectIsDoneOrAllocated.selector);
        vm.prank(USER);
        marketplace.decreaseProjectAmount(1, 1e17);
    }

    function testAmountDecreasedBeforeAllocatingFreelancer() public projectCreated {
        vm.prank(USER);
        marketplace.decreaseProjectAmount(1, 1e17);
        
        assertEq(marketplace.getProject(1).amount, 9e17);
        assertEq(USER.balance, USER_BALANCE + 1e17 - 1e18);
    }

    function testJobCompleted() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        vm.prank(freelancer);
        marketplace.completeProject(1);
        
        assert(marketplace.getProject(1).status == FreelanceMarketplace.JobStatus.Completed);
    }

    function testDeleteProjectIfNotInProgress() public projectCreated {
        vm.prank(USER);
        marketplace.deleteProject(1);
        
        assertEq(marketplace.getProject(1).amount, 0);
        assertEq(marketplace.getProject(1).client, address(0));
    }

    function testDeleteProjectIfInProgress() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        vm.expectRevert(FreelanceMarketplace.FreelanceMarketplace__ProjectIsDoneOrAllocated.selector);
        vm.prank(USER);
        marketplace.deleteProject(1);
    }

    function testDeleteProjectIfInCompleted() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        vm.prank(freelancer);
        marketplace.completeProject(1);
        
        vm.prank(USER);
        marketplace.deleteProject(1);
    }

    function testOnlyClientCanReleaseFunds() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        vm.prank(freelancer);
        marketplace.completeProject(1);
        
        uint256 marketplaceBalance = address(marketplace).balance;
        vm.prank(USER);
        marketplace.releaseFunds(1, 1e18);

        assertEq(USER.balance, USER_BALANCE - 1e18);
        assertEq(marketplace.getProject(1).amount, 0);
        assertEq(freelancer.balance, 1e18);
        assertEq(marketplaceBalance - 1e18, address(marketplace).balance);
    }

    function testOnlyClientCanReleaseFundsFail() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        vm.prank(freelancer);
        marketplace.completeProject(1);
        
        vm.expectRevert(FreelanceMarketplace.FreelanceMarketplace__OnlyClientCanPerformAction.selector);
        vm.prank(freelancer);
        marketplace.releaseFunds(1, 1e18);
    }

    function testMultipleReleaseFail() public projectCreated {
        address freelancer = makeAddr("Freelancer");

        vm.prank(USER);
        marketplace.allocateFreelancer(1, freelancer);
        
        vm.prank(freelancer);
        marketplace.completeProject(1);
        
        vm.prank(USER);
        marketplace.releaseFunds(1, 1e18);

        vm.expectRevert(FreelanceMarketplace.FreelanceMarketplace__AmountExceedsProjectAmount.selector);
        vm.prank(USER);
        marketplace.releaseFunds(1, 1e18);
    }

    function testFinalBigWithMultipleUsersAndFreelancers() public {
        /** freelancers */
        address freelancer1 = makeAddr("Freelancer1"); 
        address freelancer2 = makeAddr("Freelancer2");
        address freelancer3 = makeAddr("Freelancer3");

        /** clients */
        address client1 = makeAddr("Client1"); vm.deal(client1, 100e18);
        address client2 = makeAddr("Client2"); vm.deal(client2, 100e18);
        address client3 = makeAddr("Client3"); vm.deal(client3, 100e18);

        /** project ids */
        uint256 projectId1 = 1;
        uint256 projectId2 = 2;
        uint256 projectId3 = 3;

        vm.prank(client1);
        marketplace.createProject{value: 1e18}(projectId1);

        vm.prank(client2);
        marketplace.createProject{value: 3e18}(projectId2);

        vm.prank(client3);
        marketplace.createProject{value: 4e18}(projectId3);

        vm.startPrank(freelancer1);
        marketplace.applyForProject(projectId1);
        marketplace.applyForProject(projectId2);
        vm.stopPrank();

        vm.startPrank(freelancer2);
        marketplace.applyForProject(projectId1);
        marketplace.applyForProject(projectId3);
        vm.stopPrank();

        vm.startPrank(freelancer3);
        marketplace.applyForProject(projectId2);
        vm.stopPrank();

        vm.prank(client1);
        marketplace.allocateFreelancer(projectId1, freelancer1);

        vm.prank(client2);
        marketplace.allocateFreelancer(projectId2, freelancer2);

        vm.prank(client3);
        marketplace.allocateFreelancer(projectId3, freelancer3);

        vm.prank(freelancer1);
        marketplace.completeProject(projectId1);

        vm.prank(freelancer2);
        marketplace.completeProject(projectId2);

        vm.prank(freelancer3);
        marketplace.completeProject(projectId3);

        vm.prank(client1);
        marketplace.releaseFunds(projectId1, 1e18);

        vm.prank(client2);
        marketplace.releaseFunds(projectId2, 3e18);

        vm.prank(client3);
        marketplace.releaseFunds(projectId3, 4e18);

        assertTrue(marketplace.getProject(projectId1).status == FreelanceMarketplace.JobStatus.Completed);
        assertTrue(marketplace.getProject(projectId2).status == FreelanceMarketplace.JobStatus.Completed);
        assertTrue(marketplace.getProject(projectId3).status == FreelanceMarketplace.JobStatus.Completed);
    }

    function testETHToUSDConversion() public projectCreated {
        console.log("ETH to USD conversion rate: ", marketplace.getProjectAmountInUSD(1));
    }
}