import {
	useColorModeValue,
	InputGroup,
	InputLeftElement,
	Input,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AdminSearchValues } from "../../../types/adminSearchValues";

type HolderFilterProps = {
	values: AdminSearchValues;
	handleChange: ChangeEventHandler;
};
const HolderFilter = ({ values, handleChange }: HolderFilterProps) => {
	const searchBarColor = useColorModeValue("gray.100", "gray.700");
	return (
		<InputGroup ml="10px" mt="15px">
			<InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
			<Input
				bgColor={searchBarColor}
				borderRadius="2xl"
				width="90%"
				height="35px"
				name="holder"
				value={values.holder || ""}
				onChange={handleChange}
				placeholder="Search Items by Holder's Name"
			/>
		</InputGroup>
	);
};

export default HolderFilter;
