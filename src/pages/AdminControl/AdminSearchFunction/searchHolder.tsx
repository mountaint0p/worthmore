import Fuse from "fuse.js";
import { AdminSearchValues } from "../../../types/adminSearchValues";
import { Item } from "../../../types/Item";

function searchHolder(values: AdminSearchValues, newItemList: Item[]) {
	if (values.holder.trim().length === 0) {
		return newItemList;
	}
	const fuseOptions = {
		keys: ["users.name"],
	};
	const fuse = new Fuse(newItemList, fuseOptions);
	newItemList = fuse.search(values.holder).map((search) => {
		return search.item;
	});
	return newItemList;
}

export default searchHolder;
