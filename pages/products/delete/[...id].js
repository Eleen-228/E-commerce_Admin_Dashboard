import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function DeleteProductPage({ user, initializing, googleSignIn }) {
	const router = useRouter()
	const { id } = router.query
	const [title, setTitle] = useState('')
	useEffect(() => {
		if (!id) return
		axios
			.get('/api/products?id=' + id)
			.then(res => setTitle(res.data.title))
			.catch(error => console.log(error))
	}, [id])
	const handleCancel = () => {
		router.push('/products')
	}
	const handleDelete = () => {
		axios
			.delete('/api/products?id=' + id)
			.then(res => console.log('This product has been deleted from database', res.data))
			.catch(error => console.log(error))
		router.push('/products')
	}
	if (initializing) return null
	return (
		<Layout user={user} googleSignIn={googleSignIn}>
			<div className="text-center mt-10">
				Are you sure you want to delete <b className="text-purple-600 uppercase">{title}</b> from the product list?
			</div>
			<div className="flex py-10 justify-center">
				<button className="deleteBtn" onClick={handleDelete}>
					Yes, Please Delete
				</button>
				<button className="cancelBtn" onClick={handleCancel}>
					Cancel
				</button>
			</div>
		</Layout>
	)
}
