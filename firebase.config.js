// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
require('dotenv').config()

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: `${process.env.local.FIREBASE_API_KEY}`,
	authDomain: `${process.env.local.FIREBASE_AUTH_DOMAIN}`,
	projectId: `${process.env.local.FIREBASE_PROJECT_ID}`,
	storageBucket: `${process.env.local.FIREBASE_STORAGEBUCKET}`,
	messagingSenderId: `${process.env.local.FIREBASE_MESSAGINGSENDERID}`,
	appId: `${process.env.local.FIREBASE_APP_ID}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
