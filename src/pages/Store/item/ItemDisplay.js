//Displays items onto store page
import React from "react";
import { Wrap, Heading, Spinner, Flex } from "@chakra-ui/react";
import ItemProfile from "./ItemProfile";

export default function ItemDisplay({ itemList, loading }) {
	if (loading === true)
		return (
			<Flex direction="row" alignItems="center">
				<Heading mr="20px">Loading</Heading>
				<Spinner size="lg" color="green.300" />
			</Flex>
		);
	return (
		<Wrap maxW="900px" justify="center">
			{itemList.map((item) => {
				return <ItemProfile key={item.id} item={item} />;
			})}
		</Wrap>
	);
}
