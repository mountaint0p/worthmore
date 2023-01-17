import {
	useColorModeValue,
	InputGroup,
	InputLeftElement,
	Input,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { StoreSearchValues } from "../../../../types/storeSearchValues";

type SearchFilterComponentsProps = {
	values: StoreSearchValues;
	handleChange: ChangeEventHandler;
};
const NameFilter = ({ values, handleChange }: SearchFilterComponentsProps) => {
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
				placeholder="Search Items by Name"
			/>
		</InputGroup>
	);
};

export default NameFilter;
