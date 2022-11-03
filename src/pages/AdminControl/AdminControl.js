import { ColorModeScript, Heading } from "@chakra-ui/react";
import Pagination from "../Store/Pagination";
import React, { useEffect, useState } from "react";
import Sidebar from "../Store/sidebar/Sidebar";
import AdminItemDisplay from "./AdminItem/AdminItemDisplay";
import adminSearchFunctions from "./adminSearchFunctions";
import { database } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import AdminSearchFilterComponents from "./AdminSearchFilterComponents";
import adminSearchInitialValues from "./adminSearchInitialValues";

function AdminControl() {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [loading, setLoading] = useState(false);
	const itemPerPage = 6;

	//originalItemList = all items from store, itemList = filtered items
	let [originalItemList, setOriginalItemList] = useState([]);
	let [itemList, setItemList] = useState([]);

	//get currentItemList
	const indexOfLastPost = currentPage * itemPerPage;
	const indexOfFirstPost = indexOfLastPost - itemPerPage;
	const currentItemList = itemList.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (number) => setCurrentPage(number);

	//Fetches ALL items from firestore
	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			const itemsRef = collection(database, "items");
			const q = query(itemsRef);
			const querySnapshot = await getDocs(q);
			const newItemList = [];
			querySnapshot.docs.forEach((doc) => {
				const item = doc.data();
				item.id = doc.id;
				newItemList.push(item);
			});
			//NOTE: Store manually sorts item by most recently added
			newItemList.sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1));
			setOriginalItemList(newItemList);
			setItemList(newItemList);
		};
		fetchItems();
		setLoading(false);
	}, []);
	return (
		<>
			<ColorModeScript initialColorMode="./style/theme.config.useSystemColorMode" />
			<Sidebar
				setItemList={setItemList}
				setLoading={setLoading}
				originalItemList={originalItemList}
				paginate={paginate}
				searchFunctions={adminSearchFunctions}
				SearchFilterComponents={AdminSearchFilterComponents}
				searchInitialValues={adminSearchInitialValues}
			>
				<Heading mb="10px">Admin Control</Heading>
				<AdminItemDisplay itemList={currentItemList} loading={loading} />
				<Pagination
					itemPerPage={itemPerPage}
					totalItems={itemList.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</Sidebar>
		</>
	);
}

export default AdminControl;
