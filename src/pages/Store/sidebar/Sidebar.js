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
	} else if (values.sorting === "latest") {
		newItemList.sort((a, b) => {
			if (a.dateAdded < b.dateAdded) {
				return 1;
			} else if (a.dateAdded > b.dateAdded) {
				return -1;
			} else {
				return 0;
			}
		});
	} else if (values.sorting === "oldest") {
		newItemList.sort((a, b) => {
			if (a.dateAdded > b.dateAdded) {
				return 1;
			} else if (a.dateAdded < b.dateAdded) {
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
