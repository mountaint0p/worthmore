//Displays items onto store page
import React from "react";
import { SimpleGrid, Wrap, Heading, Spinner, Flex } from "@chakra-ui/react";
import ItemProfile from "./ItemProfile";
import { Item } from "../../../types/Item";

type ItemDisplayProps = {
	itemList: Item[];
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
			columns={{ base: 1, md: 2, lg: 3 }}
			spacing={5}
			justifyContent="center"
			w="100%"
		>
			{itemList.map((item) => {
				return <ItemProfile key={item.id} item={item} />;
			})}
		</SimpleGrid>
	);
}
