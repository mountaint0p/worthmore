import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/Accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { Field } from "formik";
import { StoreSearchValues } from "../../../../types/storeSearchValues";

const SortingFilter = ({ values }: { values: StoreSearchValues }) => {
	return (
		<Accordion type="multiple" className="mt-5 border-b  border-black">
			<AccordionItem value="item-1" className="px-4">
				<AccordionTrigger>Sort By</AccordionTrigger>
				<AccordionContent className="pl-1 pt-1 ">
					<RadioGroup id="sorting" name="sorting" defaultValue="latest">
						<div className="flex items-center space-x-2">
							<Field value="latest" id="latest" as={RadioGroupItem} />
							<Label htmlFor="latest">Latest</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Field value="oldest" id="oldest" as={RadioGroupItem} />
							<Label htmlFor="oldest">Oldest</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Field
								value="alphabetically"
								id="alphabetically"
								as={RadioGroupItem}
							/>
							<Label htmlFor="alphabetically">Alphabetically</Label>
						</div>
					</RadioGroup>
				</AccordionContent>
			</AccordionItem>
		</Accordion>

		/* // <Accordion mt="20px" allowMultiple>
		// 	<AccordionItem>
		// 		<AccordionButton>
		// 			<Box flex="1" textAlign="left">
		// 				Sort By
		// 			</Box>
		// 			<AccordionIcon />
		// 		</AccordionButton>
		// 		<AccordionPanel pb={4}>
		// 			<RadioGroup
		// 				colorScheme="green"
		// 				id="sorting"
		// 				name="sorting"
		// 				defaultValue="latest"
		// 			>
		// 				<Stack direction="column">
		// 					<Field value="latest" as={Radio}>
		// 						Date: Latest
		// 					</Field>
		// 					<Field value="oldest" as={Radio}>
		// 						Date: Oldest
		// 					</Field>
		// 					<Field value="alphabetical" as={Radio}>
		// 						Alphabetically
		// 					</Field>
		// 				</Stack>
		// 			</RadioGroup>
		// 		</AccordionPanel>
		// 	</AccordionItem>
		// </Accordion> */
	);
};

export default SortingFilter;
