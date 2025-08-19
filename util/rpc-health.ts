/**
 * RPC Health Check Utility
 * Checks RPC endpoint health and provides fallback options
 */

import { BTTC_RPC_ENDPOINTS } from "@/const/rpc-config";

/**
 * Test RPC endpoint health
 */
export async function testRPCEndpoint(rpcUrl: string): Promise<boolean> {
  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.result && data.result !== '0x0';
  } catch (error) {
    console.error(`RPC health check failed for ${rpcUrl}:`, error);
    return false;
  }
}

/**
 * Get the best available RPC endpoint
 */
export async function getHealthyRPCEndpoint(): Promise<string> {
  const endpoints = [
    BTTC_RPC_ENDPOINTS.primary,
    BTTC_RPC_ENDPOINTS.secondary,
    ...BTTC_RPC_ENDPOINTS.alternatives,
  ];

  for (const endpoint of endpoints) {
    const isHealthy = await testRPCEndpoint(endpoint);
    if (isHealthy) {
      console.log(`Using healthy RPC endpoint: ${endpoint}`);
      return endpoint;
    }
  }

  // If all endpoints fail, return the primary as fallback
  console.warn('All RPC endpoints failed, using primary as fallback');
  return BTTC_RPC_ENDPOINTS.primary;
}

/**
 * Monitor RPC health and log issues
 */
export function monitorRPCHealth(rpcUrl: string): void {
  setInterval(async () => {
    const isHealthy = await testRPCEndpoint(rpcUrl);
    if (!isHealthy) {
      console.warn(`RPC endpoint ${rpcUrl} appears to be unhealthy`);
    }
  }, 30000); // Check every 30 seconds
}
