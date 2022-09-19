import React from "react";
import {
	Box,
	Button,
	Heading,
	useColorModeValue,
	useDisclosure,
	Center,
	Accordion,
	Flex,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Fuse from "fuse.js";
import SortingFilter from "./searchFilter/SortingFilter";
import NameFilter from "./searchFilter/NameFilter";
import TagFilter from "./searchFilter/TagFilter";

export default function Sidebar({
	children,
	setLoading,
	setItemList,
	paginate,
	originalItemList,
}) {
	const { isOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
				setLoading={setLoading}
				setItemList={setItemList}
				paginate={paginate}
				originalItemList={originalItemList}
			/>
			{/* <Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer> */}
			{/* <MobileNav onOpen={onOpen} /> */}
			<Flex direction="column" align="center" ml={{ base: 0, md: 80 }} p="4">
				{children}
			</Flex>
		</Box>
	);
}

const filterSubmit = (
	values,
	fuse,
	originalItemList,
	setItemList,
	paginate
) => {
	paginate(1);
	let newItemList;
	if (values.search.length !== 0) {
		newItemList = fuse.search(values.search).map((search) => {
			return search.item;
		});
	} else {
		newItemList = [...originalItemList];
	}
	//If tags, filter items based on tags
	if (values.tags.length !== 0) {
		newItemList = newItemList.filter((item) => {
			return item.tags.some((tag) => values.tags.includes(tag));
		});
	}
	if (values.sorting === "alphabetical") {
		newItemList.sort((a, b) => {
			if (a.title > b.title) {
				return 1;
			} else if (a.title < b.title) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	setItemList(newItemList);
};

const SidebarContent = (
	{ setLoading, setItemList, paginate, originalItemList },
	{ onClose, ...rest }
) => {
	//FUSE properties
	const fuseOptions = {
		keys: ["title", "tags"],
	};
	const fuse = new Fuse(originalItemList, fuseOptions);
	return (
		//SIDEBAR PROPERTIES
		<Box
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 80 }}
			pos={{ base: "static", md: "fixed" }}
			h={{ base: "280px", md: "full" }}
			{...rest}
			pt="10px"
		>
			<Heading ml={{ base: "20px", md: "10px" }} mb="10px" size="md" mt="20px">
				Search Filters
			</Heading>
			<Formik
				initialValues={{
					sorting: "latest",
					search: "",
					tags: [],
				}}
				onSubmit={(values, actions) => {
					filterSubmit(values, fuse, originalItemList, setItemList, paginate);
				}}
			>
				{({ values, setFieldValue, handleChange }) => (
					<Form>
						<NameFilter handleChange={handleChange} values={values} />
						<Accordion mt="20px" allowMultiple>
							<SortingFilter values={values} handChange={setFieldValue} />
							<TagFilter />
						</Accordion>
						<Center mt="20px">
							<Button type="submit" colorScheme="green" pl="30px" pr="30px">
								Search
							</Button>
						</Center>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

//NOTE: Will fix mobile view later
/*
const NavItem = ({ icon, children, ...rest }) => {
	return (
		<Link
			href="#"
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "cyan.400",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontWeight="bold"
			>
				Logo
			</Text>

			<HStack spacing={{ base: "0", md: "6" }}>
				<LightModeButton />
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton py={2} _focus={{ boxShadow: "none" }}>
							<HStack>
								<Avatar
									size={"sm"}
									src="https://lh3.googleusercontent.com/fife/AAWUweXZUqcjSYcPNNFAiwr0QKnRCeAILM1fyQJN69dfMc2lo24i7Db-4aZKnbxNkSna9QZJJvYMWwN2qHnFVG6TL3wKVq9UdxDvIoprCQTkjKtpftwHpfokVZlXDqNigNDodYSwcIg1DwB4b5vteEtNYz_5YtmKR3BIXdoDy4M-e_nyy6Cpr43q4219_vfkX0dpPvP88_XAxqrj9ZZBsDPcJwoQou1Mx5YsIflWnamPkiuYMVv8ruS6ALo93tS5ZJEOj2JLI5iiNayNnJbcsNvU7mt3ZomqaVv7oZIkmN72s7XZf2OoLbyWE1mKDNsITbQVttyMONsflClgbSbRKlAkKoW1u9WjZDp1sEwl63iTWA6C2-BimgVJ_3fZawbCypZ3a7pPbPPnIANbzW4eUBCbV65YV3h_B8q0dEiB0-go5e2HBoET4-os_K6QOkM79H5r68hUVlko5e16q8crLaDM3GYey_ufeM_wcIRd3qHMDynkUyH1pWo0f_6oVHHiEnVzdgrUNy_KQjRbvdfkhdmUNapuYYzTMY41gWyD5kcBwppFT69P9yJDd0CR2cOLKTWSez_MEBKWCY7JwLV5E4sG2lPguOCLsFCOQQa68gCbsOvGL9uUhzLKtuCJtQOByWfTH2plnQ_aJxHZQHhRRRNV280IDylUClQfMTm-Aad72FFT5yL8ChrxQDIlf9sWQaqD8mbIHmyrYqaszYPSDdwkKfp0NNgvqoL-8Vo-IQcjuDRDT54=s64-c"
								/>
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">Summit Pradhan</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuDivider />
							<MenuItem>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
*/
