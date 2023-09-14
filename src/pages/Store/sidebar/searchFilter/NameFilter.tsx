import { ChangeEventHandler } from "react";
import { Search } from "lucide-react";
import { StoreSearchValues } from "../../../../types/storeSearchValues";

type SearchFilterComponentsProps = {
	values: StoreSearchValues;
	handleChange: ChangeEventHandler;
};
const NameFilter = ({ values, handleChange }: SearchFilterComponentsProps) => {
	return (
		<div className="ml-3 flex h-9 w-11/12 items-center gap-2 rounded-2xl border border-black bg-gray-100">
			<Search size={19} className="ml-2" />
			<input
				className=" h-full w-full rounded-2xl bg-gray-100 outline-none"
				name="search"
				value={values.search || ""}
				onChange={handleChange}
				placeholder="Search Items by Name"
			/>
		</div>
	);
};

export default NameFilter;
