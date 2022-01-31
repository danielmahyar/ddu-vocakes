import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCIfvv1cLywLBy6oa9ZzT2wsPNe0NG8N8s",
	authDomain: "ddu-vocakes-2.firebaseapp.com",
	projectId: "ddu-vocakes-2",
	storageBucket: "ddu-vocakes-2.appspot.com",
	messagingSenderId: "581736362356",
	appId: "1:581736362356:web:8d715f9e86857d9071fc21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage }