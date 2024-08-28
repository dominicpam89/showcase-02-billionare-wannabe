import { useContext } from "react";
import { ContextAssetSelect } from "../context/select-asset.context";
import { ContextAssetSelectType } from "../context/select-asset.context.type";

export const useContextAssetSelect = () => {
	const context = useContext(ContextAssetSelect);
	return context as ContextAssetSelectType;
};
