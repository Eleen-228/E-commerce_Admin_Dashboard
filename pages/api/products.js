import { connectMongo } from '@/lib/mongodb'
//import Category to prevent this error: Schema hasn't been registered for model "Category"
import { Category } from '@/models/Categories'
import { Product } from '@/models/Products'
export default async function handler(req, res) {
	const { method } = req
	await connectMongo()
	//Fetch a particular product by id for EditProductPage or fetch all products for Products page
	if (method === 'GET') {
		if (req.query?.id) {
			res.json(await Product.findById(req.query.id))
		} else {
			res.json(await Product.find().populate('category'))
		}
	}
	//Create products
	if (method === 'POST') {
		const { title, desc, price, images, category, productProps } = req.body
		const productDoc = await Product.create({ title, desc, price, category: category || null, properties: productProps })
		res.json(productDoc)
	}
	//Update/Edit products
	if (method === 'PUT') {
		const { title, desc, price, _id, images, category, productProps } = req.body
		if (_id) {
			const updatedProductDoc = await Product.findByIdAndUpdate(_id, { title, desc, price, images, category: category || null, properties: productProps }, { new: true })
			res.json(updatedProductDoc)
		}
	}
	//Delete products
	if (method === 'DELETE') {
		if (req.query?.id) {
			const deletedProduct = await Product.findByIdAndDelete(req.query.id)
			res.json(deletedProduct)
		}
	}
}
