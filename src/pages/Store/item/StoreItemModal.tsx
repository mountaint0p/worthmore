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
	Text,
} from "@chakra-ui/react";

import { UserAuth } from "../../../context/AuthContext2";
import { useNavigate } from "react-router-dom";
import React, { MouseEventHandler, useState } from "react";
import { SupaItem } from "../../../types/supaItem";
import { supaClient } from "../../../supaClient";
import { Link } from "react-router-dom";

//NOTE: Item reservation is nested in here
//TODO: Need to add check that item is not onHold before reserving

type ReserveItemParams = {
	item: SupaItem;
	user: any;
	navigate: Function;
};
const reserveItem = async ({ item, user, navigate }: ReserveItemParams) => {
	const res = await supaClient
		.from("users")
		.select("*")
		.eq("id", user.id)
		.single();
	if (res.error) {
		console.log(res.error);
		return;
	}
	let currHolds = res.data.holds;
	if (res.data.holds <= 3) {
		const res2 = await supaClient
			.from("items")
			.update({ holder_id: user.id })
			.eq("id", item.id)
			.select();
		if (res2.error) {
			console.log(res2.error);
		}
		const res3 = await supaClient
			.from("users")
			.update({ holds: currHolds + 1 })
			.eq("id", user.id)
			.select();
		if (res3.error) {
			console.log(res3.error);
		}
		navigate("/userorders");
	} else {
		alert("Error: can't reserve more than 3 items");
	}

	// if (error) {
	// 	console.log(error);
	// }
	// if (data) {
	// 	console.log(data);
	// }
};

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: MouseEventHandler;
	item: SupaItem;
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
									src={item.imageURL!}
									alt={item.title}
									margin="auto"
								/>
							</ModalBody>
							<ModalFooter margin="auto">
								{user ? (
									<Button
										mr={3}
										colorScheme="telegram"
										onClick={() => setReserveAttempt(true)}
									>
										Reserve
									</Button>
								) : (
									<Text>
										Want to reserve this item?{" "}
										<Link to="/login">
											<Button colorScheme={"green"}>Log-in!</Button>
										</Link>
									</Text>
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
