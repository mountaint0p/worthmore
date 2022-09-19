import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	RadioGroup,
	Stack,
	Box,
	AccordionIcon,
	Radio,
} from "@chakra-ui/react";
import { Field } from "formik";

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
				>
					<Stack direction="column">
						<Field value="latest" as={Radio}>
							Date: Latest
						</Field>
						<Field value="oldest" as={Radio}>
							Date: Oldest
						</Field>
						<Field value="alphabetical" as={Radio}>
							Alphabetically
						</Field>
					</Stack>
				</RadioGroup>
			</AccordionPanel>
		</AccordionItem>
	);
};

export default SortingFilter;
