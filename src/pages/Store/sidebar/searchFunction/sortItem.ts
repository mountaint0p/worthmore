import { Item } from "../../../../types/Item";
import { StoreSearchValues } from "../../../../types/storeSearchValues";

function sortItem(values: StoreSearchValues, newItemList: Item[]) {
	if (values.sorting === "alphabetical") {
		newItemList.sort((a, b) => {
			if (a.title > b.title) {
				return 1;
			} else if (a.title < b.title) {
				return -1;
			} else {
				return 0;
			}
		});
	} else if (values.sorting === "latest") {
		newItemList.sort((a, b) => {
			if (a.dateAdded < b.dateAdded) {
				return 1;
			} else if (a.dateAdded > b.dateAdded) {
				return -1;
			} else {
				return 0;
			}
		});
	} else if (values.sorting === "oldest") {
		newItemList.sort((a, b) => {
			if (a.dateAdded > b.dateAdded) {
				return 1;
			} else if (a.dateAdded < b.dateAdded) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	return newItemList;
}

export default sortItem;
