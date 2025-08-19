/**
 * BTTC RPC Configuration
 * Multiple endpoints for better reliability and fallback options
 */

export const BTTC_RPC_ENDPOINTS = {
  // Primary RPC endpoints
  primary: "https://rpc.bt.io",
  secondary: "https://bttc.getblock.io",
  
  // Alternative endpoints
  alternatives: [
    "https://bttc.publicnode.com",
    "https://bttc.drpc.org",
    "https://bttc.meowrpc.com",
  ],
  
  // Testnet endpoints
  testnet: "https://test-rpc.bittorrentchain.io",
};

/**
 * Get the best available RPC endpoint
 * You can implement health checks here
 */
export function getBestRPCEndpoint(): string {
  // For now, return the primary endpoint
  // You can add health check logic here
  return BTTC_RPC_ENDPOINTS.primary;
}

/**
 * Fallback RPC configuration
 */
export const FALLBACK_RPC_CONFIG = {
  id: 199,
  name: "BitTorrent Chain",
  nativeCurrency: {
    name: "BitTorrent",
    symbol: "BTT",
    decimals: 18,
  },
  rpc: getBestRPCEndpoint(),
  blockExplorers: [
    {
      name: "BTTCScan",
      url: "https://bttcscan.com",
    },
  ],
};
