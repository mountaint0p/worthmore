import React, { useEffect, useState } from "react";
import { supaClient } from "../../supaClient";
import { SupaItem } from "../../types/supaItem";
import Pagination from "../Store/Pagination";
import SidebarItems from "../Store/sidebar/SidebarItems";
import Sidebar from "@/components/Sidebar";
import AdminItemDisplay from "./AdminItem/AdminItemDisplay";
import AdminSearchFilterComponents from "./AdminSearchFilterComponents";
import adminSearchFunctions from "./adminSearchFunctions";
import adminSearchInitialValues from "./adminSearchInitialValues";

function AdminControl() {
	const [currentPage, setCurrentPage] = React.useState(1);
	const [loading, setLoading] = useState(false);
	const itemPerPage = 6;

	//originalItemList = all items from store, itemList = filtered items
	let [originalItemList, setOriginalItemList] = useState<SupaItem[]>([]);
	let [itemList, setItemList] = useState<SupaItem[]>([]);

	//get currentItemList
	const indexOfLastPost = currentPage * itemPerPage;
	const indexOfFirstPost = indexOfLastPost - itemPerPage;
	const currentItemList = itemList.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = (number: number) => setCurrentPage(number);

	//Fetches ALL items
	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			const { data, error } = await supaClient
				.from("items")
				.select("*, users (name)");
			if (error) {
				console.log(error);
			}
			if (data) {
				console.log(data);
				setOriginalItemList(data);
				setItemList(data);
			}
		};
		fetchItems();
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
				<h1 className="mb-5 mt-2 text-4xl font-black">Admin Control</h1>
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
