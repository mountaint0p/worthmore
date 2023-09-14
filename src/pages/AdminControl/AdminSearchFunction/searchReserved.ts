import { AdminSearchValues } from "../../../types/adminSearchValues";
import { SupaItem } from "../../../types/supaItem";

function searchReserved(values: AdminSearchValues, newItemList: SupaItem[]) {
	if (values.reserved) {
		newItemList = newItemList.filter((item) => {
			return item.holder_id;
		});
	}
	return newItemList;
}

export default searchReserved;
