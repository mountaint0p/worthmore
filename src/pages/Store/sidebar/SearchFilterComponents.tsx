import NameFilter from "./searchFilter/NameFilter";
import SortingFilter from "./searchFilter/SortingFilter";
import TagFilter from "./searchFilter/TagFilter";
import { StoreSearchValues } from "../../../types/storeSearchValues";
import { ChangeEventHandler } from "react";

/**
 * Returns the filtering components of the sidebar
 */

type SearchFilterComponentsProps = {
	values: StoreSearchValues;
	handleChange: ChangeEventHandler;
};
const SearchFilterComponents = ({
	values,
	handleChange,
}: SearchFilterComponentsProps) => {
	return (
		<>
			<NameFilter values={values} handleChange={handleChange} />
			<SortingFilter values={values} />
			<TagFilter />
		</>
	);
};

export default SearchFilterComponents;
