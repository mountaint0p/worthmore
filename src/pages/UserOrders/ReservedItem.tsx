import {
	Box,
	Image,
	Button,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { UserAuth } from "../../context/AuthContext";
import { FirestoreItem } from "../../types/firestoreItem";
import { Item } from "../../types/Item";
import { User } from "firebase/auth";

function ReserveItem({ item }: { item: Item }) {
	const { user } = UserAuth();
	const removeReservation = async (item: Item, user: User | null) => {
		try {
			const itemRef = doc(
				database,
				"items",
				item.id
			) as DocumentReference<FirestoreItem>;
			await updateDoc(itemRef, {
				onHold: false,
				holderID: "",
				holderName: "",
				holderEmail: "",
			});
			//NOTE: Refresh after deleting reservation, might change?
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<VStack
			w={{ base: "150px", md: "250px" }}
			h="350px"
			p="10px"
			borderWidth="1px"
			minWidth="200px"
			marginTop="20px"
			bgColor={useColorModeValue("white", "gray.900")}
			_hover={{ cursor: "pointer", boxShadow: "lg" }}
			tabIndex={0}
			key={item.id}
		>
			<Image boxSize="200px" src={item.imageUrl} alt={item.title} />
			<Box mt="1" fontWeight="semibold" lineHeight="tight">
				{item.title}
			</Box>
			<Box mt="1" fontWeight="semibold" lineHeight="tight">
				Date Reserved: {item.dateAdded.toDate().toDateString()}
			</Box>
			<Button colorScheme="red" onClick={() => removeReservation(item, user)}>
				Cancel
			</Button>
		</VStack>
	);
}

export default ReserveItem;
