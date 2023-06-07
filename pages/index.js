import Layout from '@/components/Layout'
export default function Home({ googleSignOut, googleSignIn, user, initializing }) {
	const handleGoogleSignOut = async () => {
		try {
			await googleSignOut()
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Layout googleSignIn={googleSignIn} user={user} initializing={initializing}>
			<div className="flex flex-col items-center text-center">
				<h2 className="p-2 mb-5">
					Welcome <b>{user && user.displayName}</b>
				</h2>
				<div>
					<button onClick={handleGoogleSignOut} className="signOutBtn">
						Sign Out
					</button>
				</div>
			</div>
		</Layout>
	)
}
