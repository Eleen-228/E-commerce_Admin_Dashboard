// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: `${process.env.FIREBASE_API_KEY}`,
	authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
	projectId: `${process.env.FIREBASE_PROJECT_ID}`,
	storageBucket: `${process.env.FIREBASE_STORAGEBUCKET}`,
	messagingSenderId: `${process.env.IREBASE_MESSAGINGSENDERID}`,
	appId: `${process.env.FIREBASE_APP_ID}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
