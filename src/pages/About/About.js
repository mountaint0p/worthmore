import React from "react";
import {
	Heading,
	Text,
	VStack,
	Box,
	Flex,
	Button,
	Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function About() {
	return (
		<VStack>
			<Flex
				direction="column"
				height="90vh"
				justify="center"
				align="center"
				width="90vw"
			>
				<Box mt="20px">
					<Text align="center" fontSize="xl">
                    The Worthmore Free Store provides access to room furnishings and other supplies for students who may otherwise face cost or transport barriers in obtaining such items. Complementing this social mission, Worthmore aims to reduce waste by fostering a culture of reuse and preventing unnecessary purchases. As a "free" store where all items cost $0, Worthmore offers an alternative economic practice that challenges students to think creatively about about resoruces sharing. It is located in the basement of Willets Hall. 
					</Text>
				</Box>
			</Flex>
		</VStack>

	);
}

export default About;
