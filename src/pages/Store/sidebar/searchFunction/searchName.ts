import Fuse from "fuse.js";
import { Item } from "../../../../types/Item";
import { StoreSearchValues } from "../../../../types/storeSearchValues";

function searchName(values: StoreSearchValues, newItemList: Item[]) {
	if (values.search.trim().length === 0) {
		return newItemList;
	}
	const fuseOptions = {
		keys: ["title"],
	};
	const fuse = new Fuse(newItemList, fuseOptions);
	if (values.search.length !== 0) {
		newItemList = fuse.search(values.search).map((search) => {
			return search.item;
		});
	}
	return newItemList;
}

export default searchName;
