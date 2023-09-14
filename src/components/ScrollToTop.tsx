import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//https://v5.reactrouter.com/web/guides/scroll-restoration

/*
    Hook that scrolls to the top of the page whenever swtiching routes
*/
export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
