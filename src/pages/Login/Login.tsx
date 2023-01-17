import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text, Heading, Flex } from "@chakra-ui/react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function GoogleButton() {
	//Authentication details
	const { user, logOut, googleSignIn } = UserAuth();
	const navigate = useNavigate();

	//login and logout

	const handleLogin = async () => {
		try {
			await googleSignIn!();
			navigate("/", { replace: true });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Center p={8}>
			<Button
				w={"full"}
				maxW={"md"}
				variant={"outline"}
				leftIcon={<FcGoogle />}
				onClick={() => handleLogin()}
			>
				<Center>
					<Text>Sign in with your Swarthmore Gmail</Text>
				</Center>
			</Button>
		</Center>
	);
}

function Login() {
	return (
		<>
			<Flex justify="center" align="center" direction="column" mt="100px">
				<Heading>Sign In</Heading>
				<GoogleButton />
			</Flex>
		</>
	);
}

export default Login;
