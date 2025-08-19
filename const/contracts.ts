import client from "@/lib/client";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { FALLBACK_RPC_CONFIG } from "./rpc-config";

/**
 * 1. Set up the network your smart contracts are deployed to.
 * BTTC (BitTorrent Chain) uses chainId 199 with custom RPC.
 */
export const NETWORK = defineChain(FALLBACK_RPC_CONFIG);

/**
 * 2. MarketplaceV3 contract
 * Deploy your own from: https://thirdweb.com/thirdweb.eth/MarketplaceV3
 */
const MARKETPLACE_ADDRESS = "0x858d7849196CF3c1b2F5456aCFBede24c3636186";

export const MARKETPLACE = getContract({
  address: MARKETPLACE_ADDRESS,
  client,
  chain: NETWORK,
});

/**
 * 3. NFT Collection contract
 */
const NFT_COLLECTION_ADDRESS = "0x55106429E0aAD7007bA00149c14C7D0389811b78";

export const NFT_COLLECTION = getContract({
  address: NFT_COLLECTION_ADDRESS,
  client,
  chain: NETWORK,
});

/**
 * 4. Block explorer
 * Use this to link to transaction or contract details.
 */
export const ETHERSCAN_URL = "https://bttcscan.com/";
