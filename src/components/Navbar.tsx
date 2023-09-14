import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext2";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";

export default function Navbar() {
	//navigation hook
	const navigate = useNavigate();

	//Authentication details
	const { user, logOut, googleSignIn, isAdmin } = UserAuth();

	//login and logout

	const handleLogin = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogOut = async () => {
		try {
			await logOut();
			navigate("/", { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	const LoginControl = ({ user }: { user: any | null }) => {
		if (user === null || user === undefined) {
			return (
				<DropdownMenuItem onClick={() => handleLogin()}>
					Sign In
				</DropdownMenuItem>
			);
		} else {
			return (
				<>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					{/* Links in navbar */}
					<Link to="/store">
						<DropdownMenuItem>Store</DropdownMenuItem>
					</Link>
					<Link to="/userorders">
						<DropdownMenuItem>Items on Hold</DropdownMenuItem>
					</Link>
					{isAdmin && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Admin Access</DropdownMenuLabel>
							<Link to="/itemupload">
								<DropdownMenuItem>Upload Item</DropdownMenuItem>
							</Link>
							<Link to="/admincontrol">
								<DropdownMenuItem>Admin Control</DropdownMenuItem>
							</Link>
							<Link to="/adminsettings">
								<DropdownMenuItem>Admin Settings</DropdownMenuItem>
							</Link>
						</>
					)}

					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => handleLogOut()}>
						Sign Out
					</DropdownMenuItem>
				</>
			);
		}
	};

	return (
		<>
			<div className="pos-4 fixed top-0 z-30 w-full border-b border-gray-300 bg-white px-4 ">
				<div className="flex h-16 items-center justify-between">
					<div className="flex flex-row items-center gap-x-5">
						<Link to="/">
							<img src="/img/logo.png" className="h-12" />
						</Link>
						<div className="invisible lg:visible ">
							<Link to="/store">
								<div className="font-semibold">Store</div>
							</Link>
						</div>
					</div>
					<div className="pr-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button>
									<FaBars size={18} />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<LoginControl user={user} />
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</>
	);
}
