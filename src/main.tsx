import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider2 } from "./context/AuthContext2";
import "@fontsource/inter";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<AuthContextProvider2>
				<App />
			</AuthContextProvider2>
		</ChakraProvider>
	</>
);
