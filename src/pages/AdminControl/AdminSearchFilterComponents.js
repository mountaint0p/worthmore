import NameFilter from "../Store/sidebar/searchFilter/NameFilter";
import TagFilter from "../Store/sidebar/searchFilter/TagFilter";
import SortingFilter from "../Store/sidebar/searchFilter/SortingFilter";
import ReservedFilter from "./AdminSearchFilter/ReservedFilter";
import HolderFilter from "./AdminSearchFilter/HolderFilter";

const AdminSearchFilterComponents = ({ values, handleChange }) => {
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
