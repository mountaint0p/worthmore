import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/Accordion";

export default function FAQ() {
	return (
		<div className="flex w-11/12 flex-col items-center" id="FAQ">
			<h2 className="mb-4 mt-10 text-5xl font-black tracking-tight lg:mt-16 lg:text-6xl">
				Worthmore FAQs
			</h2>
			<Accordion type="single" collapsible className="w-9/12">
				<AccordionItem value="item-1">
					<AccordionTrigger className="text-lg lg:text-xl">
						How do donations in residence hall lounges work during spring
						move-out?
					</AccordionTrigger>
					<AccordionContent className="text-base lg:text-lg">
						Typically, at the end of every spring semester, we open up extensive
						donation opportunities in residence halls during our move-out
						program. Students are asked to bring all re-usable items to
						designated lounges, typically on the bottom floor of each residence
						hall, and sort items into pre-marked areas that are set up during
						finals. We need everyone's participation to take responsibility for
						your communal spaces.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="text-lg lg:text-xl">
						When/how can I donate to Worthmore?
					</AccordionTrigger>
					<AccordionContent className="text-base lg:text-lg">
						During the academic year, specific items can be brought directly to
						the Free Store in Willets. We are no longer collecting food
						donations, clothing donations, or large furniture. Please reach out
						to GreenDrop to donate these items. During spring finals ONLY, we
						set up special donation sites in residence hall lounges in order to
						manage the extremely high volume of donations that we typically
						receive during move-out. We are no longer collecting food donations,
						clothing donations, or large furniture items. Residence hall
						donation sites are set up in early May and typically open for
						several weeks. We can't be exact with the days because both setting
						up and breaking down the sites takes the Worthmore team a few days
						on each end.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3" className="text-lg lg:text-xl">
					<AccordionTrigger>What can I donate to Worthmore?</AccordionTrigger>
					<AccordionContent className="text-base lg:text-lg">
						When deciding whether an item can be donated, be practical and
						respectful! Do not donate items that are unhygienic, contain any
						personal identification, or are against College policy (e.g.,
						candles). During move-out, please place all donated items in bins in
						the correct designated area. For example, clothing goes in the
						large, GreenDrop cardboard box. Learn more{" "}
						<a
							href="https://www.swarthmore.edu/sustainability/what-to-donate"
							className="text-blue-800 underline"
						>
							here
						</a>{" "}
						about which items will and will not be accepted as donations during
						move-out.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4" className="text-lg lg:text-xl">
					<AccordionTrigger>What is the history of Worthmore?</AccordionTrigger>
					<AccordionContent className="text-base lg:text-lg">
						Worthmore began with the move-out of Spring 2017, replacing the
						Trash2Treasure summer sale that operated from 2007 to 2015. Due to a
						combination of factors, we decided to discontinue Trash2Treasure and
						to consider alternative means to make use of the items students
						leave behind. Because the sale took place over the summer,
						Trash2Treasure was formerly inaccessible to most Swarthmore students
						despite selling items that students really need. By saving items for
						the Free Store, we hope to help the needs of incoming and returning
						students. Furthermore, the previous model for the sale required
						hundreds of volunteer hours on the part of staff and significant
						funding to pay student workers.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-5" className="text-lg lg:text-xl">
					<AccordionTrigger>
						How many items can I reserve through the online store?
					</AccordionTrigger>
					<AccordionContent className="text-base lg:text-lg">
						You can reserve up to three items every week.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
