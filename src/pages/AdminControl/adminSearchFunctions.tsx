import searchName from "../Store/sidebar/searchFunction/searchName";
import searchHolder from "./AdminSearchFunction/searchHolder";
import searchTag from "../Store/sidebar/searchFunction/searchTag";
import sortItem from "../Store/sidebar/searchFunction/sortItem";
import searchReserved from "./AdminSearchFunction/searchReserved";
const adminSearchFunctions = [
	searchName,
	searchHolder,
	searchTag,
	searchReserved,
	sortItem,
];

export default adminSearchFunctions;
