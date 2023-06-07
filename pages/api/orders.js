import { connectMongo } from '@/lib/mongodb'
import { Orders } from '@/models/Orders'
export default async function handler(req, res) {
	const method = req.method
	await connectMongo()
	if (method === 'GET') {
		const orders = await Orders.find().sort({ createdAt: -1 })
		res.json(orders)
	}
	if (method === 'DELETE') {
		const { id } = req.query
		const removeOrder = await Orders.findByIdAndDelete(id)
		res.json('order has been successfully deleted')
	}
}
