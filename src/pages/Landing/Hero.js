import React from "react";
import { Flex, Heading, Box, Button, Text } from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";

function Hero() {
	return (
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
	);
}

export default Hero;
