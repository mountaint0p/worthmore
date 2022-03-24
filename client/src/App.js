import { ChakraProvider, Box } from "@chakra-ui/react";
import Store from "./pages/Store/Store";
import Landing from "./pages/Landing/Landing";
import React from "react";
import Navbar from "./Navbar";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";

function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Navbar />
				<Box mt="60px">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/store" element={<Store />} />
					</Routes>
				</Box>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
