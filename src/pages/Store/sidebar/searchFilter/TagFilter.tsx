import { tagList } from "../../../../common/tagList";

import {
	Accordion,
	AccordionItem,
	AccordionContent,
	AccordionTrigger,
} from "@/components/ui/Accordion";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "formik";

const TagFilter = () => {
	return (
		<Accordion type="multiple" className="border-b  border-black">
			<AccordionItem value="item-1" className="px-4">
				<AccordionTrigger>Filter by tags</AccordionTrigger>
				<AccordionContent className="pl-1 pt-1">
					<div className="flex flex-col items-start">
						{tagList.map((tag) => {
							return (
								<div className="mb-2 flex items-start gap-2" key={tag}>
									<Field
										name="tags"
										value={tag}
										id={tag}
										as={Checkbox}
										key={tag}
									/>
									<label
										htmlFor="terms"
										className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{tag}
									</label>
								</div>
							);
						})}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default TagFilter;
