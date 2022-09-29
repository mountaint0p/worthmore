import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import ReservedItem from "./ReservedItem";
import { VStack, Heading } from "@chakra-ui/react";

export default function UserOrders() {
	let [loading, setLoading] = useState(false);
	let [userItems, setUserItems] = useState([]);
	const { user } = UserAuth();
	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			const itemsRef = collection(database, "items");
			const q = query(itemsRef, where("holderID", "==", user.uid));
			const querySnapshot = await getDocs(q);
			console.log(querySnapshot);
			const fetchedItems = [];
			querySnapshot.docs.forEach((doc) => {
				const item = doc.data();
				item.id = doc.id;
				fetchedItems.push(item);
			});
			setUserItems(fetchedItems);
		};
		if (Object.keys(user).length !== 0) {
			fetchItems();
		}
		setLoading(false);
	}, [user]);
	return (
		<VStack>
			<Heading size="xl" mt="10px">
				Items on hold:
			</Heading>
			{userItems.map((item) => {
				return <ReservedItem item={item} key={item.id} />;
			})}
		</VStack>
	);
}
