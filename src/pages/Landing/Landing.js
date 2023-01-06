import React from "react";
import {
	Heading,
	Text,
	VStack,
	Box,
	Flex,
	Button,
	Link,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	List,
	UnorderedList,
	ListItem,
	AccordionPanel,
	Center,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AboutWorthmore from "./AboutWorthmore";
import MoveOut from "./MoveOut";
import FAQ from "./FAQ";
import Hero from "./Hero";

function Landing() {
	// const about = useRef();

	// const executeScroll = () => about.current.scrollIntoView()

	return (
		<VStack>
			<Hero />
			<AboutWorthmore />
			<Box p="50px" />
			<MoveOut />
			<Box p="50px" />
			<FAQ />
			<Box p="50px" />
		</VStack>
	);
}

export default Landing;
