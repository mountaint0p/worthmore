import NameFilter from "./searchFilter/NameFilter";
import SortingFilter from "./searchFilter/SortingFilter";
import TagFilter from "./searchFilter/TagFilter";

const SearchFilterComponents = ({ values, handleChange }) => {
	return (
		<>
			<NameFilter values={values} handleChange={handleChange} />
			<SortingFilter values={values} handleChange={handleChange} />
			<TagFilter />
		</>
	);
};

export default SearchFilterComponents;
