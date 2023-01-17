import NameFilter from "../Store/sidebar/searchFilter/NameFilter";
import TagFilter from "../Store/sidebar/searchFilter/TagFilter";
import SortingFilter from "../Store/sidebar/searchFilter/SortingFilter";
import ReservedFilter from "./AdminSearchFilter/ReservedFilter";
import HolderFilter from "./AdminSearchFilter/HolderFilter";
import { AdminSearchValues } from "../../types/adminSearchValues";
import { ChangeEventHandler } from "react";

type AdminProps = {
	values: AdminSearchValues;
	handleChange: ChangeEventHandler;
};

const AdminSearchFilterComponents = ({ values, handleChange }: AdminProps) => {
	return (
		<>
			<NameFilter values={values} handleChange={handleChange} />
			<HolderFilter values={values} handleChange={handleChange} />
			<SortingFilter values={values} />
			<TagFilter />
			<ReservedFilter values={values} handleChange={handleChange} />
		</>
	);
};

export default AdminSearchFilterComponents;
