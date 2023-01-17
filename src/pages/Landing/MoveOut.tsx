import {
	Container,
	SimpleGrid,
	Image,
	Flex,
	Heading,
	Text,
	Stack,
} from "@chakra-ui/react";

export default function SplitWithImage() {
	return (
		<Container maxW={"5xl"} py={12}>
			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
				<Stack spacing={4}>
					<Heading size="3xl" w="400px">
						Worthmore Move-Out Program
					</Heading>
					<Text fontSize={"lg"}>
						Students leave a lot of stuff behind when they move out of residence
						halls at the end of the academic year. In 2017, for example,
						Worthmore collected over 4,700 hangers, 100 lamps, 80 trash cans,
						and 60 fans. In order to prevent these items from being thrown in
						dumpsters (and incinerated at the Covanta incinerator in nearby
						Chester, PA), Green Advisors and Worthmore student workers collect
						donated items from designated residental hall lounges across campus.
					</Text>
				</Stack>
				<Flex>
					<Image
						rounded={"md"}
						alt={"feature image"}
						src={
							"https://swarthmorephoenix.com/wp-content/uploads/2017/09/IMG_0726.jpg"
						}
						objectFit={"cover"}
					/>
				</Flex>
			</SimpleGrid>
		</Container>
	);
}
