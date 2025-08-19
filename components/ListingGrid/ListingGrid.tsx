import {
  getAllValidAuctions,
  getAllValidListings,
} from "thirdweb/extensions/marketplace";
import { NFT as NFTType, ThirdwebContract } from "thirdweb";
import React, { Suspense } from "react";
import { MARKETPLACE_CONTRACTS, getAllMarketplaceContracts } from "../../const/marketplace-contracts";
import { NFT_COLLECTIONS, getAllNFTCollections } from "../../const/nft-collections";
import NFTGrid, { NFTGridLoading } from "../NFT/NFTGrid";

type Props = {
	marketplace?: ThirdwebContract;
	collection?: ThirdwebContract;
	overrideOnclickBehavior?: (nft: NFTType) => void;
	emptyText: string;
	chainId?: number; // Optional: filter by specific chain
};

export default async function ListingGrid(props: Props) {
  // If specific marketplace and collection are provided, use them
  // Otherwise, get all marketplaces and collections
  const marketplaces = props.marketplace 
    ? [props.marketplace] 
    : getAllMarketplaceContracts();
  
  const collections = props.collection 
    ? [props.collection] 
    : getAllNFTCollections();

  // Get all listings and auctions from all marketplaces
  const allListingsPromises = marketplaces.map(marketplace =>
    getAllValidListings({ contract: marketplace })
  );
  
  const allAuctionsPromises = marketplaces.map(marketplace =>
    getAllValidAuctions({ contract: marketplace })
  );

  const [allListingsResults, allAuctionsResults] = await Promise.all([
    Promise.all(allListingsPromises),
    Promise.all(allAuctionsPromises),
  ]);

  // Flatten all listings and auctions
  const allListings = allListingsResults.flat();
  const allAuctions = allAuctionsResults.flat();

  // Get collection addresses
  const collectionAddresses = collections.map(collection => collection.address);

  // Filter listings and auctions by supported collections
  const filteredListings = allListings.filter(listing =>
    collectionAddresses.includes(listing.assetContractAddress as string)
  );

  const filteredAuctions = allAuctions.filter(auction =>
    collectionAddresses.includes(auction.assetContractAddress as string)
  );

  // If chainId is specified, filter by chain
  const finalListings = props.chainId 
    ? filteredListings.filter(listing => {
        const marketplace = MARKETPLACE_CONTRACTS.find(m => m.address === listing.currencyContractAddress as string);
        return marketplace?.chain.id === props.chainId;
      })
    : filteredListings;

  const finalAuctions = props.chainId 
    ? filteredAuctions.filter(auction => {
        const marketplace = MARKETPLACE_CONTRACTS.find(m => m.address === auction.currencyContractAddress as string);
        return marketplace?.chain.id === props.chainId;
      })
    : filteredAuctions;

  // Retrieve all NFTs from the listings
  const tokenIds = Array.from(
    new Set([
      ...finalListings.map((l) => l.tokenId),
      ...finalAuctions.map((a) => a.tokenId),
    ])
  );

  const nftData = tokenIds.map((tokenId) => {
    // Find the listing or auction to get the contract address
    const listing = finalListings.find((l) => l.tokenId === tokenId);
    const auction = finalAuctions.find((a) => a.tokenId === tokenId);
    
    return {
      tokenId: tokenId,
      contractAddress: listing?.assetContractAddress || auction?.assetContractAddress,
      directListing: listing,
      auctionListing: auction,
    };
  });

  return (
    <Suspense fallback={<NFTGridLoading />}>
      <NFTGrid
        nftData={nftData}
        emptyText={props.emptyText}
        overrideOnclickBehavior={props.overrideOnclickBehavior}
      />
    </Suspense>
  );
}
