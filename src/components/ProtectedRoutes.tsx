//https://www.robinwieruch.de/react-router-private-routes/

import { User } from "@supabase/supabase-js";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

type ProtectedRoutesProps = {
	user: User | null | undefined;
	children: any;
};
const ProtectedRoutes = ({ user, children }: ProtectedRoutesProps) => {
	if (typeof user === "undefined") {
		//TODO: Return loading page vs just a spinner
		return <Spinner />;
	} else if (!user) {
		return <Navigate to="/login" replace />;
	} else {
		return children;
	}
};

export default ProtectedRoutes;
