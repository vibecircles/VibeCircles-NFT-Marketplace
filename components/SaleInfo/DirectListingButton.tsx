"use client";
import { useRouter } from "next/navigation";
import { NFT as NFTType, ThirdwebContract } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { createListing } from "thirdweb/extensions/marketplace";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { revalidatePath } from "next/cache";

type Props = {
	nft: NFTType;
	pricePerToken: string;
	marketplaceContract: ThirdwebContract;
};

export default function DirectListingButton({
	nft,
	pricePerToken,
	marketplaceContract,
}: Props) {
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
					contract: marketplaceContract.address,
					assetContractAddress: nft.tokenAddress,
					tokenId: nft.id.toString(),
					pricePerToken,
				});
				
				return createListing({
					contract: marketplaceContract,
					assetContractAddress: nft.tokenAddress,
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
					`/token/${nft.tokenAddress}/${nft.id.toString()}`
				);
			}}
		>
			List for Sale
		</TransactionButton>
	);
}
