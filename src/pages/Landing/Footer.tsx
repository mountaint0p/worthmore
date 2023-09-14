import { Instagram, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer
			aria-label="Site Footer"
			className="mt-28 w-full border-y border-black bg-gray-100 pb-20"
		>
			<div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div>
						<div className="flex items-center justify-center gap-2 sm:justify-start">
							<img src="/img/logo.png" className="h-12" />
							<div className="text-2xl font-medium">Worthmore</div>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
						<div className="flex flex-col items-center text-center sm:items-start sm:text-left ">
							<p className="text-lg font-medium text-gray-900">
								Green Advisors (GAs)
							</p>

							<nav aria-label="Footer Green Advisors Nav" className="mt-8">
								<ul className="flex flex-col items-center space-y-4 text-sm sm:items-start">
									<li>
										<a
											className="text-gray-700 transition hover:text-gray-700/75"
											href="https://www.swarthmore.edu/sustainability/green-advisors"
										>
											About the GA Program
										</a>
									</li>

									<li className="">
										<a
											className="flex items-center gap-2 text-gray-700 transition hover:text-gray-700/75"
											href="https://www.instagram.com/swatgreenadvisors/"
										>
											<Instagram size={18} />
											<p>Instagram: @Swatgreenadvisors</p>
										</a>
									</li>
								</ul>
							</nav>
						</div>

						<div className="flex flex-col items-center text-center sm:items-start sm:text-left ">
							<p className="text-lg font-medium text-gray-900">
								Office of Sustainability
							</p>

							<nav
								aria-label="Footer Office of Sustainability Nav"
								className="mt-8"
							>
								<ul className="flex flex-col items-center space-y-4 text-sm sm:items-start">
									<li>
										<a
											className="text-gray-700 transition hover:text-gray-700/75"
											href="https://www.swarthmore.edu/sustainability"
										>
											Sustainability on Campus
										</a>
									</li>

									<li>
										<a
											className="flex items-center gap-2 text-gray-700 transition hover:text-gray-700/75"
											href="https://www.instagram.com/swatsustain/"
										>
											<Instagram size={18} />
											<p>Instagram: @Swatsustain</p>
										</a>
									</li>
								</ul>
							</nav>
						</div>

						<div className="flex flex-col items-center text-center sm:items-start sm:text-left">
							<p className="text-lg font-medium text-gray-900">Contact Us</p>

							<ul className="mt-8 flex flex-col items-center space-y-4 text-sm sm:items-start">
								<li>
									<a
										className="sm:justify-starttext-gray-700 flex items-center justify-center gap-1.5 text-gray-700  transition  hover:text-gray-700/75"
										href="mailto: zerowaste@swarthmore.edu"
									>
										<Mail size={18} />

										<span>Email: zerowaste@swarthmore.edu </span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{
					//Might add privacy policy below?
					/* <div className="mt-12 border-t border-gray-100 pt-6">
					<div className="text-center sm:flex sm:justify-between sm:text-left">
						<p className="text-sm text-gray-500">
							<span className="block sm:inline">All rights reserved.</span>

							<a
								className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
								href="/"
							>
								Terms & Conditions
							</a>

							<span>&middot;</span>

							<a
								className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
								href="/"
							>
								Privacy Policy
							</a>
						</p>

						<p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
							&copy; 2022 Company Name
						</p>
					</div>
				</div> */
				}
			</div>
		</footer>
	);
}
