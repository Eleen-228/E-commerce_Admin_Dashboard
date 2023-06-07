import { Category } from '@/models/Categories'
import { connectMongo } from '@/lib/mongodb'

export default async function handler(req, res) {
	const { method } = req
	await connectMongo()
	if (method === 'POST') {
		const { categoryName, parentCategory, properties } = req.body
		res.json(await Category.create({ categoryName, parentCategory: parentCategory || null, properties }))
	}
	if (method === 'GET') {
		res.json(await Category.find().populate('parentCategory'))
	}
	if (method === 'DELETE') {
		const { id } = req.query
		const deletedCategory = await Category.findByIdAndDelete(id)
		res.json(deletedCategory)
	}
	if (method === 'PUT') {
		const { _id, updatedName, updatedParent, categoryName, parentCategory, properties } = req.body
		const updatedCategoryDoc = await Category.findByIdAndUpdate(
			_id,
			{ categoryName: updatedName || categoryName, parentCategory: updatedParent || parentCategory, properties: properties || null },
			{ new: true }
		)
		res.json(updatedCategoryDoc)
	}
}
