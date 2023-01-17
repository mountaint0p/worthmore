import { Wrap, ColorModeScript, Text } from "@chakra-ui/react";
import Sidebar from "./sidebar/Sidebar";
import Pagination from "./Pagination";
import React, { useEffect, useState } from "react";
import ItemDisplay from "./item/ItemDisplay";
import { database } from "../../firebaseConfig";
import {
	collection,
	getDocs,
	where,
	query,
	CollectionReference,
} from "firebase/firestore";

//import all searchFunctions
import searchName from "./sidebar/searchFunction/searchName";
import sortItem from "./sidebar/searchFunction/sortItem";
import searchTag from "./sidebar/searchFunction/searchTag";

//import all searchFilter components
import SearchFilterComponents from "./sidebar/SearchFilterComponents";

import searchIntialValues from "./sidebar/searchInitialValues";
import { FirestoreItem } from "../../types/firestoreItem";
import { Item } from "../../types/Item";

function Store() {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [loading, setLoading] = useState(false);
	const itemPerPage = 6;

	//originalItemList = all items from store, itemList = filtered items
	let [originalItemList, setOriginalItemList] = useState<Item[]>([]);
	let [itemList, setItemList] = useState<Item[]>([]);

	//get currentItemList
	const indexOfLastPost = currentPage * itemPerPage;
	const indexOfFirstPost = indexOfLastPost - itemPerPage;
	const currentItemList = itemList.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (number: number) => setCurrentPage(number);

	//create array of searchFunctions to pass into sidebar
	const searchFunctions = [searchName, sortItem, searchTag];

	//Fetches all items from firestore
	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			const itemsRef = collection(
				database,
				"items"
			) as CollectionReference<FirestoreItem>;
			const q = query(itemsRef, where("onHold", "==", false));
			const querySnapshot = await getDocs(q);
			const newItemList: Item[] = [];
			querySnapshot.docs.forEach((doc) => {
				const item = doc.data();
				const id = doc.id;
				newItemList.push({ ...item, id: id });
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
			{/* <ColorModeScript initialColorMode="./style/theme.config.useSystemColorMode" /> */}
			<Sidebar
				setItemList={setItemList}
				setLoading={setLoading}
				originalItemList={originalItemList}
				paginate={paginate}
				searchFunctions={searchFunctions}
				//TODO: not sure why typescript error
				// @ts-ignore
				SearchFilterComponents={SearchFilterComponents}
				searchIntialValues={searchIntialValues}
			>
				<ItemDisplay itemList={currentItemList} loading={loading} />
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

export default Store;
