export const dynamic = "force-dynamic";
export const revalidate = 0;
import React from "react";
import { MediaRenderer } from "thirdweb/react";
import {
	getAllValidListings,
	getAllValidAuctions,
} from "thirdweb/extensions/marketplace";
import { MARKETPLACE, NFT_COLLECTION } from "@/const/contracts";
import randomColor from "@/util/randomColor";
import { getNFT } from "thirdweb/extensions/erc721";
import client from "@/lib/client";
import BuyListingButton from "@/components/token/BuyListingButton";
import MakeOfferButton from "@/components/token/MakeOfferButton";
import Events from "@/components/token/Events";
import { 
	ClockIcon, 
	PersonIcon,
	EyeOpenIcon,
	HeartIcon,
	Share1Icon
} from "@radix-ui/react-icons";

const [randomColor1, randomColor2] = [randomColor(), randomColor()];

export default async function TokenPage({
	params,
}: {
	params: { contractAddress: string; tokenId: string };
}) {
	const listingsPromise = getAllValidListings({
		contract: MARKETPLACE,
	});
	const auctionsPromise = getAllValidAuctions({
		contract: MARKETPLACE,
	});
	const nftPromise = getNFT({
		contract: NFT_COLLECTION,
		tokenId: BigInt(params.tokenId),
		includeOwner: true,
	});

	const [listings, auctions, nft] = await Promise.all([
		listingsPromise,
		auctionsPromise,
		nftPromise,
	]);

	const directListing = listings?.find(
		(l) =>
			l.assetContractAddress === params.contractAddress &&
			l.tokenId === BigInt(params.tokenId)
	);

	const auctionListing = auctions?.find(
		(a) =>
			a.assetContractAddress === params.contractAddress &&
			a.tokenId === BigInt(params.tokenId)
	);

	// Define NFT trait type for better type safety
	type NFTTrait = {
		trait_type?: string;
		value?: string | number;
	};

	// Format traits for display with proper type safety
	const rawTraits = nft.metadata.attributes;
	const traits: NFTTrait[] = Array.isArray(rawTraits) ? (rawTraits as NFTTrait[]) : [];
	const hasTraits: boolean = traits.length > 0;

	// Format time for auction
	const formatTimeLeft = (endTime: Date) => {
		const now = new Date();
		const diff = endTime.getTime() - now.getTime();
		
		if (diff <= 0) return "Ended";
		
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		
		if (days > 0) return `${days}d ${hours}h`;
		if (hours > 0) return `${hours}h ${minutes}m`;
		return `${minutes}m`;
	};

	const getTimeLeftColor = (endTime: Date) => {
		const now = new Date();
		const diff = endTime.getTime() - now.getTime();
		const hours = diff / (1000 * 60 * 60);
		
		if (hours < 1) return "text-red-500";
		if (hours < 24) return "text-yellow-500";
		return "text-green-500";
	};

	return (
		<div className="min-h-screen pt-32">
			<div className="flex flex-col max-w-7xl gap-8 mx-auto px-4 lg:flex-row">
				{/* Left Column - NFT Image and Details */}
				<div className="flex flex-col flex-1 gap-6">
					{/* NFT Image */}
					<div className="relative">
						<MediaRenderer
							src={nft.metadata.image}
							client={client}
							className="rounded-2xl !w-full bg-white/[.04] shadow-2xl"
						/>
						
						{/* Action buttons overlay */}
						<div className="absolute top-4 right-4 flex gap-2">
							<button 
								className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
								aria-label="Add to favorites"
							>
								<HeartIcon className="w-5 h-5 text-white" />
							</button>
							<button 
								className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
								aria-label="Share NFT"
							>
								<Share1Icon className="w-5 h-5 text-white" />
							</button>
						</div>
					</div>

					{/* NFT Basic Info */}
					<div className="space-y-4">
						<div className="flex items-start justify-between">
							<div>
								<h1 className="text-4xl font-bold text-white mb-2">
									{nft.metadata.name || `#${nft.id}`}
								</h1>
								<p className="text-white/60 text-lg">
									#{nft.id.toString()}
								</p>
							</div>

							{/* Owner Info */}
							{nft.owner && (
								<div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/20">
									<div
										className="w-10 h-10 overflow-hidden border-2 rounded-full opacity-90 border-white/20"
										style={{
											background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
										}}
									/>
									<div className="flex flex-col">
										<p className="text-white/60 text-sm">Current Owner</p>
										<p className="font-medium text-white/90">
											{nft.owner.slice(0, 8)}...{nft.owner.slice(-4)}
										</p>
									</div>
								</div>
							)}
						</div>

						{/* Description */}
						{nft.metadata.description && (
							<div className="p-4 bg-white/10 rounded-lg border border-white/20">
								<h3 className="text-lg font-semibold text-white mb-2">Description</h3>
								<p className="text-white/80 leading-relaxed">
									{nft.metadata.description}
								</p>
							</div>
						)}

						{/* Traits */}
						{hasTraits && (
							<div className="p-4 bg-white/10 rounded-lg border border-white/20">
								<h3 className="text-lg font-semibold text-white mb-4">Traits</h3>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
									{traits.map((trait, index) => (
										<div
											key={index}
											className="p-3 bg-white/5 rounded-lg border border-white/10"
										>
											<p className="text-white/60 text-sm mb-1">
												{trait.trait_type}
											</p>
											<p className="text-white font-medium">
												{trait.value}
											</p>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Additional Metadata */}
						<div className="p-4 bg-white/10 rounded-lg border border-white/20">
							<h3 className="text-lg font-semibold text-white mb-4">Details</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex items-center gap-3">
									<div className="w-5 h-5 flex items-center justify-center text-white/60">
										#
									</div>
									<div>
										<p className="text-white/60 text-sm">Token ID</p>
										<p className="text-white font-medium">#{nft.id.toString()}</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<PersonIcon className="w-5 h-5 text-white/60" />
									<div>
										<p className="text-white/60 text-sm">Contract</p>
										<p className="text-white font-medium font-mono text-sm">
											{params.contractAddress.slice(0, 8)}...{params.contractAddress.slice(-4)}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* History */}
						<div className="p-4 bg-white/10 rounded-lg border border-white/20">
							<h3 className="text-lg font-semibold text-white mb-4">History</h3>
							<Events tokenId={nft.id} />
						</div>
					</div>
				</div>

				{/* Right Column - Pricing and Actions */}
				<div className="flex-shrink w-full lg:w-96">
					<div className="sticky top-32 space-y-6">
						{/* Pricing Information */}
						<div className="p-6 bg-white/10 rounded-2xl border border-white/20">
							<h3 className="text-xl font-semibold text-white mb-4">Pricing</h3>
							
							{directListing ? (
								<div className="space-y-4">
									<div>
										<p className="text-white/60 text-sm mb-1">Current Price</p>
										<div className="text-2xl font-bold text-white">
											{directListing.currencyValuePerToken.displayValue}
											{" " + directListing.currencyValuePerToken.symbol}
										</div>
									</div>
									<div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
										<p className="text-green-400 text-sm font-medium">Direct Listing</p>
									</div>
								</div>
							) : auctionListing ? (
								<div className="space-y-4">
									<div>
										<p className="text-white/60 text-sm mb-1">Buyout Price</p>
										<div className="text-2xl font-bold text-white">
											{auctionListing.buyoutCurrencyValue.displayValue}
											{" " + auctionListing.buyoutCurrencyValue.symbol}
										</div>
									</div>
									<div>
										<p className="text-white/60 text-sm mb-1">Minimum Bid</p>
										<div className="text-lg font-semibold text-white">
											{auctionListing.minimumBidCurrencyValue.displayValue}
											{" " + auctionListing.minimumBidCurrencyValue.symbol}
										</div>
									</div>
									<div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
										<div className="flex items-center gap-2">
											<ClockIcon className="w-4 h-4 text-yellow-400" />
											<p className="text-yellow-400 text-sm font-medium">Auction</p>
										</div>
										{auctionListing.endTimeInSeconds && (
											<p className={`text-sm mt-1 ${getTimeLeftColor(new Date(Number(auctionListing.endTimeInSeconds) * 1000))}`}>
												{formatTimeLeft(new Date(Number(auctionListing.endTimeInSeconds) * 1000))} left
											</p>
										)}
									</div>
								</div>
							) : (
								<div className="text-center py-8">
									<p className="text-white/60 text-lg">Not for sale</p>
									<p className="text-white/40 text-sm mt-2">
										This NFT is not currently listed
									</p>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						{(directListing || auctionListing) && (
							<div className="space-y-4">
								<BuyListingButton
									directListing={directListing}
									auctionListing={auctionListing}
								/>

								<div className="flex items-center gap-4">
									<div className="flex-1 h-px bg-white/20"></div>
									<p className="text-white/60 text-sm">or</p>
									<div className="flex-1 h-px bg-white/20"></div>
								</div>

								<MakeOfferButton
									auctionListing={auctionListing}
									directListing={directListing}
								/>
							</div>
						)}

						{/* Additional Info */}
						<div className="p-4 bg-white/5 rounded-lg border border-white/10">
							<div className="flex items-center gap-3 mb-3">
								<EyeOpenIcon className="w-5 h-5 text-white/60" />
								<p className="text-white/60 text-sm">Collection</p>
							</div>
							<p className="text-white font-medium">VibeCircles NFT Collection</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
