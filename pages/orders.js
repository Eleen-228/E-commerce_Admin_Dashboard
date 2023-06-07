import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import axios from 'axios'
import swal from 'sweetalert'
export default function Orders({ user, initializing, googleSignIn }) {
	const [orders, setOrders] = useState()
	const fetchOrders = () => {
		axios
			.get('/api/orders')
			.then(res => setOrders(res.data))
			.catch(error => console.log(error))
	}
	useEffect(() => {
		fetchOrders()
	}, [])
	const deleteOrder = orderID => {
		swal({
			title: `Are you sure you want to delete Order#: ${orderID}?`,
			text: 'Once deleted, you will not be able to recover this order!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				axios
					.delete('/api/orders/?id=' + orderID)
					.then(res => {
						console.log(res.data)
						fetchOrders()
					})
					.catch(error => console.log(error.message))
				swal(`Poof! Order ${orderID} has been deleted!`, { icon: 'success' })
			} else {
				swal('No action has been taken.')
			}
		})
	}
	if (initializing) return null
	return (
		<Layout user={user} googleSignIn={googleSignIn}>
			<h2>Orders</h2>
			<div className="tableStyle">
				<table className="w-full">
					<thead>
						<tr className="tableDeco">
							<th colSpan="5"></th>
						</tr>
						<tr>
							<th>Order ID</th>
							<th>Paid</th>
							<th>Recipient Information</th>
							<th>Products</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{orders?.length > 0 &&
							orders.map(order => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.paid ? 'YES' : 'NO'}</td>
									{/*  */}
									<td>
										{order.email}
										{order.name}
										<br />
										{order.city} {order.postalCode} {order.country}
										<br />
										{order.streetAddress}
									</td>
									{/* PRODUCTS */}
									<td>
										{order.lineItems.map(item => (
											<div key={item.prod_name}>
												{item.prod_name} X {item.prod_counts} count(s)
											</div>
										))}
									</td>
									{/* ACTIONS */}
									<td>
										<button
											type="button"
											onClick={() => {
												deleteOrder(order._id)
											}}
											className="deleteBtn">
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</Layout>
	)
}
