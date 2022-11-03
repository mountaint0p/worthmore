import {
	Accordion,
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

const SortingFilter = ({ values }) => {
	return (
		<Accordion mt="20px" allowMultiple allowToggle>
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
		</Accordion>
	);
};

export default SortingFilter;
