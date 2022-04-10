import { Box, Image, Badge, Wrap, VStack } from "@chakra-ui/react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useColorModeValue,
	Button,
} from "@chakra-ui/react";
function StoreItem({ item }) {
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
			<Image boxSize="200px" src={item.image_url} alt={item.item_name} />
			<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
				{item.item_name}
			</Box>
			<Wrap>
				{item.tags.map((tag) => {
					return <Badge key={tag}> {tag} </Badge>;
				})}
			</Wrap>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{item.item_name}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image
							onClick={onOpen}
							boxSize="250px"
							src={item.image_url}
							alt={item.item_name}
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</VStack>
	);
}

export default StoreItem;
