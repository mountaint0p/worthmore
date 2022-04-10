import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCV_uEVcgTWL-7Y6P33VWMNILUxc9OrtZE",
	authDomain: "worthmore-7c997.firebaseapp.com",
	projectId: "worthmore-7c997",
	storageBucket: "worthmore-7c997.appspot.com",
	messagingSenderId: "128863208813",
	appId: "1:128863208813:web:85e81ea5ef47c1eb2f8664",
	measurementId: "G-MHWEE3NLYM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
