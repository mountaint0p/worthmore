import { Box, Image, Badge, Wrap, VStack } from "@chakra-ui/react";
import { useDisclosure, useColorModeValue } from "@chakra-ui/react";
import AdminStoreItemModal from "./AdminStoreItemModal";
function AdminStoreItem({ item }) {
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
			tabIndex="0"
			key={item.id}
		>
			<Image boxSize="200px" src={item.imageUrl} alt={item.title} />
			<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
				{item.title}
			</Box>
			{item.onHold && <Badge colorScheme="red">RESERVED</Badge>}
			<Wrap>
				{item.tags.map((tag) => {
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
