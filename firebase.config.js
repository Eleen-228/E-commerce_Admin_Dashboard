// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: `${process.env.FIREBASE_API_KEY}`,
	authDomain: `${process.env.AUTH_DOMAIN}`,
	projectId: `${process.env.PROJECTID}`,
	storageBucket: `${process.env.STORAGEBUCKET}`,
	messagingSenderId: `${process.env.MESSAGINGSENDERID}`,
	appId: `${process.env.APPID}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
