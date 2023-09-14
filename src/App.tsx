import { ChakraProvider, Box } from "@chakra-ui/react";
import Store from "./pages/Store/Store";
import Landing from "./pages/Landing/Landing";
import ItemUpload from "./pages/Itemupload/ItemUpload";
import UserOrders from "./pages/UserOrders/UserOrders";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { UserAuth } from "./context/AuthContext2";
import AdminControl from "./pages/AdminControl/AdminControl";
import Login from "./pages/Login/Login";
import AdminSettings from "./pages/AdminSettings/AdminSettings";
import ScrollToTop from "./components/ScrollToTop";

function App() {
	const { user } = UserAuth();
	return (
		<BrowserRouter>
			<ScrollToTop />
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
					<Route path="/login" element={<Login />} />
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
					<Route
						path="adminsettings"
						element={
							<ProtectedRoutes user={user}>
								<AdminSettings />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;
