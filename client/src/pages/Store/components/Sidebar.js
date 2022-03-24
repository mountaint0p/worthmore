import React from "react";
import {
	Box,
	Checkbox,
	Button,
	CheckboxGroup,
	VStack,
	Heading,
	useColorModeValue,
	Drawer,
	DrawerContent,
	useDisclosure,
	Center,
	Input,
	InputLeftElement,
	InputGroup,
	AccordionItem,
	Stack,
	Accordion,
	Radio,
	RadioGroup,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Flex,
	FormControl,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { AiOutlineSearch } from "react-icons/ai";

export default function SidebarWithHeader({
	children,
	setLoading,
	setItemList,
	paginate,
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
			/>
			<Drawer
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
			</Drawer>
			{/* <MobileNav onOpen={onOpen} /> */}
			<Flex direction="column" align="center" ml={{ base: 0, md: 80 }} p="4">
				{children}
			</Flex>
		</Box>
	);
}
const SortingFilter = ({ values, setFieldValue }) => {
	return (
		<AccordionItem>
			<AccordionButton>
				<Box flex="1" textAlign="left">
					Sort By
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={4}>
				<RadioGroup
					colorScheme="green"
					id="sorting"
					name="sorting"
					defaultValue="latest"
					onChange={(value) => {
						values.sorting = value;
					}}
				>
					<Stack direction="column">
						<Radio value="latest">Date: Latest</Radio>
						<Radio value="oldest">Date: Oldest</Radio>
						<Radio value="alphabetical">Alphabetically</Radio>
					</Stack>
				</RadioGroup>
			</AccordionPanel>
		</AccordionItem>
	);
};

const SidebarContent = (
	{ setLoading, setItemList, paginate },
	{ onClose, ...rest }
) => {
	const getSearch = async (sort, search) => {
		try {
			setLoading(true);
			const response = await fetch(
				`http://localhost:5000/items/filter?sort=${sort}&search=${search}`
			);
			const jsonData = await response.json();
			setItemList(jsonData);
			console.log(jsonData);
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const searchBarColor = useColorModeValue("gray.100", "gray.700");
	return (
		<Box
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 80 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Heading ml="10px" mb="10px" size="md" mt="20px">
				Search Filters
			</Heading>
			<Formik
				initialValues={{
					sorting: "none",
					search: "",
				}}
				onSubmit={(values, actions) => {
					paginate(1);
					getSearch(values.sorting, values.search);
				}}
			>
				{({ values, setFieldValue, handleChange }) => (
					<Form>
						<InputGroup ml="10px">
							<InputLeftElement
								pointerEvents="none"
								children={<AiOutlineSearch />}
							/>
							<Input
								bgColor={searchBarColor}
								borderRadius="2xl"
								width="90%"
								height="35px"
								name="search"
								value={values.search || ""}
								onChange={handleChange}
								placeholder="Search Worthmore by Name"
							></Input>
						</InputGroup>
						<Accordion mt="20px" allowMultiple>
							<SortingFilter values={values} handChange={setFieldValue} />
							<AccordionItem>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										Filter by Tags
									</Box>
									<AccordionIcon />
								</AccordionButton>

								<AccordionPanel pb={4}>
									<CheckboxGroup colorScheme="green">
										<VStack align="left">
											<Checkbox value="decoration">Decoration</Checkbox>
											<Checkbox value="lighting">Lighting</Checkbox>
											<Checkbox value="tools">Tools</Checkbox>
											<Checkbox value="supplies">Supplies</Checkbox>
										</VStack>
									</CheckboxGroup>
								</AccordionPanel>
							</AccordionItem>
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
