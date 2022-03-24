import React from "react";
import { Wrap, Text } from "@chakra-ui/react";
import ItemProfile from "./ItemProfile";

export default function ItemDisplay({ itemList, loading }) {
	if (loading === true) return <Text>Loading</Text>;
	console.log(itemList);
	return (
		<Wrap maxW="900px" justify="center">
			{itemList.map((item) => {
				return <ItemProfile key={item.id} item={item} />;
			})}
		</Wrap>
	);
}
