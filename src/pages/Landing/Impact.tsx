import React from "react";
import HoverCard from "../../components/ui/HoverCard";
import { FaDollarSign, FaRecycle, FaLeaf } from "react-icons/all";

export default function Impact() {
	return (
		<div className="w-11/12">
			<div className="mx-auto mt-10 flex w-full flex-col items-center px-4 lg:px-6">
				<div className="max-w-screen-md">
					<h2 className="text-5xl font-black tracking-tight lg:text-6xl">
						Worthmore's Impact
					</h2>
				</div>
				<div className="mt-10 w-full max-w-6xl space-y-8 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
					<HoverCard
						title="Reducing Waste"
						text="By having students donate their items for second-hand use rather than throwing them away, 
						Worthmore has helped divert thousands of pounds of waste away from the Covanta Incinerator."
						Icon={FaRecycle}
					/>
					<HoverCard
						title="Saving Money"
						text="Worthmore provides free items to first-gen low-income students and international students, as well as new and returning students, faculty, and staff."
						Icon={FaDollarSign}
					/>
					<HoverCard
						title="Promoting Sustainable Thinking"
						text="Worthmore creates a zero waste culture on campus and a resue mindset for students, encouraging students to apply 
						sustainable thinking  to other aspects of their lives."
						Icon={FaLeaf}
					/>
				</div>
			</div>
		</div>
	);
}
