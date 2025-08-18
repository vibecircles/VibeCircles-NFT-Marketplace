import client from "@/lib/client";
/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// For testing, you can use Mumbai testnet instead of BTTC
// export const NETWORK = defineChain(80001); // Mumbai testnet (chainId 80001)
export const NETWORK = defineChain(199); // BTTC (chainId 199)

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
// OR use thirdweb CLI: npx thirdweb deploy --contract marketplace-v3
const MARKETPLACE_ADDRESS = "0x858d7849196CF3c1b2F5456aCFBede24c3636186"; // REPLACE WITH YOUR MARKETPLACE ADDRESS
export const MARKETPLACE = getContract({
	address: MARKETPLACE_ADDRESS,
	client,
	chain: NETWORK,
});

// 3. The address of your NFT collection smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/NFTCollection
// OR use thirdweb CLI: npx thirdweb deploy --contract nft-collection
const NFT_COLLECTION_ADDRESS = "0x55106429E0aAD7007bA00149c14C7D0389811b78"; // REPLACE WITH YOUR NFT COLLECTION ADDRESS
export const NFT_COLLECTION = getContract({
	address: NFT_COLLECTION_ADDRESS,
	client,
	chain: NETWORK,
});

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://bttcscan.com/";
