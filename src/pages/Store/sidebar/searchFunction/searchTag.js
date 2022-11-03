function searchTag(values, newItemList) {
	if (values.tags.length !== 0) {
		newItemList = newItemList.filter((item) => {
			return item.tags.some((tag) => values.tags.includes(tag));
		});
	}
	return newItemList;
}

export default searchTag;
