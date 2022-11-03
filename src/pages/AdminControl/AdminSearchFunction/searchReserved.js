function searchReserved(values, newItemList) {
	if (values.reserved) {
		newItemList = newItemList.filter((item) => {
			return item.onHold;
		});
	}
	return newItemList;
}

export default searchReserved;
