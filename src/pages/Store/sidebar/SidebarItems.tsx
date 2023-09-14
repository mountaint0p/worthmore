import React from "react";
import { Button } from "../../../components/ui/Button";
import { Formik, Form } from "formik";
import searchIntialValues from "./searchInitialValues";
import { SupaItem } from "../../../types/supaItem";
import { StoreSearchValues } from "../../../types/storeSearchValues";

//import all searchFunctions
import searchName from "./searchFunction/searchName";
import searchTag from "./searchFunction/searchTag";
import sortItem from "./searchFunction/sortItem";

//import all searchFilter components
import SearchFilterComponents from "./SearchFilterComponents";

type SidebarProps = {
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
	setItemList?: React.Dispatch<React.SetStateAction<SupaItem[]>>;
	paginate?: Function;
	originalItemList?: SupaItem[];
};
export default function SidebarItems({
	setItemList,
	paginate,
	originalItemList,
}: SidebarProps) {
	//create array of searchFunctions to pass into sidebar
	const searchFunctions = [searchName, sortItem, searchTag];
	return (
		<div className="w-full">
			<h2 className="mb-3 ml-5 text-xl font-bold md:ml-3">Search Filters</h2>
			<Formik
				initialValues={searchIntialValues}
				onSubmit={(values) => {
					filterSubmit(
						values,
						originalItemList!,
						setItemList!,
						paginate!,
						searchFunctions!
					);
				}}
			>
				{({ values, handleChange }) => (
					<Form>
						<SearchFilterComponents
							values={values}
							handleChange={handleChange}
						/>
						<div className="mt-5 flex justify-center">
							<Button
								type="submit"
								size={"lg"}
								className="bg-green-600 text-base hover:bg-green-700"
							>
								Search
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
/**
 * Filters list of store items based on search options from the sidebar
 *
 * @param values
 * @param originalItemList
 * @param setItemList
 * @param paginate
 * @param searchFunctions
 */
const filterSubmit = (
	values: StoreSearchValues,
	originalItemList: SupaItem[],
	setItemList: React.Dispatch<React.SetStateAction<SupaItem[]>>,
	paginate: Function,
	searchFunctions: Function[]
) => {
	paginate(1);
	console.log(values);
	let newItemList = [...originalItemList];
	searchFunctions.forEach((searchFunction) => {
		newItemList = searchFunction(values, newItemList);
	});
	setItemList(newItemList);
};

//TODO: not sure why it takes two objects as params instead of one
