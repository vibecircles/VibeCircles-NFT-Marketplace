export const dynamic = "force-dynamic";
export const revalidate = 0;
import React, { Suspense } from "react";
import { NFTGridLoading } from "@/components/NFT/NFTGrid";
import ListingGrid from "@/components/ListingGrid/ListingGrid";

export default function Buy() {
	return (
		<div className="">
			<h1 className="text-4xl">Buy NFTs</h1>

			<div className="my-8">
				<Suspense fallback={<NFTGridLoading />}>
					<ListingGrid
						emptyText={
							"Looks like there are no listed NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
						}
					/>
				</Suspense>
			</div>
		</div>
	);
}
