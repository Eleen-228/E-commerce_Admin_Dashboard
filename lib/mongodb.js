import mongoose from 'mongoose'
export async function connectMongo() {
	try {
		if (mongoose.connection.readyState === 1) {
			return await mongoose.connection.asPromise()
		} else {
			const uri = `${process.env.NEXT_PUBLIC_MONGODB_URI}`
			return await mongoose.connect(uri)
		}
	} catch (error) {
		console.log(error)
	}
}
