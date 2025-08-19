"use client";
import React, { useEffect, useState } from "react";
import { NFT } from "thirdweb";
import { DirectListing, EnglishAuction } from "thirdweb/extensions/marketplace";
import { MediaRenderer } from "thirdweb/react";
import { getNFT } from "thirdweb/extensions/erc721";
import client from "@/lib/client";
import Skeleton from "@/components/Skeleton";
import { useRouter } from "next/navigation";
import { getNFTCollection } from "@/const/nft-collections";

type Props = {
	tokenId: bigint;
	contractAddress?: string; // Optional: if not provided, will use the first collection
	nft?: NFT;
	directListing?: DirectListing;
	auctionListing?: EnglishAuction;
	overrideOnclickBehavior?: (nft: NFT) => void;
};

export default function NFTComponent({
  tokenId,
  contractAddress,
  directListing,
  auctionListing,
  overrideOnclickBehavior,
  ...props
}: Props) {
  const router = useRouter();
  const [nft, setNFT] = useState(props.nft);
  const [loading, setLoading] = useState(!props.nft);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (nft?.id !== tokenId) {
      setLoading(true);
      setError(null);
      
      // Get the contract address from listing or use provided one
      const targetContractAddress = contractAddress || 
        directListing?.assetContractAddress || 
        auctionListing?.assetContractAddress;

      if (!targetContractAddress) {
        setError("No contract address found");
        setLoading(false);
        return;
      }

      // Get the collection contract - we need to determine the chain from the marketplace
      // For now, we'll use the first collection's chain as fallback
      const collectionContract = getNFTCollection(targetContractAddress, { id: 199 }); // BTTC chain ID

      getNFT({
        contract: collectionContract,
        tokenId: tokenId,
        includeOwner: true,
      }).then((nft) => {
        setNFT(nft);
        setLoading(false);
      }).catch((err) => {
        console.error("Error fetching NFT:", err);
        setError("Failed to load NFT");
        setLoading(false);
      });
    }
  }, [tokenId, nft?.id, contractAddress, directListing?.assetContractAddress, auctionListing?.assetContractAddress]);

  if (loading) {
    return <LoadingNFTComponent />;
  }

  if (error || !nft) {
    return (
      <div className="w-full h-[350px] rounded-lg bg-white/[.04] border border-white/10 flex items-center justify-center">
        <p className="text-white/60 text-center">
          {error || "Failed to load NFT"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg flex flex-col w-full h-[350px] bg-white/[.04] justify-stretch border overflow-hidden border-white/10 rounded-lg"
      onClick={
        overrideOnclickBehavior
          ? () => overrideOnclickBehavior(nft!)
          : () =>
            router.push(
              `/token/${
                contractAddress || directListing?.assetContractAddress || auctionListing?.assetContractAddress || nft.tokenAddress
              }/${tokenId.toString()}`
            )
      }
    >
      <div className="relative w-full h-64 bg-white/[.04]">
        {nft.metadata.image && (
          <MediaRenderer
            src={nft.metadata.image}
            client={client}
            className="object-cover object-center"
          />
        )}
      </div>
      <div className="flex items-center justify-between flex-1 w-full px-3">
        <div className="flex flex-col justify-center py-3">
          <p className="max-w-full overflow-hidden text-lg text-white text-ellipsis whitespace-nowrap">
            {nft.metadata.name}
          </p>
          <p className="text-sm font-semibold text-white/60">
						#{nft.id.toString()}
          </p>
        </div>

        {(directListing || auctionListing) && (
          <div className="flex flex-col items-end justify-center">
            <p className="max-w-full mb-1 overflow-hidden font-medium text-ellipsis whitespace-nowrap text-white/60">
							Price
            </p>
            <p className="max-w-full overflow-hidden text-white text-ellipsis whitespace-nowrap">
              {directListing
                ? `${directListing?.currencyValuePerToken.displayValue}${directListing?.currencyValuePerToken.symbol}`
                : `${auctionListing?.minimumBidCurrencyValue.displayValue}${auctionListing?.minimumBidCurrencyValue.symbol}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function LoadingNFTComponent() {
  return (
    <div className="w-full h-[350px] rounded-lg">
      <Skeleton width="100%" height="100%" />
    </div>
  );
}
