import Layout from '@/components/Layout'
export default function Settings({ user, initializing, googleSignIn }) {
	if (initializing) return null
	return (
		<Layout user={user} googleSignIn={googleSignIn}>
			Settings
		</Layout>
	)
}
