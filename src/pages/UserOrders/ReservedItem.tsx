import {
	Box,
	Image,
	Button,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { SupaItem } from "../../types/supaItem";
import { supaClient } from "../../supaClient";

function ReserveItem({
	item,
	loading,
	user,
}: {
	item: SupaItem;
	loading: boolean;
	user: any;
}) {
	const removeReservation = async (item: SupaItem) => {
		const res2 = await supaClient
			.from("users")
			.select("holds")
			.eq("id", user.id)
			.single();
		if (res2.error) {
			console.log(res2.error);
			return;
		}
		const currHolds = res2.data.holds;
		const res1 = await supaClient
			.from("items")
			.update({ holder_id: null })
			.eq("id", item.id)
			.select();
		if (res1.error) {
			console.log(res1.error);
			return;
		}
		const res3 = await supaClient
			.from("users")
			.update({ holds: currHolds - 1 })
			.eq("id", user.id)
			.select();
		if (res3.error) {
			console.log(res3.error);
		}
		location.reload();
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
			<Image boxSize="200px" src={item.imageURL} alt={item.title} />
			<Box mt="1" fontWeight="semibold" lineHeight="tight">
				{item.title}
			</Box>
			<Box mt="1" fontWeight="semibold" lineHeight="tight">
				Date Reserved:{" "}
				{item.dateAdded.substring(0, item.dateAdded.indexOf("T"))}
			</Box>
			<Button
				colorScheme="red"
				onClick={() => removeReservation(item)}
				isDisabled={loading}
			>
				Cancel
			</Button>
		</VStack>
	);
}

export default ReserveItem;
