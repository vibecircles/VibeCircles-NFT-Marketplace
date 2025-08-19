# VibeCircles NFT Marketplace

A modern, multi-chain NFT marketplace built with Next.js and thirdweb, specifically designed for the VibeCircles NFT collection.

## ✨ Features

- **Multi-Chain Support**: Support for multiple blockchain networks (BTTC, Ethereum, Polygon, BSC, Avalanche, etc.)
- **Multiple Collections**: Support for multiple NFT collections across different chains
- **Multiple Marketplaces**: Support for multiple marketplace contracts
- **Enhanced Payment Options**: Support for multiple ERC20 tokens as payment
- **Direct Listings**: List NFTs for sale at a fixed price
- **Auction Listings**: Create auctions with minimum bid and buyout prices
- **Responsive Design**: Modern, mobile-friendly UI
- **Real-time Updates**: Live updates for listings and auctions
- **Profile Pages**: Public profile pages for users
- **Collection Stats**: Detailed statistics for NFT collections

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- A thirdweb account and client ID

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd VibeCircles-NFT-Marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID="your-thirdweb-client-id"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Adding New Chains

1. **Update chain configuration** in `const/chains.ts`:
   ```typescript
   export { ethereum, polygon, bsc, avalanche } from "thirdweb/chains";
   ```

2. **Add marketplace contract** in `const/marketplace-contracts.ts`:
   ```typescript
   export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
     {
       address: "your-marketplace-address",
       chain: ethereum,
     },
   ];
   ```

3. **Add NFT collection** in `const/nft-collections.ts`:
   ```typescript
   export const NFT_COLLECTIONS: NFTCollection[] = [
     {
       address: "your-collection-address",
       chain: ethereum,
       name: "Your Collection Name",
     },
   ];
   ```

### Adding Payment Tokens

Configure supported payment tokens in `const/supported-tokens.ts`:
```typescript
export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: ethereum,
    tokens: [
      {
        tokenAddress: "0x...",
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
      },
    ],
  },
];
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── buy/               # Buy NFTs page
│   ├── sell/              # Sell NFTs page
│   ├── token/             # Individual NFT pages
│   └── profile/           # User profile pages
├── components/            # React components
│   ├── NFT/              # NFT display components
│   ├── SaleInfo/         # Listing creation components
│   ├── ListingGrid/      # Marketplace grid components
│   └── ...               # Other UI components
├── const/                # Configuration files
│   ├── chains.ts         # Chain definitions
│   ├── contracts.ts      # Contract configurations
│   ├── marketplace-contracts.ts  # Marketplace contracts
│   ├── nft-collections.ts # NFT collections
│   └── supported-tokens.ts # Payment tokens
└── lib/                  # Utility libraries
    └── client.ts         # thirdweb client configuration
```

## 🎨 Customization

### Styling
- The project uses Tailwind CSS for styling
- Custom styles can be added in `globals.css`
- Component-specific styles are in their respective `.module.css` files

### Components
- All components are modular and reusable
- Props are well-typed with TypeScript
- Components follow React best practices

### Configuration
- All configuration is centralized in the `const/` directory
- Easy to add new chains, collections, and payment methods
- Backward compatibility is maintained

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables**
4. **Deploy**

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔗 Links

- **Live Demo**: [Your deployed URL]
- **Documentation**: [thirdweb docs](https://portal.thirdweb.com/)
- **Template Source**: [thirdweb marketplace template](https://github.com/thirdweb-example/marketplace-template)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

- **Documentation**: Check the [UPGRADE_GUIDE.md](UPGRADE_GUIDE.md) for detailed upgrade information
- **Issues**: Create an issue on GitHub
- **Discord**: Join the thirdweb Discord community

---

Built with ❤️ using [thirdweb](https://thirdweb.com/) and [Next.js](https://nextjs.org/)
