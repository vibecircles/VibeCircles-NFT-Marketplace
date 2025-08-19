import { bttc, ethereum, polygon, bsc, avalanche } from "./chains";

export type SupportedToken = {
  tokenAddress: string;
  symbol: string;
  icon: string;
  decimals?: number;
};

export type SupportedTokens = {
  chain: any;
  tokens: SupportedToken[];
};

// Configure supported payment tokens for each chain
export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: bttc,
    tokens: [
      // Add your BTTC tokens here
      // {
      //   tokenAddress: "0x...",
      //   symbol: "USDC",
      //   icon: "/erc20-icons/usdc.png",
      //   decimals: 6,
      // },
    ],
  },
  {
    chain: ethereum,
    tokens: [
      {
        tokenAddress: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8", // USDC on Ethereum
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
        decimals: 6,
      },
      {
        tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT on Ethereum
        symbol: "USDT",
        icon: "/erc20-icons/usdt.png",
        decimals: 6,
      },
    ],
  },
  {
    chain: polygon,
    tokens: [
      {
        tokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC on Polygon
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
        decimals: 6,
      },
    ],
  },
];

// Helper function to get supported tokens for a specific chain
export function getSupportedTokensForChain(chain: any): SupportedToken[] {
  const chainTokens = SUPPORTED_TOKENS.find(tokens => tokens.chain.id === chain.id);
  return chainTokens?.tokens || [];
}

// Helper function to get token by address
export function getTokenByAddress(tokenAddress: string, chain: any): SupportedToken | undefined {
  const chainTokens = getSupportedTokensForChain(chain);
  return chainTokens.find(token => token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase());
}
