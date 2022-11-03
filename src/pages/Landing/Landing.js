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

function Landing() {
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
					<Text align="center" fontSize="xl">
						Explore the items donated by Swarthmore students, all for $0
					</Text>
				</Box>
				<Link as={RouterLink} to="/store" _hover={{ textDecoration: "none" }}>
					<Button size="lg" colorScheme="green" mt="20px">
						See the Store
					</Button>
				</Link>
				<Box mt="20px">
				<Text align="center" fontSize="xl">
				Wednesday: 7 - 9 pm
					</Text>
					<Text align="center" fontSize="xl">
					Saturday: 1 - 3 pm
					</Text>
					</Box>
			</Flex>
		</VStack>
		// <VStack align="center">
		// 	<Flex
		// 		direction="column"
		// 		height="90vh"
		// 		justify="center"
		// 		align="center"
		// 		width="90vw"
		// 	>
		// 		<Heading size="4xl">Worthmore:</Heading>
		// 		<Heading display="flex" textAlign="center" size="4xl">
		// 			Swarthmore College's
		// 		</Heading>
		// 		<Heading size="4xl" color="green.400">
		// 			Free Store
		// 		</Heading>
		// 		<Box mt="20px">
		// 			<Text align="center" fontSize="xl">
		// 				Explore the items donated by Swarthmore students, all for $0
		// 			</Text>
		// 		</Box>
		// 		<Link as={RouterLink} to="/store" _hover={{ textDecoration: "none" }}>
		// 			<Button size="lg" colorScheme="green" mt="20px">
		// 				Go to Store
		// 			</Button>
		// 		</Link>
		// 	</Flex>
		// 	<Flex
		// 		direction="column"
		// 		height="60vh"
		// 		justify="center"
		// 		align="center"
		// 		width="70vw"
		// 	>
		// 		<Heading size="3xl" textAlign="center">
		// 			What Is Worthmore?
		// 		</Heading>
		// 		<Text fontSize="lg" mt={6} align="center">
		// 			The Worthmore Free Store provides access to room furnishings and other
		// 			supplies for students who may otherwise face cost or transport
		// 			barriers in obtaining such items. Complementing this social mission,
		// 			Worthmore aims to reduce waste by fostering a culture of reuse and
		// 			preventing unnecessary purchases. As a "free" store where all items
		// 			cost $0, Worthmore offers an alternative economic practice that
		// 			challenges students to think creatively about about resoruces sharing.
		// 			It is located in the basement of Willets Hall.
		// 		</Text>
		// 	</Flex>
		// 	<Flex
		// 		direction="column"
		// 		height="60vh"
		// 		justify="center"
		// 		align="center"
		// 		width="70vw"
		// 		mt="100px"
		// 	>
		// 		<Heading size="3xl" textAlign="center">
		// 			Why Shop at Worthmore?
		// 		</Heading>
		// 		<Text fontSize="lg" max-width="50vw" mt={6} align="center">
		// 			The Worthmore Free Store provides access to room furnishings and other
		// 			supplies for students who may otherwise face cost or transport
		// 			barriers in obtaining such items. Complementing this social mission,
		// 			Worthmore aims to reduce waste by fostering a culture of reuse and
		// 			preventing unnecessary purchases. As a "free" store where all items
		// 			cost $0, Worthmore offers an alternative economic practice that
		// 			challenges students to think creatively about about resoruces sharing.
		// 			It is located in the basement of Willets Hall.
		// 		</Text>
		// 	</Flex>
		// 	<Flex
		// 		direction="column"
		// 		height="60vh"
		// 		justify="center"
		// 		align="center"
		// 		width="70vw"
		// 	>
		// 		<Heading size="3xl" textAlign="center">
		// 			FAQ
		// 		</Heading>
		// 		<Accordion mt="20px" allowMultiple width="100%">
		// 			<AccordionItem>
		// 				<AccordionButton>
		// 					<Box flex="1" textAlign="left">
		// 						When is the Worthmore Free Store open and where is it located?
		// 					</Box>
		// 					<AccordionIcon />
		// 				</AccordionButton>
		// 				<AccordionPanel>
		// 					Weekly open hours are hosted by Green Advisors. Our current open
		// 					hours are Wednesday, 7-8 pm and Sunday, 4-5 pm . Worthmore is
		// 					located in the Willets Hall basement and is accessible through the
		// 					LL entry.
		// 				</AccordionPanel>
		// 			</AccordionItem>

		// 			<AccordionItem>
		// 				<AccordionButton>
		// 					<Box flex="1" textAlign="left">
		// 						How do donations in residence hall lounges work during spring
		// 						move-out?
		// 					</Box>
		// 					<AccordionIcon />
		// 				</AccordionButton>
		// 				<AccordionPanel>
		// 					<Box>
		// 						<Text>
		// 							Typically, at the end of every spring semester, we open up
		// 							extensive donation opportunities in residence halls during our
		// 							move-out program. Students are asked to bring all re-usable
		// 							items to designated lounges, typically on the bottom floor of
		// 							each residence hall, and sort items into pre-marked areas that
		// 							are set up during finals.
		// 						</Text>
		// 						<Text mt={8} as="em">
		// 							We need everyone's participation to take responsibility for
		// 							your communal spaces.
		// 						</Text>
		// 						<UnorderedList>
		// 							<ListItem>
		// 								Do not remove tape or move lounge furniture back into taped
		// 								areas. This will negatively impact the EVS staff and student
		// 								workers in your building.
		// 							</ListItem>
		// 							<ListItem>If it's really trash, do not donate it!</ListItem>
		// 							<ListItem>
		// 								ALWAYS fold cardboard boxes before recycling.
		// 							</ListItem>
		// 						</UnorderedList>
		// 						<Text>
		// 							Please see more detailed information in our sub-pages about
		// 							residence hall donation sites, how the lounges will be set-up,
		// 							and what you can and cannot donate.
		// 						</Text>
		// 					</Box>
		// 				</AccordionPanel>
		// 			</AccordionItem>
		// 		</Accordion>
		// 	</Flex>
		// </VStack>
	);
}

export default Landing;
