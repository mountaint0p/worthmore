//https://www.robinwieruch.de/react-router-private-routes/

import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default ProtectedRoutes;
