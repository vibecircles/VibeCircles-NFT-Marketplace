import { defineChain } from "thirdweb/chains";
import { FALLBACK_RPC_CONFIG } from "./rpc-config";

// Define your custom chain (BTTC)
export const bttc = defineChain(FALLBACK_RPC_CONFIG);

// Export all supported chains
export { ethereum, polygon, bsc, avalanche, arbitrum, optimism, base, zora } from "thirdweb/chains";
