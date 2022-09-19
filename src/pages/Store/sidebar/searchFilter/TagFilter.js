import { tagList } from "../../../../common/tagList";
import {
	AccordionItem,
	AccordionButton,
	Box,
	AccordionIcon,
	AccordionPanel,
	CheckboxGroup,
	VStack,
	Checkbox,
} from "@chakra-ui/react";
import { Field } from "formik";

const TagFilter = () => {
	return (
		<AccordionItem>
			<AccordionButton>
				<Box flex="1" textAlign="left">
					Filter by Tags
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={4}>
				<CheckboxGroup defaultValue={[]} colorScheme="green">
					<VStack align="left">
						{/*Iterates through all tags for filter*/}
						{tagList.map((tag) => {
							return (
								<Field name="tags" value={tag} as={Checkbox} key={tag}>
									{tag}
								</Field>
							);
						})}
					</VStack>
				</CheckboxGroup>
			</AccordionPanel>
		</AccordionItem>
	);
};

export default TagFilter;
