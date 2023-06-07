import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'
import axios from 'axios'
export default function EditProductPage({ user, initializing, googleSignIn }) {
	const router = useRouter()
	const [productInfo, setProductInfo] = useState(null)
	const { id } = router.query
	useEffect(() => {
		if (!id) return
		axios
			.get('/api/products?id=' + id)
			.then(res => setProductInfo(res.data))
			.catch(error => console.log(error))
	}, [id])
	if (initializing) return null
	return (
		<Layout user={user} googleSignIn={googleSignIn}>
			<h2>Edit Product</h2>
			{productInfo && <ProductForm {...productInfo} />}
		</Layout>
	)
}
