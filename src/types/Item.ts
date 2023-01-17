/**
 * Type structure for store items shown on website
 *
 * NOTE: this is different from type "FireStoreItem" as it contains the ID of the item as well
 */
import { FirestoreItem } from "./firestoreItem";

export interface Item extends FirestoreItem {
	id: string;
}
