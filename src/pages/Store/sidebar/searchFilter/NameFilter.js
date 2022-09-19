import {
	useColorMode,
	useColorModeValue,
	InputGroup,
	InputLeftElement,
	Input,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const NameFilter = ({ handleChange, values }) => {
	const searchBarColor = useColorModeValue("gray.100", "gray.700");
	return (
		<InputGroup ml="10px">
			<InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
			<Input
				bgColor={searchBarColor}
				borderRadius="2xl"
				width="90%"
				height="35px"
				name="search"
				value={values.search || ""}
				onChange={handleChange}
				placeholder="Search Worthmore by Name"
			/>
		</InputGroup>
	);
};

export default NameFilter;
