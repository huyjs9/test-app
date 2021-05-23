import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBFyR3VvKraf0iJI7o3Ui6bCl-dN7UZ9cg",
	authDomain: "monitor-app-7a3ac.firebaseapp.com",
	projectId: "monitor-app-7a3ac",
	storageBucket: "monitor-app-7a3ac.appspot.com",
	messagingSenderId: "516900444962",
	appId: "1:516900444962:web:5cb7ff64a9fe867e53a37b",
	measurementId: "G-529WG4G35C",
};

// export default function Firebase (props) {
//     firebase.initializeApp(firebaseConfig);

//     const login = (email, password) => {
//         firebase
//             .auth()
//             .signInWithEmailAndPassword(email, password)
//             .then(res => {
//                 return res && props.login();
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     };

//     const logout = () => {
//         firebase
//             .auth()
//             .signOut()

//     };

//     const register = async (email, password) => {
//         firebase
//             .auth()
//             .createUserWithEmailAndPassword(email, password)
//             .then(res => {
//                return res && props.register();
//             })
//             .catch(error => {
//                 console.log(error);
//             });

//     };

// }
class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.db = app.firestore();
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut();
	}

	async register(email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password);
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName;
	}

	isInitialized() {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(resolve);
		});
	}
}

export default new Firebase();
