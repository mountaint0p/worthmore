import { useEffect, useState } from "react";
import { supaClient } from "../../supaClient";
import { AlertCircle } from "lucide-react";

export default function Banner() {
	const [message, setMessage] = useState<string | null>("");
	const [hasBanner, setHasBanner] = useState(false);

	useEffect(() => {
		const fetchBanner = async () => {
			const { data, error } = await supaClient
				.from("banner")
				.select("*")
				.single();
			if (error) {
				console.log(error);
			}

			if (data) {
				if (data.banner_exist) {
					setMessage(data.text);
					setHasBanner(true);
				} else {
					setMessage("");
					setHasBanner(false);
				}
			}
		};
		fetchBanner();
	}, []);

	if (hasBanner)
		return (
			<div className="flex w-full items-center justify-center gap-2 bg-green-600 py-5 text-white">
				<AlertCircle />
				<p className="text-center text-lg font-semibold">{message}</p>
			</div>
		);
	return <></>;
}
