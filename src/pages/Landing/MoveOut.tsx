import ImageSlider from "@/components/ui/ImageSlider";
export default function MoveOut() {
	const slides = ["/img/Moveout1.jpg"];
	return (
		<section>
			<div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 ">
				<div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
					<div className="relative flex items-center border-4 border-black bg-emerald-300">
						<span className="-my-1 hidden border-y-4 border-r-4 border-black lg:absolute lg:inset-y-0 lg:-right-16 lg:block lg:w-16 lg:bg-emerald-300"></span>
						<div className="p-8 sm:p-16 lg:p-24">
							<h1 className="text-5xl font-black text-slate-800 md:text-6xl">
								What is the Worthmore Move-Out Program?
							</h1>

							<p className="mt-4 text-lg font-medium text-slate-800">
								Students leave a lot of stuff behind when they move out of
								residence halls at the end of the academic year. In 2017, for
								example, Worthmore collected over 4,700 hangers, 100 lamps, 80
								trash cans, and 60 fans. In order to prevent these items from
								being thrown in dumpsters (and incinerated at the Covanta
								incinerator in nearby Chester, PA), Green Advisors and Worthmore
								student workers collect donated items from designated residental
								hall lounges across campus.
							</p>
						</div>
					</div>
					<div className="relative z-10 lg:py-16 ">
						<div className="relative h-80 border-4 border-slate-800 lg:h-full">
							<ImageSlider slides={slides} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
