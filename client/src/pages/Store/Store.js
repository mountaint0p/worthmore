import { Wrap, ColorModeScript, Text } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Pagination from "./components/Pagination";
import React, { useEffect, useState } from "react";
import ItemDisplay from "./components/ItemDisplay.js";
import { API } from "aws-amplify";

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
				// setLoading(true);
				// const response = await API.get("worthmoreAPI", "/items", {});
				// const jsonData = await response.json();
				// setItemList(jsonData);
				// console.log(jsonData);
				// console.log("hello");
				// setLoading(false);
				API.get("worthmoreAPI", "/items", {})
					.then((response) => {
						console.log(response);
					})
					.catch((error) => {
						console.log(error.message);
					});
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
