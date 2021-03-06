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
import { Auth } from "aws-amplify";
import React from "react";

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
const LoginControl = ({ user, setUser }) => {
	if (user === null) {
		return (
			<MenuItem onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
				Sign In
			</MenuItem>
		);
	} else {
		return <MenuItem onClick={() => Auth.signOut()}>Sign Out</MenuItem>;
	}
};
export default function Navbar({ user, setUser }) {
	React.useEffect(() => {
		const updateUser = async () => {
			try {
				let newUser = await Auth.currentAuthenticatedUser();
				setUser(newUser);
			} catch {
				setUser(null);
			}
		};
		updateUser();
	}, []);
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
									src={user === null ? "" : user.attributes.picture}
								/>
							</MenuButton>
							<MenuList>
								<MenuItem>Account Details</MenuItem>
								<MenuItem>Items on Hold</MenuItem>
								<Link as={RouterLink} to="/itemupload">
									<MenuItem>Upload Item</MenuItem>
								</Link>
								<MenuDivider />
								<LoginControl user={user} />
							</MenuList>
						</Menu>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
