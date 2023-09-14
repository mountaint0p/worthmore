import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { FormEvent, useEffect, useState } from "react";
import { supaClient } from "../../supaClient";

export default function BannerSettings() {
	const [closed, setClosed] = useState(false);
	useEffect(() => {
		const fetchStatus = async () => {
			const { data, error } = await supaClient.from("store_status").select("*");
			if (error || (data && data.length != 1)) {
				console.log(error);
			} else if (data) {
				setClosed(data[0].is_closed);
			}
		};
		fetchStatus();
	}, []);

	const updateStatus = async (e: FormEvent) => {
		e.preventDefault();
		const { data, error } = await supaClient
			.from("store_status")
			.update({ is_closed: closed })
			.eq("id", 1)
			.select();
		if (error) {
			console.log(error);
		}
		if (data) {
			//TODO: Send message
			alert("Updated Store");
		}
	};

	return (
		<div>
			<h2 className="text-4xl font-bold">Store Status</h2>
			<form onSubmit={(e) => updateStatus(e)} className="flex w-4/12 flex-col">
				<Label>Close Store</Label>
				<Switch onCheckedChange={() => setClosed(!closed)} checked={closed} />
				<Button type="submit" className="w-6/12">
					Update Store Status
				</Button>
			</form>
		</div>
	);
}
