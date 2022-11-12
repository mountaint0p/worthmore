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
		<Container maxW={"5xl"} py={12}>
			<Heading size="3xl" align="center">
				Worthmore F.A.Q
			</Heading>
			<Accordion allowToggle mt="40px">
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
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
							<Box flex="1" textAlign="left">
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
			</Accordion>
		</Container>
	);
}
