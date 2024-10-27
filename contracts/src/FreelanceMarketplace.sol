// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol"; 
import {PriceConverter} from "./PriceConverter.sol";

contract FreelanceMarketplace {
    /** ERRORS */
    error FreelanceMarketplace__OnlyClientCanPerformAction();
    error FreelanceMarketplace__OnlyFreelancerCanPerformAction();
    error FreelanceMarketplace__ProjectExists();
    error FreelanceMarketplace__AmountExceedsProjectAmount();
    error FreelanceMarketplace__ProjectIsDoneOrAllocated();
    error FreelanceMarketplace__AmountZero();
    error FreelanceMarketplace__ProjectAlreadyCompleted();
    error FreelanceMarketplace__ProjectIncomplete();
    error FreelanceMarketplace__TransferFailed();
    error FreelanceMarketplace__NotExists();

    enum JobStatus {
        Open,
        InProgress,
        Completed
    }

    /** STRUCTS */
    struct Project {
        address client;
        address freelancer;
        uint256 amount;
        JobStatus status;
        address[] freelancers;
    }

    /** DATA VARS */
    AggregatorV3Interface s_priceFeed;

    // Mapping of project IDs to Project details
    mapping(uint256 projectID => Project) private projects;
    
    /** EVENTS */
    event ProjectCreated(uint256 indexed projectId, address indexed client, uint256 amount);
    event ProjectFunded(uint256 indexed projectId, uint256 amount);
    event ProjectCompleted(uint256 indexed projectId, address indexed freelancer);

    // Modifier to check only client can call certain functions
    modifier onlyClient(uint256 projectId) {
        if (msg.sender != projects[projectId].client) revert FreelanceMarketplace__OnlyClientCanPerformAction();
        _;
    }

    // Modifier to check only freelancer can call certain functions
    modifier onlyFreelancer(uint256 projectId) {
        if (msg.sender != projects[projectId].freelancer) revert FreelanceMarketplace__OnlyFreelancerCanPerformAction();
        _;
    }

    modifier projectExists(uint256 projectId) {
        if (projects[projectId].client == address(0)) revert FreelanceMarketplace__NotExists();
        _;
    }

    /** FUNCTIONS */
    constructor(address priceFeed) {
        s_priceFeed = AggregatorV3Interface(priceFeed);
    }

    // Function to create a new project
    function createProject(uint256 projectID) public payable {
        if (msg.value <= 0) { revert FreelanceMarketplace__AmountZero(); }

        if (projects[projectID].client != address(0)) { revert FreelanceMarketplace__ProjectExists(); }

        // Create new project
        uint256 projectId = projectID;
        projects[projectId] = Project({
            client: msg.sender,
            freelancer: address(0),
            amount: msg.value,
            status: JobStatus.Open,
            freelancers: new address[](0)
        });

        // Emit project creation event
        emit ProjectCreated(projectId, msg.sender, msg.value);
    }

    // Function for client to increase project amount
    function increaseProjectAmount(uint256 projectId) public onlyClient(projectId) projectExists(projectId) payable {
        if (msg.value <= 0) { revert FreelanceMarketplace__AmountZero(); }

        // Increase project amount
        projects[projectId].amount += msg.value;
    }

    // Function for client to decrease project amount
    function decreaseProjectAmount(uint256 projectId, uint256 amount) public onlyClient(projectId) projectExists(projectId) {
        if (projects[projectId].amount < amount) { revert FreelanceMarketplace__AmountExceedsProjectAmount(); }
        if (projects[projectId].status != JobStatus.Open) { revert FreelanceMarketplace__ProjectIsDoneOrAllocated(); }

        // Decrease project amount
        projects[projectId].amount -= amount;
        (bool success,) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert FreelanceMarketplace__TransferFailed();
        }
    }

    // Function for client to deleteJob project
    function deleteProject(uint256 projectId) public onlyClient(projectId) projectExists(projectId) {
        Project memory project = projects[projectId];
        if (project.status == JobStatus.InProgress) { revert FreelanceMarketplace__ProjectIsDoneOrAllocated(); }
        if (project.status == JobStatus.Completed) { return; }

        // Delete project
        uint256 amount = project.amount;
        delete projects[projectId];

        (bool success,) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert FreelanceMarketplace__TransferFailed();
        }
    }

    function applyForProject(uint256 projectId) public projectExists(projectId) {
        Project storage project = projects[projectId];
        project.freelancers.push(msg.sender);
    }

    // Function for client to allocate project to freelancer
    function allocateFreelancer(uint256 projectId, address freelancer) public onlyClient(projectId) projectExists(projectId) {
        if (projects[projectId].status != JobStatus.Open || projects[projectId].freelancer != address(0)) { 
            revert FreelanceMarketplace__ProjectIsDoneOrAllocated(); 
        }

        projects[projectId].freelancer = freelancer;
        projects[projectId].status = JobStatus.InProgress;
    }

    // Function for freelancer to submit project completion
    function completeProject(uint256 projectId) public onlyFreelancer(projectId) projectExists(projectId) {
        if (projects[projectId].status == JobStatus.Completed) revert FreelanceMarketplace__ProjectAlreadyCompleted();

        // Mark project as completed
        projects[projectId].status = JobStatus.Completed;
        emit ProjectCompleted(projectId, msg.sender);
    }

    // Function for the client to release funds to freelancer after verifying work
    function releaseFunds(uint256 projectId, uint256 amount) public onlyClient(projectId) projectExists(projectId) {
        Project memory project = projects[projectId];
        if (project.freelancer == address(0)) revert FreelanceMarketplace__ProjectIncomplete();
        if (project.amount < amount) revert FreelanceMarketplace__AmountExceedsProjectAmount();

        // Transfer funds to freelancer from smart contract
        (bool success,) = payable(project.freelancer).call{value: amount}("");
        projects[projectId].amount -= amount;

        if (!success) {
            revert FreelanceMarketplace__TransferFailed();
        }

        emit ProjectFunded(projectId, project.amount);
    }

    // Function to get project details
    function getProjectDetails(uint256 projectId) public view projectExists(projectId) returns (address, address, uint256, JobStatus) {
        Project memory project = projects[projectId];
        return (project.client, project.freelancer, project.amount, project.status);
    }

    function getProject(uint256 projectId) public view returns (Project memory) {
        return projects[projectId];
    }

    function getFreelancers(uint256 projectId) public view returns (address[] memory) {
        return projects[projectId].freelancers;
    }

    function getProjectAmountInUSD(uint256 projectId) public view returns (uint256) {
        return PriceConverter.getConversionRate(projects[projectId].amount, s_priceFeed);
    }
}