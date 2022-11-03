import { Checkbox, Box } from "@chakra-ui/react";

const ReservedFilter = ({ values, handleChange }) => {
	return (
		<Box p="10px">
			<Checkbox colorScheme="green" name="reserved" onChange={handleChange}>
				Reserved Items Only
			</Checkbox>
		</Box>
	);
};

export default ReservedFilter;
