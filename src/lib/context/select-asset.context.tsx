import { createContext, useState } from "react";
import {
	ContextAssetSelectType,
	Category,
	Coin,
	Nft,
	Selected,
} from "./select-asset.context.type";

function isCoin(item: Selected): item is Coin {
	return (item as Coin)?.item !== undefined;
}

function isCategory(item: Selected): item is Category {
	return (item as Category)?.coins_count !== undefined;
}

function isNFT(item: Selected): item is Nft {
	return (item as Nft)?.nft_contract_id !== undefined;
}

export const ContextAssetSelect = createContext<ContextAssetSelectType | {}>(
	{}
);

interface Props {
	children: React.ReactNode;
}
export default function ContextAssetSelectProvider({ children }: Props) {
	const [selected, setSelected] = useState<Coin | Category | Nft | null>(null);
	const onSelectItem = (item: Selected) => setSelected(item);
	const contextValue = { selected, onSelectItem, isCoin, isCategory, isNFT };
	return (
		<ContextAssetSelect.Provider value={contextValue}>
			{children}
		</ContextAssetSelect.Provider>
	);
}
