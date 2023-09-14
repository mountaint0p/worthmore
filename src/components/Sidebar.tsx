type SidebarProps = {
	children: any;
	SidebarItems: any;
};

export default function Sidebar({ children, SidebarItems }: SidebarProps) {
	return (
		<div className="h-screen pb-12">
			<div className="static h-auto w-full border-r-2 bg-white pb-20 pt-10 md:fixed md:h-full md:w-80">
				<SidebarItems />
			</div>
			<div className="ml-0 flex h-screen flex-col items-center bg-slate-100 p-4 md:ml-80">
				{children}
			</div>
		</div>
	);
}
