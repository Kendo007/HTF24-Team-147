.PHONY: all test clean deploy fund help install snapshot format anvil

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops@0.2.2 --no-commit && forge install smartcontractkit/chainlink-brownie-contracts@1.1.1 --no-commit && forge install foundry-rs/forge-std@v1.8.2 --no-commit && forge install transmissions11/solmate@v6 --no-commit

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --account localKey --sender $(SENDER) --password $(PASSWORD) --broadcast

ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --account ethSepKey --sender $(SEPOLIA_SENDER) --password $(PASSWORD) --broadcast -vvvv
endif

deploy:
	@forge script script/DeployFreelanceMarketplace.s.sol:DeployFreelanceMarketplace $(NETWORK_ARGS)

deploy-sepolia:
	@forge script script/DeployFreelanceMarketplace.s.sol:DeployFreelanceMarketplace --rpc-url $(SEPOLIA_RPC_URL) --account ethSepKey --sender $(SEPOLIA_SENDER) --password $(PASSWORD) --broadcast -vvvv