import {
	Badge,
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	useDisclosure,
	Wrap,
} from "@chakra-ui/react";
import { SupaItem } from "../../../types/supaItem";
import StoreItemModal from "./StoreItemModal";

function StoreItem({ item }: { item: SupaItem }) {
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
					src={item.imageURL}
					alt={item.title}
					borderTopRadius="lg"
					w="100%"
					h="12rem"
					fit="cover"
				/>
				<Stack mt="6" spacing="3" w="100%" p=".5rem">
					<Heading size="md" noOfLines={1}>
						{item.title}
					</Heading>
					<Wrap>
						{item.tags.map((tag: string) => {
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
}

export default StoreItem;
