//Tutorial: https://youtu.be/cZAnibwI9u8
import { useState, useEffect, useContext, createContext } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	getAdditionalUserInfo,
} from "firebase/auth";
import { auth, database } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

const logOut = () => {
	signOut(auth);
};

async function createNewUser(userCredential) {
	const additionalUserInfo = getAdditionalUserInfo(userCredential);
	if (additionalUserInfo.isNewUser) {
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

export const AuthContextProvider = ({ children }) => {
	let [user, setUser] = useState({});
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
