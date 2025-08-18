"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import { useActiveAccount, MediaRenderer } from "thirdweb/react";
import NFTGrid, { NFTGridLoading } from "@/components/NFT/NFTGrid";
import { NFT as NFTType } from "thirdweb";
import { tokensOfOwner, getNFT } from "thirdweb/extensions/erc721";
import SaleInfo from "@/components/SaleInfo";
import client from "@/lib/client";
import { NFT_COLLECTION, MARKETPLACE, NETWORK } from "@/const/contracts";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function Sell() {
	const [loading, setLoading] = useState(false);
	const [ownedNfts, setOwnedNfts] = useState<NFTType[]>([]);
	const [selectedNft, setSelectedNft] = useState<NFTType>();

	const account = useActiveAccount();
	useEffect(() => {
		if (account) {
			setLoading(true);
			console.log("Fetching NFTs for account:", account.address);
			console.log("NFT Collection address:", NFT_COLLECTION.address);
			console.log("Marketplace address:", MARKETPLACE.address);
			console.log("Network:", NETWORK);
			console.log("Client ID available:", !!process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID);
			
			// Try to fetch owned tokens with better error handling
			const fetchOwnedTokens = async () => {
				try {
					const tokenIds = await tokensOfOwner({
						contract: NFT_COLLECTION,
						owner: account.address,
					});
					console.log("Found token IDs:", tokenIds);
					
					if (tokenIds.length === 0) {
						console.log("No NFTs found for this account");
						setOwnedNfts([]);
						return;
					}
					
					// Fetch the actual NFT data for each owned token
					const nftPromises = tokenIds.map((tokenId) =>
						getNFT({
							contract: NFT_COLLECTION,
							tokenId: tokenId,
							includeOwner: true,
						}).catch((error) => {
							console.error(`Error fetching NFT ${tokenId}:`, error);
							return null;
						})
					);
					const nfts = await Promise.all(nftPromises);
					const validNfts = nfts.filter((nft) => nft !== null) as NFTType[];
					console.log("Fetched NFTs:", validNfts);
					setOwnedNfts(validNfts);
				} catch (err: any) {
					console.error("Detailed error fetching owned tokens:", {
						error: err,
						message: err.message,
						code: err.code,
						data: err.data,
						account: account.address,
						contract: NFT_COLLECTION.address
					});
					
					// Provide specific error messages based on the error
					if (err.code === -32000) {
						toast.error(
							"Contract execution failed. The contract might not exist or be incompatible. Please check the contract address.",
							{
								position: "bottom-center",
								style: toastStyle,
							}
						);
					} else if (err.message?.includes("execution reverted")) {
						toast.error(
							"Contract call reverted. This might be due to an incompatible contract or network issues.",
							{
								position: "bottom-center",
								style: toastStyle,
							}
						);
					} else {
						toast.error(
							"Something went wrong while fetching your NFTs!",
							{
								position: "bottom-center",
								style: toastStyle,
							}
						);
					}
				}
			};
			
			fetchOwnedTokens().finally(() => {
				setLoading(false);
			});
		} else {
			setOwnedNfts([]);
		}
	}, [account]);

	return (
		<div>
			<h1 className="text-4xl">Sell NFTs</h1>
			<div className="my-8">
				{!selectedNft ? (
					<>
						{loading ? (
							<NFTGridLoading />
						) : (
							<NFTGrid
								nftData={ownedNfts.map((nft) => ({
									tokenId: nft.id,
									nft: nft,
								}))}
								overrideOnclickBehavior={(nft) => {
									setSelectedNft(nft);
								}}
								emptyText={
									!account
										? "Connect your wallet to list your NFTs!"
										: "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
								}
							/>
						)}
					</>
				) : (
					<div className="flex max-w-full gap-8 mt-0">
						<div className="flex flex-col w-full">
							<div className="relative">
								<MediaRenderer
									client={client}
									src={selectedNft.metadata.image}
									className="rounded-lg !w-full !h-auto bg-white/[.04]"
								/>
								<button
									onClick={() => {
										setSelectedNft(undefined);
									}}
									className="absolute top-0 right-0 m-3 transition-all cursor-pointer hover:scale-110"
								>
									<Cross1Icon className="w-6 h-6" />
								</button>
							</div>
						</div>

						<div className="relative top-0 w-full max-w-full">
							<h1 className="mb-1 text-3xl font-semibold break-words">
								{selectedNft.metadata.name}
							</h1>
							<p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
								#{selectedNft.id.toString()}
							</p>
							<p className="text-white/60">
								You&rsquo;re about to list the following item
								for sale.
							</p>

							<div className="relative flex flex-col flex-1 py-4 overflow-hidden bg-transparent rounded-lg">
								<SaleInfo nft={selectedNft} />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
