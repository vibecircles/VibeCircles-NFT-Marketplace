"use client";

import React, { useState, useEffect } from "react";
import { useActiveAccount, MediaRenderer } from "thirdweb/react";
import { NFT as NFTType } from "thirdweb";
import { tokensOfOwner, getNFT } from "thirdweb/extensions/erc721";
import { NFT_COLLECTION } from "@/const/contracts";
import client from "@/lib/client";
import { NFTGridLoading } from "@/components/NFT/NFTGrid";
import { Cross1Icon } from "@radix-ui/react-icons";
import SaleInfo from "@/components/SaleInfo";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";

export default function Sales() {
  const [selectedNFT, setSelectedNFT] = useState<NFTType>();
  const [loading, setLoading] = useState(false);
  const [ownedTokenIds, setOwnedTokenIds] = useState<readonly bigint[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<NFTType[]>([]);
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      setLoading(true);
      tokensOfOwner({
        contract: NFT_COLLECTION,
        owner: account.address,
      })
        .then(async (tokenIds) => {
          setOwnedTokenIds(tokenIds);
          
          // Fetch NFT metadata for all owned tokens
          const nftPromises = tokenIds.map(async (tokenId) => {
            try {
              const nft = await getNFT({
                contract: NFT_COLLECTION,
                tokenId: tokenId,
                includeOwner: true,
              });
              return nft;
            } catch (error) {
              console.error(`Failed to fetch NFT ${tokenId}:`, error);
              return null;
            }
          });
          
          const nfts = (await Promise.all(nftPromises)).filter(Boolean) as NFTType[];
          setOwnedNFTs(nfts);
        })
        .catch((err) => {
          toast.error(
            "Something went wrong while fetching your NFTs!",
            {
              position: "bottom-center",
              style: toastStyle,
            }
          );
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [account]);

  if (!account) {
    return (
      <div className="min-h-screen">
        <h1 className="text-4xl mb-8">Sales</h1>
        <div className="text-center py-12">
          <div className="text-white/60 text-lg mb-2">
            Connect your wallet to list your NFTs for sale
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <h1 className="text-4xl mb-8">Sales</h1>
        <NFTGridLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl mb-8">Sales</h1>
      
      {!selectedNFT ? (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Your NFTs
            </h2>
            <p className="text-white/60">
              Select an NFT from your collection to list it for sale
            </p>
          </div>
          
          {ownedNFTs && ownedNFTs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ownedNFTs.map((nft) => (
                <div
                  key={nft.id}
                  className="bg-white/10 border border-white/20 rounded-lg overflow-hidden hover:border-blue-500 transition-all cursor-pointer group"
                  onClick={() => setSelectedNFT(nft)}
                >
                  <div className="relative">
                    <MediaRenderer
                      client={client}
                      src={nft.metadata.image}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1 truncate">
                      {nft.metadata.name || `#${nft.id}`}
                    </h3>
                    <p className="text-white/60 text-sm">
                      #{nft.id}
                    </p>
                    
                    {nft.metadata.description && (
                      <p className="text-white/60 text-sm mt-2 line-clamp-2">
                        {nft.metadata.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-white/60 text-lg mb-2">
                You don&apos;t own any NFTs yet from this collection.
              </div>
              <p className="text-white/40 text-sm">
                Head to the buy page to purchase some NFTs first!
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex max-w-full gap-8 mt-0">
          <div className="flex flex-col w-full">
            <div className="relative">
              <MediaRenderer
                client={client}
                src={selectedNFT.metadata.image}
                className="rounded-lg !w-full !h-auto bg-white/[.04]"
              />
                             <button
                 onClick={() => {
                   setSelectedNFT(undefined);
                 }}
                 className="absolute top-0 right-0 m-3 transition-all cursor-pointer hover:scale-110"
                 aria-label="Close NFT selection"
               >
                 <Cross1Icon className="w-6 h-6" />
               </button>
            </div>
          </div>

          <div className="relative top-0 w-full max-w-full">
            <h1 className="mb-1 text-3xl font-semibold break-words">
              {selectedNFT.metadata.name}
            </h1>
            <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              #{selectedNFT.id.toString()}
            </p>
            <p className="text-white/60">
              You&apos;re about to list the following item for sale.
            </p>

            <div className="relative flex flex-col flex-1 py-4 overflow-hidden bg-transparent rounded-lg">
              <SaleInfo nft={selectedNFT} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
