import { ThirdwebContract } from "thirdweb";
import { bttc, ethereum, polygon, bsc, avalanche } from "./chains";
import client from "@/lib/client";
import { getContract } from "thirdweb";

export type MarketplaceContract = {
  address: string;
  chain: any;
};

// Configure your marketplace contracts here
export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "0x858d7849196CF3c1b2F5456aCFBede24c3636186", // Your BTTC marketplace
    chain: bttc,
  },
  // Add more marketplace contracts for other chains as needed
  // {
  //   address: "your-ethereum-marketplace-address",
  //   chain: ethereum,
  // },
  // {
  //   address: "your-polygon-marketplace-address", 
  //   chain: polygon,
  // },
];

// Helper function to get marketplace contract instances
export function getMarketplaceContract(address: string, chain: any): ThirdwebContract {
  return getContract({
    address,
    client,
    chain,
  });
}

// Get all marketplace contract instances
export function getAllMarketplaceContracts(): ThirdwebContract[] {
  return MARKETPLACE_CONTRACTS.map(({ address, chain }) =>
    getMarketplaceContract(address, chain)
  );
}
