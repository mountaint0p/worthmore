//Tutorial: https://youtu.be/cZAnibwI9u8
import { useState, useEffect, useContext, createContext } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	getAdditionalUserInfo,
	UserCredential,
} from "firebase/auth";
import { auth, database } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";

type ContextProps = {
	googleSignIn: Function | null;
	logOut: Function | null;
	user: User | null | undefined;
};
const AuthContext = createContext<ContextProps>({
	googleSignIn: null,
	logOut: null,
	user: null,
});

const logOut = () => {
	signOut(auth);
};

async function createNewUser(userCredential: UserCredential) {
	const additionalUserInfo = getAdditionalUserInfo(userCredential);
	if (additionalUserInfo!.isNewUser) {
		setDoc(
			doc(database, "users", userCredential.user.uid),
			{
				holds: 0,
				name: userCredential.user.displayName,
				email: userCredential.user.email,
			},
			{ merge: true }
		);
	}
}

export const AuthContextProvider = ({ children }: any) => {
	let [user, setUser] = useState<User | null>();
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			hd: "swarthmore.edu",
		});
		signInWithPopup(auth, provider).then((userCredential) =>
			createNewUser(userCredential)
		);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
