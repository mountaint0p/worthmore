import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

type LightModeButtonProps = {
	[x: string]: any;
};
function LightModeButton({ ...rest }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const [colorIcon, setColorIcon] = React.useState(<FaSun />);
	React.useEffect(() => {
		if (colorMode === "light") setColorIcon(<FaMoon />);
		else setColorIcon(<FaSun />);
	}, [colorMode]);
	return (
		<>
			<IconButton
				icon={colorIcon}
				aria-label="light-mode"
				isRound={true}
				size="md"
				onClick={toggleColorMode}
				variant="ghost"
				{...rest}
			/>
		</>
	);
}

export default LightModeButton;
