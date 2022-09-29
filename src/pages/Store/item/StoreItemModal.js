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
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

//NOTE: Item reservation is nested in here
const reserveItem = async ({ item, user, navigate }) => {
	try {
		const itemRef = doc(database, "items", item.id);
		await updateDoc(itemRef, {
			onHold: true,
			holderID: user.uid,
		});
		navigate("/userorders");
	} catch (error) {
		console.log(error);
	}
};
function StoreItemModal({ isOpen, onClose, onOpen, item }) {
	const { user } = UserAuth();
	const navigate = useNavigate();
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
						{user && (
							<Button
								mr={3}
								colorScheme="telegram"
								onClick={() => reserveItem({ item, user, navigate })}
							>
								Reserve
							</Button>
						)}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default StoreItemModal;
