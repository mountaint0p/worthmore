import { Button } from "@/components/ui/Button";
import { Link, Link as RouterLink } from "react-router-dom";

function Hero() {
	return (
		<div className="-mb-32 -mt-10 flex h-screen w-full flex-col items-center justify-center">
			<h1 className="text-5xl font-black md:text-7xl">Worthmore:</h1>
			<h1 className="text-center  text-5xl font-black md:text-7xl">
				{" "}
				Swarthmore College's
			</h1>
			<h1 className="text-5xl font-black text-emerald-600 md:text-7xl ">
				Free Store
			</h1>
			<div className="mt-2 text-center text-2xl font-medium">
				Explore the items donated by Swarthmore students, all for $0
			</div>
			<RouterLink to="/store">
				<Button
					size="lg"
					className="mt-5 bg-green-600 text-lg hover:bg-green-700"
				>
					See the Store
				</Button>
			</RouterLink>
			<div className="mt-4">
				<div className="text-center text-2xl font-medium">
					Wednesday: 7 - 9 pm
				</div>
				<div className="text-center text-2xl font-medium">
					Saturday: 1 - 3 pm
				</div>
				<div className="text-center text-2xl font-medium">
					Located in Willets Hall Basement
				</div>
			</div>
		</div>
	);
}

export default Hero;
