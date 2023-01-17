import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Image,
	Button,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";

import { UserAuth } from "../../../context/AuthContext";
import { database } from "../../../firebaseConfig";
import {
	writeBatch,
	updateDoc,
	doc,
	collection,
	DocumentReference,
	increment,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Item } from "../../../types/Item";
import { User } from "firebase/auth";
import { FirestoreItem } from "../../../types/firestoreItem";
import { FirestoreUser } from "../../../types/firestoreUser";
import { MouseEventHandler } from "react";

//NOTE: Item reservation is nested in here

const removeItem = async (item: Item, user: User) => {
	try {
		let batch = writeBatch(database);
		const itemRef = doc(
			database,
			"items",
			item.id
		) as DocumentReference<FirestoreItem>;
		const userRef = doc(
			database,
			"users",
			user.uid
		) as DocumentReference<FirestoreUser>;
		batch.set(
			itemRef,
			{
				onHold: false,
				holderID: "",
				holderName: "",
				holderEmail: "",
			},
			{ merge: true }
		);
		batch.set(
			userRef,
			{
				holds: increment(-1),
			},
			{ merge: true }
		);
		await batch.commit();
		location.reload();
	} catch (error) {
		console.log(error);
	}
};

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: MouseEventHandler;
	item: Item;
};

function AdminStoreItemModal({ isOpen, onClose, onOpen, item }: ModalProps) {
	const { user } = UserAuth();
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{item.title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image
							onClick={onOpen}
							boxSize="250px"
							src={item.imageUrl}
							alt={item.title}
						/>
					</ModalBody>
					<ModalFooter>
						<VStack>
							<Text>Date added: {item.dateAdded.toDate().toDateString()}</Text>
							{item.onHold && (
								<>
									<Text>Reserved by {item.holderName}</Text>
									<Button
										mr={3}
										colorScheme="red"
										onClick={() => removeItem(item, user!)}
									>
										Remove
									</Button>
								</>
							)}
						</VStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default AdminStoreItemModal;
