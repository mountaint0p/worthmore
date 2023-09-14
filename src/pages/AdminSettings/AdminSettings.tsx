import AdminTable from "./AdminTable";
import BannerSettings from "./BannerSettings";
import CloseStore from "./CloseStore";

export default function AdminSettings() {
	return (
		<div className="flex-column justify-center space-y-10 px-16 py-12">
			<AdminTable />
			<BannerSettings />
			<CloseStore />
		</div>
	);
}
