import { ApiResponseTrendingCoins } from "../definition/trending-coins.type";

export type Coin = ApiResponseTrendingCoins["coins"][number];
export type Category = ApiResponseTrendingCoins["categories"][number];
export type Nft = ApiResponseTrendingCoins["nfts"][number];
export type Selected = Coin | Category | Nft | null;

export type ContextAssetSelectType = {
	selected: Coin | Category | Nft | null;
	onSelectItem: (item: Selected) => void;
	isCoin: (item: Selected) => item is Coin;
	isCategory: (item: Selected) => item is Category;
	isNFT: (item: Selected) => item is Nft;
};
