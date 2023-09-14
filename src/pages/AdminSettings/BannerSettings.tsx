import { Switch } from "@/components/ui/Switch";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supaClient } from "../../supaClient";

export default function BannerSettings() {
	const [hasBanner, setHasBanner] = useState(false);
	const [text, setText] = useState("");
	const navigate = useNavigate();

	const updateBanner = async (e: FormEvent) => {
		e.preventDefault();
		if (hasBanner) {
			const { data, error } = await supaClient
				.from("banner")
				.update({ banner_exist: true, text: text })
				.eq("id", 1)
				.select();
			if (error) {
				console.log(error);
			}
			if (data) {
				navigate("/");
			}
		} else {
			const { data, error } = await supaClient
				.from("banner")
				.update({ banner_exist: false, text: "" })
				.eq("id", 1)
				.select();
			if (error) {
				console.log(error);
			}
			if (data) {
				navigate("/");
			}
		}
	};

	useEffect(() => {
		const fetchBannerSettings = async () => {
			const { data, error } = await supaClient.from("banner").select("*");
			if (error || (data && data.length != 1)) {
				console.log(error);
			}
			if (data) {
				setHasBanner(data[0].banner_exist);
				setText(data[0].text);
			}
		};

		fetchBannerSettings();
	}, []);
	return (
		<div>
			<h2 className="text-4xl font-bold">Banner Settings</h2>
			<form onSubmit={(e) => updateBanner(e)} className="flex w-4/12 flex-col">
				<Label htmlFor="banner-switch">Turn Banner On/Off</Label>
				<Switch
					id="banner-switch"
					onCheckedChange={() => {
						setHasBanner(!hasBanner);
						setText("");
					}}
					checked={hasBanner}
				/>
				<Label htmlFor="banner-message">Add Banner Message</Label>
				<Input
					id="banner-message"
					type="text"
					onChange={(e) => setText(e.target.value)}
					value={text}
					disabled={!hasBanner}
					className="w-"
					placeholder="Add an important message here!"
				/>
				<Button type="submit" className="w-6/12">
					Update Banner
				</Button>
			</form>
		</div>
	);
}
