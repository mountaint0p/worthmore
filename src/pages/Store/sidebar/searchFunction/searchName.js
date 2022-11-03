import Fuse from "fuse.js";

function searchName(values, newItemList) {
	if (values.search.trim().length === 0) {
		return newItemList;
	}
	const fuseOptions = {
		keys: ["title", "tags"],
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
