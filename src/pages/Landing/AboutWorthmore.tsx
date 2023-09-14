import ImageSlider from "@/components/ui/ImageSlider";
export default function AboutWorthmore() {
	const slides = [
		"/img/Worthmore1.jpg",
		"/img/Worthmore2.jpg",
		"/img/Worthmore3.jpg",
	];
	return (
		<section>
			<div className="mx-auto mt-16 max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-14">
				<div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
					<div className="relative z-10 lg:py-16">
						<div className="relative h-80 border-4 border-slate-800 md:h-fit lg:h-full">
							<ImageSlider slides={slides} />
						</div>
					</div>

					<div className="relative flex items-center border-4 border-slate-800 bg-emerald-300">
						<span className="-my-1 hidden border-y-4 border-l-4 border-black lg:absolute lg:inset-y-0  lg:-left-16 lg:block lg:w-16 lg:bg-emerald-300"></span>

						<div className="p-8 sm:p-16 lg:p-24">
							<h1 className="text-5xl font-black text-slate-800 md:text-6xl">
								What is the Worthmore Free Store?
							</h1>

							<p className="mt-4 text-lg font-medium text-slate-800">
								Located in the basement of Willets Hall of Swarthmore College,
								the Worthmore Free Store provides access to room furnishings and
								other supplies for students who may otherwise face cost or
								transport barriers in obtaining such items. Complementing this
								social mission, Worthmore aims to reduce waste by fostering a
								culture of reuse and preventing unnecessary purchases. As a
								"free" store where all items cost $0, Worthmore offers an
								alternative economic practice that challenges students to think
								creatively about about resoruces sharing.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
