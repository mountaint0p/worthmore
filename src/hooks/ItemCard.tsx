import { Button, Flex, Box, Image, Badge, Text } from "@chakra-ui/react";

export const App = () => {
	const property = {
		imageUrl: "https://bit.ly/2Z4KKcF",
		imageAlt: "Rear view of modern home with pool",
		beds: 3,
		baths: 2,
		title: "Modern home in city center in the heart of historic Los Angeles",
		formattedPrice: "$1,900.00",
		reviewCount: 34,
		rating: 4,
	};
	return (
		<Flex
			bg="black"
			_dark={{
				bg: "#3e3e3e",
			}}
			p={50}
			w="full"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				bg="white"
				_dark={{
					bg: "gray.800",
				}}
				maxW="sm"
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
			>
				<Image
					src={property.imageUrl}
					alt={property.imageAlt}
					roundedTop="lg"
				/>

				<Box p="6">
					<Box display="flex" alignItems="baseline">
						<Badge rounded="full" px="2" colorScheme="teal">
							New
						</Badge>
						<Box
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							textTransform="uppercase"
							ml="2"
						>
							{property.beds} beds &bull; {property.baths} baths
						</Box>
					</Box>

					<Text
						mt="1"
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						noOfLines={1}
					>
						{property.title}
					</Text>

					<Box>
						{property.formattedPrice}
						<Box as="span" color="gray.600" fontSize="sm">
							/ wk
						</Box>
					</Box>
				</Box>
			</Box>
		</Flex>
	);
};