import React, { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import {
	collection,
	CollectionReference,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import ReservedItem from "./ReservedItem";
import { VStack, Heading } from "@chakra-ui/react";
import { FirestoreUser } from "../../types/firestoreUser";
import { FirestoreItem } from "../../types/firestoreItem";
import { Item } from "../../types/Item";

export default function UserOrders() {
	let [loading, setLoading] = useState(false);
	let [userItems, setUserItems] = useState<Item[]>([]);
	const { user } = UserAuth();
	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			const itemsRef = collection(
				database,
				"items"
			) as CollectionReference<FirestoreItem>;
			const q = query(itemsRef, where("holderID", "==", user!.uid));
			const querySnapshot = await getDocs(q);
			console.log(querySnapshot);
			const fetchedItems: Item[] = [];
			querySnapshot.docs.forEach((doc) => {
				const item = doc.data();
				const id = doc.id;
				fetchedItems.push({ ...item, id: id });
			});
			setUserItems(fetchedItems);
		};
		if (user && Object.keys(user).length !== 0) {
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
