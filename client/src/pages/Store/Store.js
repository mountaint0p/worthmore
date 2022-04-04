import { Wrap, ColorModeScript, Text } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Pagination from "./components/Pagination";
import React, { useEffect, useState } from "react";
import ItemDisplay from "./components/ItemDisplay.js";

function Store() {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [loading, setLoading] = useState(false);
	const itemPerPage = 6;
	let [itemList, setItemList] = useState([]);

	//get currentItemList
	const indexOfLastPost = currentPage * itemPerPage;
	const indexOfFirstPost = indexOfLastPost - itemPerPage;
	const currentItemList = itemList.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (number) => setCurrentPage(number);
	useEffect(() => {
		const getAllItemList = async () => {
			try {
				setLoading(true);
				const response = await fetch("http://localhost:5000/items");
				const jsonData = await response.json();
				setItemList(jsonData);
				console.log(jsonData);
				setLoading(false);
			} catch (err) {
				console.log(err.message);
			}
		};
		getAllItemList();
	}, []);
	return (
		<>
			<ColorModeScript initialColorMode="./style/theme.config.useSystemColorMode" />
			<Sidebar
				setItemList={setItemList}
				setLoading={setLoading}
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
