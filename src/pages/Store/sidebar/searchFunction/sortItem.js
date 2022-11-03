function sortItem(values, newItemList) {
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
