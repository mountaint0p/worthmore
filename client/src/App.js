import { ChakraProvider, Box } from "@chakra-ui/react";
import Store from "./pages/Store/Store";
import Landing from "./pages/Landing/Landing";
import ItemUpload from "./pages/Itemupload/ItemUpload";
import React from "react";
import Navbar from "./Navbar";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
function App() {
	//User track HERE
	let [user, setUser] = React.useState(null);
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Navbar user={user} setUser={setUser} />
				<Box mt="60px">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/store" element={<Store />} />
						<Route path="/itemupload" element={<ItemUpload />} />
					</Routes>
				</Box>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
