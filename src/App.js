import { ChakraProvider, Box } from "@chakra-ui/react";
import Store from "./pages/Store/Store";
import Landing from "./pages/Landing/Landing";
import ItemUpload from "./pages/Itemupload/ItemUpload";
import React from "react";
import Navbar from "./hooks/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<AuthContextProvider>
					<Navbar />
					<Box mt="60px">
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="/store" element={<Store />} />
							<Route path="/itemupload" element={<ItemUpload />} />
						</Routes>
					</Box>
				</AuthContextProvider>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
