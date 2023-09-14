import Spinner from "../../components/Spinner";
import React, { useEffect, useState } from "react";
import { SupaItem } from "../../types/supaItem";
import ItemDisplay from "./item/ItemDisplay";
import Pagination from "./Pagination";
import Sidebar from "@/components/Sidebar";
import SidebarItems from "./sidebar/SidebarItems";

import { UserAuth } from "../../context/AuthContext2";
import { supaClient } from "../../supaClient";

function Store() {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [loading, setLoading] = useState(true);
	const itemPerPage = 6;

	//originalItemList = all items from store, itemList = filtered items
	let [originalItemList, setOriginalItemList] = useState<SupaItem[]>([]);
	let [itemList, setItemList] = useState<SupaItem[]>([]);

	//get currentItemList
	const indexOfLastPost = currentPage * itemPerPage;
	const indexOfFirstPost = indexOfLastPost - itemPerPage;
	const currentItemList = itemList.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (number: number) => setCurrentPage(number);

	//checks if store is closed
	const [closed, setClosed] = useState(false);

	//create array of searchFunctions to pass into sidebar
	const { user } = UserAuth();

	//Checks if store is closed, and then fetches all items from database
	useEffect(() => {
		//TODO: Figure out why items are still fetched when store is closed
		setLoading(true);
		const fetchStoreStatus = async () => {
			const { data, error } = await supaClient.from("store_status").select("*");
			//if error or wrong fetched data length
			if (error || (data && data.length != 1)) {
				console.log(error);
			}
			if (data) {
				setClosed(data[0].is_closed);
			}
		};
		const fetchItems = async () => {
			const { data, error } = await supaClient
				.from("items")
				.select("*")
				.is("holder_id", null);
			if (error) {
				console.log(error);
				return;
			}
			if (data) {
				const newItemList: SupaItem[] = [];
				data?.forEach((item) => {
					newItemList.push(item);
				});
				setOriginalItemList(newItemList);
				setItemList(newItemList);
			}
		};
		fetchStoreStatus();
		if (!closed) {
			fetchItems();
		}
		setLoading(false);
	}, []);
	//SidebarItem component with props
	const SidebarItemWithProps = () => {
		return (
			<SidebarItems
				setItemList={setItemList}
				setLoading={setLoading}
				originalItemList={originalItemList}
				paginate={paginate}
			/>
		);
	};
	return (
		<>
			{/* <ColorModeScript initialColorMode="./style/theme.config.useSystemColorMode" /> */}
			<Sidebar SidebarItems={SidebarItemWithProps}>
				{closed && <h1>Store is Currently Closed</h1>}
				{loading && <Spinner />}
				{!loading && !closed && (
					<>
						<ItemDisplay itemList={currentItemList} loading={loading} />
						<Pagination
							itemPerPage={itemPerPage}
							totalItems={itemList.length}
							paginate={paginate}
							currentPage={currentPage}
						/>
					</>
				)}
			</Sidebar>
		</>
	);
}

export default Store;
