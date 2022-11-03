import Fuse from "fuse.js";

function searchHolder(values, newItemList) {
	if (values.search.trim().length === 0) {
		return newItemList;
	}
	const fuseOptions = {
		keys: ["holderName"],
	};
	const fuse = new Fuse(newItemList, fuseOptions);
	newItemList = fuse.search(values.holder).map((search) => {
		return search.item;
	});
	return newItemList;
}

export default searchHolder;
