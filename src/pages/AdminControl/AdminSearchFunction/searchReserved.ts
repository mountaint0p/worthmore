import { AdminSearchValues } from "../../../types/adminSearchValues";
import { Item } from "../../../types/Item";

function searchReserved(values: AdminSearchValues, newItemList: Item[]) {
	if (values.reserved) {
		newItemList = newItemList.filter((item) => {
			return item.onHold;
		});
	}
	return newItemList;
}

export default searchReserved;
