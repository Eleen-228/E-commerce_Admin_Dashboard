import { useState, useEffect } from 'react'
import '@/styles/globals.css'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
const provider = new GoogleAuthProvider()
const googleSignIn = () => signInWithPopup(auth, provider)
const googleSignOut = () => signOut(auth)

export default function App({ Component, pageProps }) {
	const [initializing, setInitializing] = useState(true)
	const [user, setUser] = useState(null)
	function onAuthStateChanged(user) {
		setUser(user)
		if (initializing) setInitializing(false)
	}
	useEffect(() => {
		//auth.onAuthStateChanged returns an un-subscriber function
		const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
		return subscriber
	}, [])
	return <Component {...pageProps} googleSignIn={googleSignIn} googleSignOut={googleSignOut} user={user} initializing={initializing} />
}
