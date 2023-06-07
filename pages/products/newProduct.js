import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'
export default function NewProduct({ user, initializing }) {
	if (initializing) return null
	return (
		<Layout user={user}>
			<h2>New Product</h2>
			<ProductForm />
		</Layout>
	)
}
