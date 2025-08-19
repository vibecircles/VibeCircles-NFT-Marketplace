import { TransactionButton } from "thirdweb/react";
import { setApprovalForAll } from "thirdweb/extensions/erc721";
import toast from "react-hot-toast";
import { ThirdwebContract } from "thirdweb";
import toastStyle from "@/util/toastConfig";

type Props = {
  marketplaceContract: ThirdwebContract;
  collectionContract: ThirdwebContract;
};

export default function ApprovalButton({ marketplaceContract, collectionContract }: Props) {
  return (
    <TransactionButton
      transaction={() => {
        return setApprovalForAll({
          contract: collectionContract,
          operator: marketplaceContract.address,
          approved: true,
        });
      }}
      onTransactionSent={() => {
        toast.loading("Approving...", {
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onError={(error) => {
        toast(`Approval Failed!`, {
          icon: "❌",
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
      onTransactionConfirmed={(txResult) => {
        toast("Approval successful.", {
          icon: "👍",
          id: "approve",
          style: toastStyle,
          position: "bottom-center",
        });
      }}
    >
			Approve
    </TransactionButton>
  );
}
