import { Item } from "../../../../types/Item";
import { StoreSearchValues } from "../../../../types/storeSearchValues";

function searchTag(values: StoreSearchValues, newItemList: Item[]) {
	if (values.tags.length !== 0) {
		const validTags = values.tags;
		newItemList = newItemList.filter((item) => {
			return item.tags.some((tag) => values.tags.includes(tag));
		});
	}
	return newItemList;
}

export default searchTag;
