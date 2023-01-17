import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import AboutWorthmore from "./AboutWorthmore.tsx";
import MoveOut from "./MoveOut.tsx";
import FAQ from "./FAQ.tsx";
import Hero from "./Hero.tsx";

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
