import { Box, Image, Badge, Wrap, VStack } from "@chakra-ui/react";
import {
	useDisclosure,
	useColorModeValue,
	Card,
	CardBody,
	Stack,
	Heading,
} from "@chakra-ui/react";
import StoreItemModal from "./StoreItemModal";
import { Item } from "../../../types/Item";

const StoreItem = ({ item }: { item: Item }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Card
			as="button"
			role="button"
			textAlign="left"
			borderRadius="lg"
			w={{ base: "100%", md: "20rem", lg: "15rem" }}
			height="20rem"
			_hover={{ cursor: "pointer", boxShadow: "lg" }}
			onClick={onOpen}
			key={item.id}
		>
			<CardBody w="100%" p="0">
				<Image
					src={item.imageUrl}
					alt={item.title}
					borderTopRadius="lg"
					w="100%"
					h="12rem"
					fit="cover"
				/>
				<Stack mt="6" spacing="3" w="100%" p=".5rem">
					<Heading size="md">{item.title}</Heading>
					<Wrap>
						{item.tags.map((tag) => {
							return (
								<Badge key={tag} colorScheme="blackAlpha">
									{" "}
									{tag}{" "}
								</Badge>
							);
						})}
					</Wrap>
				</Stack>
			</CardBody>
			<StoreItemModal
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				item={item}
			/>
		</Card>
	);
};

function Temp({ item }: { item: Item }) {
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
			tabIndex={0}
		>
			<Image boxSize="200px" src={item.imageUrl} alt={item.title} />
			<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
				{item.title}
			</Box>
			<Wrap>
				{item.tags.map((tag) => {
					return <Badge key={tag}> {tag} </Badge>;
				})}
			</Wrap>
			<StoreItemModal
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				item={item}
			/>
		</VStack>
	);
}

export default StoreItem;
