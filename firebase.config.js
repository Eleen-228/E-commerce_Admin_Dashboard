// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
	authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
	projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
	storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET}`,
	messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID}`,
	appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
}
console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
