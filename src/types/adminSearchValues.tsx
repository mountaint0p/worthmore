import { StoreSearchValues } from "./storeSearchValues";

export interface AdminSearchValues extends StoreSearchValues {
	reserved: boolean;
	holder: "";
}
