import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import { supaClient } from "../supaClient";

// create a context for authentication
const AuthContext = createContext<{
	session: Session | null | undefined;
	user: User | null | undefined;
	logOut: () => void;
	googleSignIn: () => void;
	isAdmin: boolean;
}>({
	session: null,
	user: null,
	logOut: () => {},
	googleSignIn: () => {},
	isAdmin: true,
});

export const AuthContextProvider2 = ({ children }: any) => {
	const [user, setUser] = useState<User>();
	const [session, setSession] = useState<Session | null>();
	const [isAdmin, setIsAdmin] = useState(false);

	async function googleSignIn() {
		const { data, error } = await supaClient.auth.signInWithOAuth({
			provider: "google",
			options: {
				queryParams: {
					access_type: "offline",
					prompt: "consent",
					hd: "swarthmore.edu",
				},
			},
			
		});
	}

	useEffect(() => {
		const setData = async () => {
			const {
				data: { session },
				error,
			} = await supaClient.auth.getSession();
			if (error) throw error;
			setSession(session);
			setUser(session?.user);
			checkAdmin(session);
		};

		const checkAdmin = async (session: Session | null) => {
			if (session) {
				const { data, error } = await supaClient
					.from("users")
					.select("is_admin")
					.eq("id", session.user.id)
					.single();
				if (error) {
					console.log(error);
				}
				if (data) {
					setIsAdmin(data.is_admin);
				}
			} else {
				setIsAdmin(false);
			}
		};

		const { data: listener } = supaClient.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session);
				setUser(session?.user);
				checkAdmin(session);
			}
		);

		setData();

		return () => {
			listener?.subscription.unsubscribe();
		};
	}, []);

	const value = {
		session,
		user,
		logOut: () => supaClient.auth.signOut(),
		googleSignIn,
		isAdmin,
	};

	// use a provider to pass down the value
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export the useAuth hook
export const UserAuth = () => {
	return useContext(AuthContext);
};
