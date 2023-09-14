import { Box, Image, Badge, Wrap, VStack } from "@chakra-ui/react";
import { useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { SupaItem } from "../../../types/supaItem";
import AdminStoreItemModal from "./AdminStoreItemModal";
function AdminStoreItem({ item }: { item: SupaItem }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<VStack
			w={{ base: "150px", md: "250px" }}
			h="325px"
			p="10px"
			borderWidth="1px"
			minWidth="200px"
			onClick={onOpen}
			bgColor={useColorModeValue("white", "gray.900")}
			_hover={{ cursor: "pointer", boxShadow: "lg" }}
			key={item.id}
		>
			<Image boxSize="200px" src={item.imageURL} alt={item.title} />
			<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
				{item.title}
			</Box>
			{item.holder_id && <Badge colorScheme="red">RESERVED</Badge>}
			<Wrap>
				{item.tags.map((tag: string) => {
					return <Badge key={tag}> {tag} </Badge>;
				})}
			</Wrap>
			<AdminStoreItemModal
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				item={item}
			/>
		</VStack>
	);
}

export default AdminStoreItem;
