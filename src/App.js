import { ChakraProvider, Box } from "@chakra-ui/react";
import Store from "./pages/Store/Store";
import Landing from "./pages/Landing/Landing";
import ItemUpload from "./pages/Itemupload/ItemUpload";
import UserOrders from "./pages/UserOrders/UserOrders";
import React from "react";
import Navbar from "./hooks/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import { UserAuth } from "./context/AuthContext";
import AdminControl from "./pages/AdminControl/AdminControl";

function App() {
	const { user } = UserAuth();
	return (
		<BrowserRouter>
			<Navbar />
			<Box mt="60px">
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/store" element={<Store />} />
					<Route
						path="/itemupload"
						element={
							<ProtectedRoutes user={user}>
								<ItemUpload />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/userorders"
						element={
							<ProtectedRoutes user={user}>
								<UserOrders />
							</ProtectedRoutes>
						}
					/>
					<Route
						path="/admincontrol"
						element={
							<ProtectedRoutes user={user}>
								<AdminControl />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;
