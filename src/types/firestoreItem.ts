/**
 * Type structure for items in Firestore
 *
 */
export type FirestoreItem = {
	//TODO: fix date types
	dateAdded: any;
	dateOnHold: any;
	holderEmail: string;
	holderID: string;
	holderName: string;
	imageUrl: string;
	onHold: boolean;
	tags: string[];
	title: string;
};
