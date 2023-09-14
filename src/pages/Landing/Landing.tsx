import AboutWorthmore from "./AboutWorthmore";
import MoveOut from "./MoveOut";
import FAQ from "./FAQ";
import Hero from "./Hero";
import Banner from "./Banner";
import Steps from "./Steps";
import Footer from "./Footer";
import Impact from "./Impact";

function Landing() {
	// const about = useRef();

	// const executeScroll = () => about.current.scrollIntoView()
	return (
		<div className="flex w-screen flex-col items-center gap-28">
			<Banner />
			<Hero />
			<Steps />
			<AboutWorthmore />
			<MoveOut />
			<Impact />
			<FAQ />
			<Footer />
		</div>
	);
}

export default Landing;
