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
	useToast,
} from "@chakra-ui/react";

import { UserAuth } from "../../../context/AuthContext";
import { database } from "../../../firebaseConfig";
import {
	addDoc,
	updateDoc,
	doc,
	collection,
	DocumentReference,
	writeBatch,
	increment,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import React, { MouseEventHandler, useState } from "react";
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
		navigate("/userorders");
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
function StoreItemModal({ isOpen, onClose, onOpen, item }: ModalProps) {
	const [reserveAttempt, setReserveAttempt] = React.useState(false);
	const { user } = UserAuth();
	const navigate = useNavigate();
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{reserveAttempt ? (
						<>
							<ModalHeader>{item.title}</ModalHeader>
							<ModalCloseButton />
							<ModalBody></ModalBody>
							<ModalFooter padding="0px" margin="0px" min-width="300px">
								{user && (
									<>
										<div>
											<ModalHeader>
												Are you sure you want to reserve?
											</ModalHeader>
										</div>{" "}
										<div>
											<Button
												mr={3}
												colorScheme="red"
												onClick={() => reserveItem({ item, user, navigate })}
											>
												Reserve
											</Button>
										</div>
									</>
								)}
							</ModalFooter>
						</>
					) : (
						<>
							<ModalHeader>{item.title}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Image
									onClick={onOpen}
									boxSize="250px"
									src={item.imageUrl}
									alt={item.title}
									margin="auto"
								/>
							</ModalBody>
							<ModalFooter margin="auto">
								{user && (
									<Button
										mr={3}
										colorScheme="telegram"
										onClick={() => setReserveAttempt(true)}
									>
										Reserve
									</Button>
								)}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default StoreItemModal;
