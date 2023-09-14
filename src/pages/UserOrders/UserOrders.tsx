import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext2";
import ReservedItem from "./ReservedItem";
import { SupaItem } from "../../types/supaItem";
import { supaClient } from "../../supaClient";

export default function UserOrders() {
	let [loading, setLoading] = useState(true);
	let [userItems, setUserItems] = useState<SupaItem[]>([]);
	const { user } = UserAuth();
	useEffect(() => {
		setLoading(true);
		const fetchUserItems = async () => {
			const { data, error } = await supaClient
				.from("items")
				.select("*")
				.eq("holder_id", user?.id);
			if (error) {
				console.log(error);
			}
			if (data) {
				setUserItems(data);
			}
		};
		fetchUserItems();
		setLoading(false);
	}, [user]);
	return (
		<>
			{!loading && (
				// <VStack>
				// 	<Heading size="xl" mt="10px">
				// 		Items on hold: {userItems.length}
				// 	</Heading>
				// 	{userItems.map((item) => {
				// 		return (
				// 			<ReservedItem
				// 				item={item}
				// 				key={item.id}
				// 				loading={loading}
				// 				user={user}
				// 			/>
				// 		);
				// 	})}
				// </VStack>
				<div className="flex flex-col items-center justify-center">
					<h1 className="mt-5 text-4xl font-bold">
						Items On Hold: {userItems.length}
					</h1>
					{userItems.map((item) => {
						return (
							<ReservedItem
								item={item}
								key={item.id}
								loading={loading}
								user={user}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}
