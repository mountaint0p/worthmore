//Displays items onto store page
import { Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { SupaItem } from "../../../types/supaItem";
import ItemProfile from "./ItemProfile";

type ItemDisplayProps = {
	itemList: SupaItem[];
	loading: boolean;
};
export default function ItemDisplay({ itemList, loading }: ItemDisplayProps) {
	if (loading === true)
		return (
			<Flex direction="row" alignItems="center">
				<Heading mr="20px">Loading</Heading>
				<Spinner size="lg" color="green.300" />
			</Flex>
		);
	return (
		<SimpleGrid
			columns={{ base: 2, md: 3 }}
			spacing={5}
			maxW="900px"
			justifyContent="center"
		>
			{itemList.map((item) => {
				return <ItemProfile key={item.id} item={item} />;
			})}
		</SimpleGrid>
	);
}
