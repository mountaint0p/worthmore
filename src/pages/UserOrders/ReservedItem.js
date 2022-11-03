import {
	Box,
	Image,
	Button,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { UserAuth } from "../../context/AuthContext";

function ReserveItem({ item }) {
	const { user } = UserAuth();
	const removeReservation = async (item, user) => {
		try {
			const itemRef = doc(database, "items", item.id);
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
			tabIndex="0"
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
