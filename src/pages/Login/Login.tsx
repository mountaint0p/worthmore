import { Button } from "@/components/ui/Button";
import { UserAuth } from "../../context/AuthContext2";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GoogleButton() {
	//Authentication details
	const { googleSignIn } = UserAuth();
	const navigate = useNavigate();

	//login and logout

	const handleLogin = async () => {
		try {
			await googleSignIn();
			navigate("/", { replace: true });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Button
			variant={"secondary"}
			className="mt-5 gap-3"
			onClick={() => googleSignIn()}
		>
			<FcGoogle />
			Sign in with your Swarthmore Gmail
		</Button>
	);
}

function Login() {
	return (
		// <Flex justify="center" align="center" direction="column" mt="100px">
		// 	<Heading>Sign In</Heading>
		// 	<GoogleButton />
		// </Flex>
		<div className="mt-20 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Sign In</h1>
			<GoogleButton />
		</div>
	);
}

export default Login;
