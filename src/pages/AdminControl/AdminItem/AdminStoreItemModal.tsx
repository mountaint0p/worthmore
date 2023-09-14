import {
	Button,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
} from "@chakra-ui/react";

import { MouseEventHandler } from "react";
import { UserAuth } from "../../../context/AuthContext2";
import { supaClient } from "../../../supaClient";
import { SupaItem } from "../../../types/supaItem";

// completeOrder
// removeOrder
// removeItem

/*
	Deletes item from store and database 
*/
const removeItemFromUser = async (item: SupaItem) => {
	if (item.holder_id) {
		const id = item.holder_id;
		const res = await supaClient
			.from("users")
			.select("holds")
			.eq("id", id)
			.single();
		if (res.error) {
			alert("error has occured");
			console.log(res.error);
			return;
		}
		const currHolds = res.data.holds;
		const res2 = await supaClient
			.from("users")
			.update({ holds: currHolds - 1 })
			.eq("id", id)
			.select();
		if (res2.error) {
			alert("error has occured");
			console.log(res2.error);
			return;
		}
	}
};
const deleteItem = async (item: SupaItem) => {
	//TODO: Remove image from storage after deleting
	//TODO: Decrease number of holds from user
	await removeItemFromUser(item);
	const { data, error } = await supaClient
		.from("items")
		.delete()
		.eq("id", item.id)
		.select();
	if (error) {
		console.log(error);
	}
	if (data) {
		location.reload();
	}
};

/*
	Removes reservation from item, putting item back into the store
*/
const removeOrder = async (item: SupaItem) => {
	await removeItemFromUser(item);
	const { data, error } = await supaClient
		.from("items")
		.update({ holder_id: null })
		.eq("id", item.id)
		.select();
	if (error) {
		console.log(error);
	}
	if (data) {
		location.reload();
	}
};

/*
	Completes order on item, removing it from store and database
*/
const completeOrder = async (item: SupaItem) => {
	//TODO: Track what items are deleted vs completed
	await removeItemFromUser(item);
	const { data, error } = await supaClient
		.from("items")
		.delete()
		.eq("id", item.id)
		.select();
	if (error) {
		console.log(error);
	}
	if (data) {
		location.reload();
	}
};

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: MouseEventHandler;
	item: SupaItem;
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
							src={item.imageURL}
							alt={item.title}
						/>
					</ModalBody>
					<ModalFooter>
						<VStack>
							<Text>
								Date added:{" "}
								{item.dateAdded.substring(0, item.dateAdded.indexOf("T"))}
							</Text>
							{item.holder_id && (
								<>
									<Text>Reserved by {item.users.name}</Text>
									<Button
										colorScheme="green"
										onClick={() => completeOrder(item)}
									>
										Complete Order
									</Button>
									<Button
										colorScheme="yellow"
										onClick={() => removeOrder(item)}
									>
										Remove Reservation
									</Button>
								</>
							)}
							<Button mr={3} colorScheme="red" onClick={() => deleteItem(item)}>
								Delete Item
							</Button>
						</VStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default AdminStoreItemModal;
