import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
export default function ProductForm({
	title: existedTitle,
	desc: existedDesc,
	price: existedPrice,
	_id,
	images: existedImages,
	category: assignedCategory,
	properties: assignedProps,
}) {
	const [title, setTitle] = useState(existedTitle || '')
	const [desc, setDesc] = useState(existedDesc || '')
	const [price, setPrice] = useState(existedPrice || '')
	const [images, setImages] = useState(existedImages || '')
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState(assignedCategory || '')
	const [productProps, setProductProps] = useState(assignedProps || {})
	const router = useRouter()
	const saveProduct = e => {
		const data = { title, desc, price, images, category, productProps }
		e.preventDefault()
		if (_id) {
			//update
			axios
				.put('/api/products?id=' + _id, { ...data, _id })
				.then(res => {
					console.log('Updated Data', res.data)
					router.push('/products')
				})
				.catch(error => console.log(error))
		} else {
			//create
			axios
				.post('/api/products', data)
				.then(res => {
					console.log(res.data)
					router.push('/products')
				})
				.catch(error => {
					console.log(error)
				})
		}
		setTitle('')
		setDesc('')
		setPrice('')
	}
	useEffect(() => {
		axios
			.get('/api/categories')
			.then(res => setCategories(res.data))
			.catch(error => console.log(error.message))
	}, [])
	const handleCancel = () => {
		router.push('/products')
	}
	const propSelections = []
	if (categories.length > 0 && category) {
		let matchedCategory = categories.find(({ _id }) => _id === category)
		matchedCategory && propSelections.push(...matchedCategory.properties)
		while (matchedCategory?.parentCategory?._id) {
			const parentCate = categories.find(({ _id }) => _id === matchedCategory?.parentCategory?._id)
			parentCate && propSelections.push(...parentCate.properties)
			matchedCategory = parentCate
		}
	}
	const handleProdProp = (propName, propValue) => {
		setProductProps(prev => {
			const newProdProps = { ...prev }
			newProdProps[propName] = propValue
			return newProdProps
		})
	}
	return (
		<form className="mt-10 flex flex-col" onSubmit={saveProduct}>
			<label htmlFor="">Product Name: </label>
			<input type="text" placeholder="Product Name" className="productInput" value={title} onChange={e => setTitle(e.target.value)} required />
			<label htmlFor="">Product Image(s):</label>
			<div className="flex p-10 pl-0 gap-5">
				{!images.length > 0 && <div className="border-dotted border-2 h-32 w-32 text-center rounded-md text-slate-400 p-2">No Image(s) Provided</div>}
				<label className="flex flex-col items-center justify-center h-32 w-15 text-center rounded-lg bg-slate-200 border-slate-400 border-dashed border-2 p-2 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
					<input type="file" className="hidden" />
				</label>
			</div>
			<label htmlFor="">Category:</label>
			<div>
				<select
					className="categoryInput"
					value={category}
					onChange={e => {
						setCategory(e.target.value)
						setProductProps({})
					}}>
					<option value="">Not Categorized</option>
					{categories.length > 0 &&
						categories.map(category => {
							const { _id, categoryName } = category
							return (
								<option value={_id} key={_id}>
									{categoryName}
								</option>
							)
						})}
				</select>
				{propSelections.length > 0 ? (
					propSelections?.map(prop => {
						const propArr = prop.value.split(',')
						return (
							<div key={prop.name} className="h-20 w-fit pt-4 ">
								<label className="mr-3 inline-block w-20">{prop.name[0].toUpperCase() + prop.name.substring(1)}:</label>
								<select className="rounded-md px-2 py-1 border" value={productProps[prop.name]} onChange={e => handleProdProp(prop.name, e.target.value)}>
									<option value="">Please Select One</option>
									{propArr.map(v => {
										return (
											<option value={v} key={v}>
												{v}
											</option>
										)
									})}
								</select>
							</div>
						)
					})
				) : (
					<div className="h-24 w-fit py-4 my-4 flex gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
							/>
						</svg>
						Oops! No Property Selection Available for this Category
					</div>
				)}
			</div>
			<label htmlFor="">Description:</label>
			<textarea placeholder="Description" className="productInput" value={desc} onChange={e => setDesc(e.target.value)} />
			<label htmlFor="">Price (USD):</label>
			<input type="number" min="0" placeholder="price" className="productInput" value={price} onChange={e => setPrice(e.target.value)} required />
			<div className="flex justify-center gap-16 mt-10">
				<button className="cancelBtn" type="button" onClick={handleCancel}>
					Cancel
				</button>
				<button className="saveBtn p-2" type="submit">
					Save
				</button>
			</div>
		</form>
	)
}
