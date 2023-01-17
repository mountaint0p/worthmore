import {
	Box,
	Accordion,
	AccordionItem,
	AccordionPanel,
	Heading,
	AccordionButton,
	AccordionIcon,
	Container,
} from "@chakra-ui/react";

export default function FAQ() {
	return (
		<Container maxW={"4xl"} py={12}>
			<Heading size="3xl" textAlign="center">
				Worthmore F.A.Q
			</Heading>
			<Accordion allowToggle mt="40px">
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
								How do donations in residence hall lounges work during spring
								move-out?
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						Typically, at the end of every spring semester, we open up extensive
						donation opportunities in residence halls during our move-out
						program. Students are asked to bring all re-usable items to
						designated lounges, typically on the bottom floor of each residence
						hall, and sort items into pre-marked areas that are set up during
						finals. We need everyone's participation to take responsibility for
						your communal spaces.
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
								When/how can I donate to Worthmore?
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
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
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
								What can I donate to Worthmore?
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						When deciding whether an item can be donated, be practical and
						respectful! Do not donate items that are unhygienic, contain any
						personal identification, or are against College policy (e.g.,
						candles). During move-out, please place all donated items in bins in
						the correct designated area. For example, clothing goes in the
						large, GreenDrop cardboard box. Learn more here about which items
						will and will not be accepted as donations during move-out.
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" fontSize="xl" fontWeight="bold">
								What is the history of Worthmore?
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
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
						funding to pay student workers. By using any lounge as a collection
						point (instead of our now more limited designated areas), the
						previous system left EVS staff with the burden of transporting,
						sorting, and separating donations from trash.
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Container>
	);
}
