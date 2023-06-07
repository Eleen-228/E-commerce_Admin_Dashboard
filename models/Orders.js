import { model, models, Schema } from 'mongoose'

const OrdersSchema = new Schema(
	{
		lineItems: Object,
		fullName: String,
		email: String,
		city: String,
		postalCode: String,
		streetAddress: String,
		state: String,
		paid: Boolean,
		fullNameOnCard: String,
		creditCardNum: String,
		expiration: String,
		cvv: String,
	},
	{
		timestamps: true,
	}
)

export const Orders = models?.Orders || model('Orders', OrdersSchema)
