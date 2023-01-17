//https://www.robinwieruch.de/react-router-private-routes/

import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";
import { Spinner } from "@chakra-ui/react";

type ProtectedRoutesProps = {
	user: User;
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
