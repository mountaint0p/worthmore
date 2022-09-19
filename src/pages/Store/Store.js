import { Wrap, ColorModeScript, Text } from "@chakra-ui/react";
import Sidebar from "./sidebar/Sidebar";
import Pagination from "./Pagination";
import React, { useEffect, useState } from "react";
import ItemDisplay from "./item/ItemDisplay";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Store() {
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

	//Fetches all items from firestore
	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			const querySnapshot = await getDocs(collection(database, "items"));
			const newItemList = [];
			querySnapshot.docs.forEach((doc) => {
				const item = doc.data();
				item.id = doc.id;
				newItemList.push(item);
			});
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
