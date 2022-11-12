import React from "react";
import {
	Heading,
	Text,
	VStack,
	Box,
	Flex,
	Button,
	Link,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	List,
	UnorderedList,
	ListItem,
	AccordionPanel,
	Center,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AboutWorthmore from "./AboutWorthmore";
import MoveOut from "./MoveOut";
import FAQ from "./FAQ";

function Landing() {
	// const about = useRef();

	// const executeScroll = () => about.current.scrollIntoView()

	return (
		<VStack>
			<Flex
				direction="column"
				height="90vh"
				justify="center"
				align="center"
				width="90vw"
			>
				<Heading size={{ base: "3xl", md: "4xl" }}>Worthmore:</Heading>
				<Heading
					display="flex"
					textAlign="center"
					size={{ base: "3xl", md: "4xl" }}
				>
					Swarthmore College's
				</Heading>
				<Heading size={{ base: "3xl", md: "4xl" }} color="green.500">
					Free Store
				</Heading>
				<Box mt="20px">
					<Text align="center" fontSize="2xl">
						Explore the items donated by Swarthmore students, all for $0
					</Text>
				</Box>
				<Link as={RouterLink} to="/store" _hover={{ textDecoration: "none" }}>
					<Button size="lg" colorScheme="green" mt="20px">
						See the Store
					</Button>
				</Link>
				<Box mt="20px">
					<Text align="center" fontSize="2xl">
						Wednesday: 7 - 9 pm
					</Text>
					<Text align="center" fontSize="2xl">
						Saturday: 1 - 3 pm
					</Text>
					<Text align="center" fontSize="2xl">
						Located in Willet's Basement
					</Text>
				</Box>
			</Flex>
			<AboutWorthmore />
			<Box p="50px" />
			<MoveOut />
			<Box p="50px" />
			<FAQ />
			<Box p="200px" />
		</VStack>
	);
}

export default Landing;
