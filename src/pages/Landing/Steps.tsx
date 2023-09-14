import { IoSearchSharp, IoCartSharp, IoStorefrontSharp } from "react-icons/all";
export default function Steps() {
	return (
		<div className="mx-auto max-w-6xl px-8 lg:px-6">
			<div className="max-w-screen-lg">
				<h2 className="mb-4 text-5xl font-black tracking-tight lg:text-6xl">
					Getting Items from Worthmore Has Never Been Easier
				</h2>
				<p className="text-black-500 text-2xl font-medium">
					In three easy steps, you can get the supplies you need.
				</p>
			</div>
			<div className="mt-12 space-y-8 md:grid md:gap-12 md:space-y-0 lg:grid-cols-3">
				<div className="group relative mx-6 block rounded-3xl border-4 border-black bg-white pt-12 transition hover:bg-emerald-100 sm:pt-16 lg:mx-0 lg:pt-24">
					{" "}
					<span className="absolute inset-0 -z-10 -translate-x-2 -translate-y-2 rounded-3xl bg-white ring-4 ring-black"></span>
					<span className="absolute inset-0 -z-20 -translate-x-4 -translate-y-4 rounded-3xl bg-white ring-4 ring-black"></span>
					<div className="p-4">
						<IoSearchSharp className="mb-2 h-10 w-10" />
						<h3 className="mb-2 text-2xl font-bold ">#1: Find it</h3>
						<p className="text-lg">
							Save time finding the supplies you need by searching for them
							using the online store.
						</p>
					</div>
				</div>
				<div className="group relative mx-6 block rounded-3xl border-4 border-black bg-white pt-12 transition hover:bg-emerald-100 sm:pt-16 lg:mx-0 lg:pt-24">
					{" "}
					<span className="absolute inset-0 -z-10 -translate-x-2 -translate-y-2 rounded-3xl bg-white ring-4 ring-black"></span>
					<span className="absolute inset-0 -z-20 -translate-x-4 -translate-y-4 rounded-3xl bg-white ring-4 ring-black"></span>
					<div className="p-4">
						<IoCartSharp className="mb-2 h-10 w-10" />
						<h3 className="mb-2 text-2xl font-bold ">#2: Reserve it</h3>
						<p className="text-lg ">
							For up to a week, reserve items from the store to pick up later.
						</p>
					</div>
				</div>
				<div className="group relative mx-6 block rounded-3xl border-4 border-black bg-white pt-12 transition hover:bg-emerald-100 sm:pt-16 lg:mx-0 lg:pt-24">
					{" "}
					<span className="absolute inset-0 -z-10 -translate-x-2 -translate-y-2 rounded-3xl bg-white ring-4 ring-black"></span>
					<span className="absolute inset-0 -z-20 -translate-x-4 -translate-y-4 rounded-3xl bg-white ring-4 ring-black"></span>
					<div className="p-4">
						<IoStorefrontSharp className="mb-2 h-10 w-10" />
						<h3 className="mb-2 text-2xl font-bold ">#3: Pick it up</h3>
						<p className="text-lg ">
							Come to Worthmore during open-hours to get your items.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
