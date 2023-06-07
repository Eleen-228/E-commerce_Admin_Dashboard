import { useState } from 'react'
import Nav from '@/components/Nav'
export default function Layout({ children, googleSignIn, user, initializing }) {
	const [showNav, setShowNav] = useState(false)
	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn()
		} catch (error) {
			console.log('SignIn Error', error)
		}
	}

	// blocks render of main application whilst the connection is established
	if (initializing) return null
	if (!user) {
		return (
			<div className="bg-gradient-to-r from-violet-300 from-15% to-indigo-400 w-screen h-screen flex flex-col justify-center items-center space-y-10">
				<p className="text-4xl">
					Hello <span className="inline-block animate-wavingHand">👋</span>
				</p>
				<div className="p-3 rounded-md bg-purple-300 shadow-lg shadow-indigo-500/80 transition ease-in duration-200 hover:scale-110">
					<button type="button" onClick={handleGoogleSignIn}>
						Login with Google Email
					</button>
				</div>
			</div>
		)
	} else {
		return (
			<div className="bg-violet-700 flex flex-col min-h-screen min-w-screen md:flex-row">
				<button
					onClick={() => setShowNav(!showNav)}
					className="mt-6 ml-10 mr-6 shadow-md w-10 p-2 flex justify-center rounded-md bg-violet-200 border-violet-800 text-violet-700 md:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</button>
				<Nav showNav={showNav} setShowNav={setShowNav} />
				<div className="bg-slate-100 flex-grow mt-6 mr-6 mb-6 md:ml-0 ml-6 rounded-[20px] shadow-lg lg:p-7 p-3 overflow-auto">{children}</div>
			</div>
		)
	}
}
