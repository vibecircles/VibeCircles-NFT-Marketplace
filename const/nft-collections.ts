import { ThirdwebContract } from "thirdweb";
import { bttc, ethereum, polygon, bsc, avalanche } from "./chains";
import client from "@/lib/client";
import { getContract } from "thirdweb";

export type NFTCollection = {
  address: string;
  chain: any;
  name: string;
  description?: string;
  image?: string;
};

// Configure your NFT collections here
export const NFT_COLLECTIONS: NFTCollection[] = [
  {
    address: "0x55106429E0aAD7007bA00149c14C7D0389811b78", // Your VibeCircles collection
    chain: bttc,
    name: "VibeCircles NFT Collection",
    description: "Exclusive Vibes - One-Of-A-Kind NFTs with distinct identity and vibe",
    image: "/logo.png",
  },
  // Add more NFT collections for other chains as needed
  // {
  //   address: "your-ethereum-collection-address",
  //   chain: ethereum,
  //   name: "Your Ethereum Collection",
  //   description: "Description of your Ethereum collection",
  //   image: "/ethereum-collection.png",
  // },
];

// Helper function to get NFT collection contract instances
export function getNFTCollection(address: string, chain: any): ThirdwebContract {
  return getContract({
    address,
    client,
    chain,
  });
}

// Get all NFT collection contract instances
export function getAllNFTCollections(): ThirdwebContract[] {
  return NFT_COLLECTIONS.map(({ address, chain }) =>
    getNFTCollection(address, chain)
  );
}

// Get NFT collection by address
export function getNFTCollectionByAddress(address: string): NFTCollection | undefined {
  return NFT_COLLECTIONS.find(collection => collection.address.toLowerCase() === address.toLowerCase());
}
