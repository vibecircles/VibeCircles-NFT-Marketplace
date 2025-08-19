import client from "@/lib/client";
import { getContract } from "thirdweb";
import { bttc } from "./chains";
import { MARKETPLACE_CONTRACTS, getMarketplaceContract } from "./marketplace-contracts";
import { NFT_COLLECTIONS, getNFTCollection } from "./nft-collections";

/**
 * Legacy exports for backward compatibility
 * These will use the first marketplace and collection from the new configuration
 */

// Primary marketplace (first one in the list)
export const MARKETPLACE = getMarketplaceContract(
  MARKETPLACE_CONTRACTS[0].address,
  MARKETPLACE_CONTRACTS[0].chain
);

// Primary NFT collection (first one in the list)
export const NFT_COLLECTION = getNFTCollection(
  NFT_COLLECTIONS[0].address,
  NFT_COLLECTIONS[0].chain
);

// Network (using the primary chain)
export const NETWORK = bttc;

/**
 * Block explorer URLs for different chains
 */
export const BLOCK_EXPLORER_URLS = {
  [bttc.id]: "https://bttcscan.com/",
  // Add more block explorer URLs as needed
  // 1: "https://etherscan.io/", // Ethereum
  // 137: "https://polygonscan.com/", // Polygon
  // 56: "https://bscscan.com/", // BSC
  // 43114: "https://snowtrace.io/", // Avalanche
};

// Legacy export for backward compatibility
export const ETHERSCAN_URL = BLOCK_EXPLORER_URLS[bttc.id];

/**
 * Helper function to get block explorer URL for a chain
 */
export function getBlockExplorerUrl(chainId: number): string {
  return BLOCK_EXPLORER_URLS[chainId] || "https://etherscan.io/";
}
