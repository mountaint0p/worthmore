/**
 * Type structure of users in Firestore
 *
 * NOTE: This is different from the "User" auth type:
 * "User" provides info from gmail accounts, "FireStoreUser"
 * provides info about items reserved
 */

export type FirestoreUser = {
	email: string;
	holds: number;
	name: string;
};
