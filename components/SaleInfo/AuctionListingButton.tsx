"use client";
import { NFT as NFTType, ThirdwebContract } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { createAuction } from "thirdweb/extensions/marketplace";
import toastStyle from "@/util/toastConfig";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

type Props = {
	nft: NFTType;
	minimumBidAmount: string;
	buyoutBidAmount: string;
	marketplaceContract: ThirdwebContract;
};

export default function AuctionListingButton({
	nft,
	minimumBidAmount,
	buyoutBidAmount,
	marketplaceContract,
}: Props) {
	const router = useRouter();
	return (
		<TransactionButton
			transaction={() => {
				return createAuction({
					contract: marketplaceContract,
					assetContractAddress: nft.tokenAddress,
					tokenId: nft.id,
					minimumBidAmount,
					buyoutBidAmount,
				});
			}}
			onTransactionSent={() => {
				toast.loading("Listing...", {
					id: "auction",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onError={(error) => {
				toast(`Listing Failed!`, {
					icon: "❌",
					id: "auction",
					style: toastStyle,
					position: "bottom-center",
				});
			}}
			onTransactionConfirmed={(txResult) => {
				toast("Listed Successfully!", {
					icon: "🥳",
					id: "auction",
					style: toastStyle,
					position: "bottom-center",
				});
				router.push(
					`/token/${nft.tokenAddress}/${nft.id.toString()}`
				);
			}}
		>
			List for Auction
		</TransactionButton>
	);
}
