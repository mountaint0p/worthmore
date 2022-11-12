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
						Worthmore Free Store
					</Heading>
					<Text fontSize={"lg"}>
						The Worthmore Free Store provides access to room furnishings and
						other supplies for students who may otherwise face cost or transport
						barriers in obtaining such items. Complementing this social mission,
						Worthmore aims to reduce waste by fostering a culture of reuse and
						preventing unnecessary purchases. As a "free" store where all items
						cost $0, Worthmore offers an alternative economic practice that
						challenges students to think creatively about about resoruces
						sharing. It is located in the basement of Willets Hall.
					</Text>
				</Stack>
				<Flex>
					<Image
						rounded={"md"}
						alt={"feature image"}
						src={
							"https://www.swarthmore.edu/sites/default/files/styles/standard_page_header/public/assets/images/sustainability/student%20at%20worthmore_1.png?itok=-b-gTOcs"
						}
						objectFit={"cover"}
					/>
				</Flex>
			</SimpleGrid>
		</Container>
	);
}
