import { database } from "../../../firebaseConfig";
import {
	doc,
	DocumentReference,
	writeBatch,
	increment,
} from "firebase/firestore";
import { Item } from "../../../types/Item";
import { User } from "firebase/auth";
import { FirestoreItem } from "../../../types/firestoreItem";
import { FirestoreUser } from "../../../types/firestoreUser";
//NOTE: Item reservation is nested in here
//TODO: Need to add check that item is not onHold before reserving
type ReserveItemParams = {
	item: Item;
	user: User;
	navigate: Function;
};
const reserveItem = async ({ item, user, navigate }: ReserveItemParams) => {
	try {
		const batch = writeBatch(database);
		const itemRef = doc(
			database,
			"items",
			item.id
		) as DocumentReference<FirestoreItem>;
		batch.set(
			itemRef,
			{
				onHold: true,
				holderID: user.uid,
				holderName: user.displayName!,
				holderEmail: user.email!,
			},
			{ merge: true }
		);
		const userRef = doc(
			database,
			"users",
			user.uid
		) as DocumentReference<FirestoreUser>;
		batch.set(
			userRef,
			{
				holds: increment(1),
			},
			{ merge: true }
		);
		await batch.commit();
		//Change page to userorder after completing
		navigate("/userorders");
	} catch (error) {
		console.log(error);
	}
};

export default reserveItem;
