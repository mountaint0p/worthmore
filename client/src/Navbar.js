import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Heading,
	useColorModeValue,
	Spacer,
	Text,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import LightModeButton from "./LightModeButton";

/*
const NavLink = ({ children }) => (
	<Link
		px={2}
		py={1}
		rounded={"md"}
		_hover={{
			textDecoration: "none",
			bg: useColorModeValue("gray.200", "gray.700"),
		}}
		as={RouterLink}
		to="/store"
	>
		{children}
	</Link>
);
*/

export default function Navbar() {
	return (
		<>
			<Box
				bg={useColorModeValue("white", "gray.900")}
				px={4}
				borderBottom="1px"
				borderBottomColor="gray.200"
				pos="fixed"
				top="0"
				w="100%"
				zIndex={2}
			>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Page Menu"
							variant="ghost"
							cursor={"pointer"}
							icon={<AiOutlineMenu />}
							display={{ md: "none" }}
						/>
						<MenuList>
							<Link as={RouterLink} to="/store">
								<MenuItem>Store</MenuItem>
							</Link>
						</MenuList>
					</Menu>

					<HStack spacing={8} alignItems={"center"}>
						<Link
							rounded={"md"}
							_hover={{
								textDecoration: "none",
								bg: useColorModeValue("gray.200", "gray.700"),
							}}
							as={RouterLink}
							to="/"
						>
							<Box>
								<Heading
									size="lg"
									fontWeight="extrabold"
									bgGradient="linear(to-r, green.300, green.500)"
									bgClip="text"
								>
									Worthmore
								</Heading>
							</Box>
						</Link>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							<Link
								rounded="md"
								_hover={{
									textDecoration: "none",
									bg: useColorModeValue("gray.200", "gray.700"),
								}}
								as={RouterLink}
								to="/store"
							>
								<Text fontWeight={600}>Store</Text>
							</Link>
						</HStack>
					</HStack>
					<Flex>
						<LightModeButton mr="10px" />
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
								minW={0}
							>
								<Avatar
									size={"sm"}
									src={
										"https://lh3.googleusercontent.com/fife/AAWUweXZUqcjSYcPNNFAiwr0QKnRCeAILM1fyQJN69dfMc2lo24i7Db-4aZKnbxNkSna9QZJJvYMWwN2qHnFVG6TL3wKVq9UdxDvIoprCQTkjKtpftwHpfokVZlXDqNigNDodYSwcIg1DwB4b5vteEtNYz_5YtmKR3BIXdoDy4M-e_nyy6Cpr43q4219_vfkX0dpPvP88_XAxqrj9ZZBsDPcJwoQou1Mx5YsIflWnamPkiuYMVv8ruS6ALo93tS5ZJEOj2JLI5iiNayNnJbcsNvU7mt3ZomqaVv7oZIkmN72s7XZf2OoLbyWE1mKDNsITbQVttyMONsflClgbSbRKlAkKoW1u9WjZDp1sEwl63iTWA6C2-BimgVJ_3fZawbCypZ3a7pPbPPnIANbzW4eUBCbV65YV3h_B8q0dEiB0-go5e2HBoET4-os_K6QOkM79H5r68hUVlko5e16q8crLaDM3GYey_ufeM_wcIRd3qHMDynkUyH1pWo0f_6oVHHiEnVzdgrUNy_KQjRbvdfkhdmUNapuYYzTMY41gWyD5kcBwppFT69P9yJDd0CR2cOLKTWSez_MEBKWCY7JwLV5E4sG2lPguOCLsFCOQQa68gCbsOvGL9uUhzLKtuCJtQOByWfTH2plnQ_aJxHZQHhRRRNV280IDylUClQfMTm-Aad72FFT5yL8ChrxQDIlf9sWQaqD8mbIHmyrYqaszYPSDdwkKfp0NNgvqoL-8Vo-IQcjuDRDT54=s64-c"
									}
								/>
							</MenuButton>
							<MenuList>
								<MenuItem>Account Details</MenuItem>
								<MenuItem>Items on Hold</MenuItem>
								<MenuDivider />
								<MenuItem>Log Out</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
