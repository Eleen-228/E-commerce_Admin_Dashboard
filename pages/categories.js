import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import axios from 'axios'
import swal from 'sweetalert'
export default function Categories({ user, initializing, googleSignIn }) {
	const [categoryName, setCategoryName] = useState('')
	const [categories, setCategories] = useState([])
	const [parentCategory, setParentCategory] = useState()
	const [mode, setMode] = useState('disable')
	const [selected, setSelected] = useState(null)
	const [updatedName, setUpdatedName] = useState('')
	const [updatedParent, setUpdatedParent] = useState()
	const [properties, setProperties] = useState([])
	useEffect(() => {
		fetchCategories()
	}, [])
	const fetchCategories = () => {
		axios
			.get('/api/categories')
			.then(res => setCategories(res.data))
			.catch(error => console.log(error))
	}
	const createCategory = e => {
		e.preventDefault()
		axios
			.post('/api/categories', { categoryName, parentCategory, properties })
			.then(res => {
				console.log('New category has bee added: ', res.data)
				fetchCategories()
			})
			.catch(error => console.log(error))
		setCategoryName('')
		setParentCategory('')
		setProperties([])
	}
	const handleEditBtn = categoryToBeEdited => {
		const { _id, categoryName, parentCategory } = categoryToBeEdited
		const data = { updatedName, updatedParent, properties }
		if (mode === 'disable') {
			setSelected(_id)
			setMode('edit')
		}
		if (selected === _id) {
			axios
				.put('/api/categories', { ...data, categoryName, parentCategory, _id })
				.then(res => {
					setProperties([])
					setMode('disable')
					setSelected(null)
					fetchCategories()
					console.log('Edited Category', res.data)
				})
				.catch(error => console.log(error))
		}
	}
	const handleDeleteBtn = categoryToBeDeleted => {
		const { categoryName, _id } = categoryToBeDeleted
		swal({
			title: `Are you sure you want to delete Category Name: ${categoryName}?`,
			text: 'Once deleted, you will not be able to recover this category!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				axios
					.delete('/api/categories/?id=' + _id)
					.then(res => {
						console.log('Successfully deleted')
						fetchCategories()
					})
					.catch(error => console.log(error))
				swal(`Poof! Category Name ${categoryName} has been deleted!`, { icon: 'success' })
			} else {
				swal('No action has been taken.')
			}
		})
	}
	const disableEditBtn = () => {
		setMode('disable')
		setSelected(null)
		setProperties([])
	}
	const addProperty = () => {
		setProperties(prevProp => [...prevProp, { name: '', value: '' }])
	}
	const handlePropNameChge = (index, newName) => {
		setProperties(prevProp => {
			const properties = [...prevProp]
			properties[index].name = newName
			return properties
		})
	}
	const handlePropValueChge = (index, newValue) => {
		setProperties(prevProp => {
			const properties = [...prevProp]
			properties[index].value = newValue
			return properties
		})
	}
	const removeProp = (proToBeRemoved, name) => {
		const newProp = properties.filter((prop, idx) => idx !== proToBeRemoved)
		swal({
			title: `Are you sure you want to remove ${name || 'this empty row'}?`,
			text: 'Once deleted, you will not be able to recover this property!',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				setProperties(newProp)
				swal(`Poof! ${name || 'empty row'} has been deleted`)
			} else {
				swal('No action has been taken')
			}
		})
	}
	const editProp = category => {
		setProperties(category.properties)
	}

	if (initializing) return null
	return (
		<Layout user={user} googleSignIn={googleSignIn}>
			<h2>Categories</h2>
			{/* CATEGORY FORM */}
			<form className="mt-10 flex flex-col gap-y-5" onSubmit={createCategory}>
				<div className={mode === 'edit' ? 'hidden' : 'flex items-center gap-x-7 flex-col md:flex-row'}>
					<label htmlFor="">Create New Category:</label>
					<input type="text" className="categoryInput" placeholder="Category Name" value={categoryName} onChange={e => setCategoryName(e.target.value)} required />
					<select value={parentCategory} className="categoryInput py-2" onChange={e => setParentCategory(e.target.value)}>
						<option>No Parent Category</option>
						{categories.length > 0 &&
							categories.map(category => {
								const { _id, categoryName } = category
								return (
									<option key={_id} value={_id}>
										{categoryName}
									</option>
								)
							})}
					</select>
				</div>
				<div className="flex flex-col gap-y-7 items-center md:items-stretch">
					<div>
						{mode === 'edit' && <div className="mb-4 text-lg text-amber-600">Edit Property for Selected Category</div>}
						<button type="button" className={mode === 'edit' ? 'saveBtn editModeTheme flex p-2 gap-2 ' : 'saveBtn flex p-2 gap-2'} onClick={addProperty}>
							Add New Property
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
								<path
									fillRule="evenodd"
									d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div
						className={
							mode === 'edit'
								? 'border rounded-md px-3 py-1 bg-gradient-to-r from-amber-500 via-orange-300 to-rose-200'
								: 'border rounded-md px-3 py-1 bg-gradient-to-r via-indigo-400 from-violet-200 to-pink-200'
						}>
						{properties.length > 0 &&
							properties.map((prop, index) => {
								return (
									<div key={index} className="flex gap-3">
										<input
											type="text"
											placeholder="Property Name (ie: color)"
											className="productInput w-2/12"
											value={prop.name}
											onChange={e => handlePropNameChge(index, e.target.value)}
										/>
										<input
											type="text"
											placeholder="Value (separate with comma)"
											className="productInput w-6/12"
											value={prop.value}
											onChange={e => handlePropValueChge(index, e.target.value)}
										/>
										<button type="button" onClick={() => removeProp(index, prop.name)}>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</button>
									</div>
								)
							})}
					</div>
				</div>
				<div className={mode === 'edit' ? 'hidden' : 'flex justify-center'}>
					<button className="saveBtn flex gap-2 p-2">
						Add Category
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</form>
			{/* CATEGORY TABLE */}
			<div className="tableStyle">
				<table className="w-full">
					<thead>
						<tr className="tableDeco">
							<th colSpan="5"></th>
						</tr>
						<tr>
							<th>Mode</th>
							<th>Category Name</th>
							<th>Parent Category</th>
							<th>Properties</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map(category => {
								const { _id, categoryName, parentCategory, properties: existingProp } = category
								return (
									<tr key={_id}>
										<td>
											{selected === _id ? (
												<span className="w-4 h-4 left-[50%] translate-x-[-50%] relative flex">
													<span className="absolute inline-flex animate-ping h-full w-full rounded-full opacity-75 bg-amber-500 "></span>
													<span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
												</span>
											) : (
												<div className="w-4 h-4 mx-[50%] translate-x-[-50%] rounded-lg bg-slate-500"></div>
											)}
										</td>
										{/* CATEGORY NAME */}
										<td>
											<form className="flex justify-center gap-4">
												<input
													defaultValue={categoryName}
													disabled={selected !== _id}
													className={selected === _id ? 'editNameInput' : 'disabledInput'}
													onChange={e => setUpdatedName(e.target.value)}
												/>
												<button type="reset" className={selected !== _id ? 'hidden' : 'text-amber-500'}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</button>
											</form>
										</td>
										{/* PARENT CATEGORY */}
										<td>
											<form className="flex justify-center gap-4">
												<select
													disabled={selected !== _id}
													className={(selected === _id ? 'border-amber-500 outline-none ml-9' : 'border-slate-300') + ' categoryInput'}
													onChange={e => setUpdatedParent(e.target.value)}>
													{parentCategory?.categoryName && <option value="">{parentCategory?.categoryName}</option>}
													<option value="">No Parent Category</option>
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
												<button type="reset" className={selected !== _id ? 'hidden' : 'text-amber-500'}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</button>
											</form>
										</td>
										{/* PROPERTIES */}
										<td>
											{existingProp.length > 0 && selected !== _id ? (
												existingProp.map((property, index) => {
													const { name, value } = property
													return (
														<div key={index} className="flex justify-center md:flex-row flex-col">
															<label className="propName">{name}:</label>
															<div className="propValue">{value}</div>
														</div>
													)
												})
											) : (
												<div className={selected !== _id ? 'text-slate-500' : 'text-amber-500 animate-bounce'}>
													{selected !== _id ? 'Not Available' : 'Pending Update'}
												</div>
											)}
										</td>
										{/* ACTIONS */}
										<td>
											<button
												type="button"
												onClick={() => {
													handleEditBtn(category)
													editProp(category)
												}}
												className={selected === _id ? 'saveBtn mr-5' : 'editBtn'}>
												{selected !== _id ? 'Edit' : 'Save'}
											</button>
											<button
												type="button"
												onClick={() => {
													mode === 'disable' ? handleDeleteBtn(category) : disableEditBtn()
												}}
												className={selected === _id ? 'cancelBtn px-2 py-1 mt-3' : 'deleteBtn mt-3'}>
												{selected !== _id ? 'Delete' : 'Disable Edit'}
											</button>
										</td>
									</tr>
								)
							})}
					</tbody>
				</table>
			</div>
		</Layout>
	)
}
