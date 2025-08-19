import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { NFT_COLLECTIONS } from "@/const/nft-collections";
import { MARKETPLACE_CONTRACTS } from "@/const/marketplace-contracts";

/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.
 */
const Home: NextPage = () => {
  return (
    <div className="">
      <div className="flex justify-center p-2">
        <Image
          src="/hero-asset.png"
          width={860}
          height={540}
          alt="Hero asset, NFT marketplace"
          quality={100}
          className="max-w-screen mb-4"
        />
      </div>
      <div className="px-8 mx-auto text-center">
        <h1 className="mb-5 text-black font-bold text-6xl">
          <span className="text-transparent bg-clip-text gradient">
						VibeCircles Marketplace
          </span>
          <br />
					Exclusive Vibes.
        </h1>
        <p className="text-black/60 text-lg max-w-xl mx-auto">
          This exclusive marketplace is dedicated solely to 
         	Vibecircles	NFTs — a unique collection where every 
          NFT is <b>One-Of-A-Kind</b>,{" "}
          <i>crafted with its own distinct identity and vibe.</i>.
        </p>

        {/* Multi-chain Support Info */}
        <div className="mt-8 p-6 bg-white/10 rounded-lg border border-white/20 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-3">Multi-Chain Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/60 mb-2">Supported Collections:</p>
              <div className="space-y-1">
                {NFT_COLLECTIONS.map((collection, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white">{collection.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/60 mb-2">Marketplace Contracts:</p>
              <div className="space-y-1">
                {MARKETPLACE_CONTRACTS.map((marketplace, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">{marketplace.chain.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-lg font-medium items-center mt-12 gap-4">
          <Link
            className="w-56 p-3 rounded-lg transition-all hover:shadow-lg gradient border-white/10 border"
            href="/buy"
          >
						Browse NFTs
          </Link>
          <Link
            className="w-56 p-3 rounded-lg bg-white/[.04] transition-all hover:bg-white/[.06] border-white/10 border"
            href="/sell"
          >
						Sell NFTs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
