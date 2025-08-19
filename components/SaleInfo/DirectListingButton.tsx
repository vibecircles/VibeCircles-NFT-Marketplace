"use client";
import { useRouter } from "next/navigation";
import { NFT as NFTType } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import toast from "react-hot-toast";
import { MARKETPLACE, NFT_COLLECTION } from "@/const/contracts";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

export default function DirectListingButton({
	nft,
	pricePerToken,
}: {
	nft: NFTType;
	pricePerToken: string;
}) {
	const router = useRouter();
	return (
		<TransactionButton
			transaction={() => {
				// Validate inputs before creating listing
				if (!pricePerToken || parseFloat(pricePerToken) <= 0) {
					throw new Error("Please enter a valid price");
				}
				
				if (!nft.id) {
					throw new Error("Invalid NFT");
				}
				
				console.log("Creating listing with:", {
					contract: MARKETPLACE.address,
					assetContractAddress: NFT_COLLECTION.address,
					tokenId: nft.id.toString(),
					pricePerToken,
				});
				
				return createListing({
					contract: MARKETPLACE,
					assetContractAddress: NFT_COLLECTION.address,
					tokenId: nft.id,
					pricePerToken,
				});
			}}
			onTransactionSent={() => {
				toast.loading("Listing...", {
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onError={(error) => {
				console.error("Direct listing error:", error);
				
				// Provide more specific error messages
				let errorMessage = "Listing Failed!";
				if (error.message?.includes("execution reverted")) {
					errorMessage = "Transaction failed. Check your BTT balance and try again.";
				} else if (error.message?.includes("insufficient funds")) {
					errorMessage = "Insufficient BTT for gas fees. Please add more BTT to your wallet.";
				} else if (error.message?.includes("user rejected")) {
					errorMessage = "Transaction was cancelled.";
				}
				
				toast(errorMessage, {
					icon: "❌",
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onTransactionConfirmed={(txResult) => {
				toast("Listed Successfully!", {
					icon: "🥳",
					id: "direct",
					style: toastStyle,
					position: "bottom-center",
				});
				router.push(
					`/token/${NFT_COLLECTION.address}/${nft.id.toString()}`
				);
			}}
		>
			List for Sale
		</TransactionButton>
	);
}
