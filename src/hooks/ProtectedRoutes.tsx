//https://www.robinwieruch.de/react-router-private-routes/

import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";
import { Flex, Heading, Spinner } from "@chakra-ui/react";

type ProtectedRoutesProps = {
	user: User | null | undefined;
	children: any;
};
const ProtectedRoutes = ({ user, children }: ProtectedRoutesProps) => {
	if (typeof user === "undefined") {
		//TODO: Return loading page vs just a spinner
		return (
			<Flex direction="row" justifyContent="center" mt="10rem">
				<Heading mr="20px">Loading</Heading>
				<Spinner size="lg" color="green.300" />
			</Flex>
		);
	} else if (!user) {
		return <Navigate to="/login" replace />;
	} else {
		return children;
	}
};

export default ProtectedRoutes;
