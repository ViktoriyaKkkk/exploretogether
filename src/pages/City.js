import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Layout from '../components/Layout'
import UpdateModal from '../components/UpdateModal'
import DeleteModal from '../components/DeleteModal'
import CreateModal from '../components/CreateModal'
import Sidebar from '../components/Sidebar'
import { useCities } from '../utils/useCities'
import { createCities, deleteCities, updateCities } from '../api/api.city'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IconContext } from 'react-icons'
import { Pagination } from '../components/Pagination'


const City = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(() => {
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate('/')
		}
	})

	const { AdminInstance } = useAppContext()

	const [cities, error, load] = useCities()
	const citiesById = useMemo(() => {
		return cities?.reduce((prev, curr) => {
			return { ...prev, [curr._id]: [curr.name] }
		}, {})
	}, [cities])

	const PageSize = 10;
	const lastPage = useMemo(()=>Math.ceil(cities.length / PageSize), [cities, PageSize]);

	const [currentPage, setCurrentPage] = useState(1);

	const currentCities = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize; //индекс первого элемента на странице
		const lastPageIndex = firstPageIndex + PageSize; //индекс последнего элемента(не выводится)
		return cities?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, cities]);

	return (
		<Layout>
			{
				AdminInstance._isEditing !== '' &&
				<UpdateModal document={'Cities'} records={citiesById} load={load} updateFunc={updateCities} />
			}
			{
				AdminInstance._isDeleting !== '' && <DeleteModal document={'Cities'} load={load} deleteFunc={deleteCities} />
			}
			{
				AdminInstance._isCreating && <CreateModal document={'Cities'} load={load} createFunc={createCities} />
			}
			<Sidebar />
			<div className='pt-14 ml-48'>
				<button onClick={() => {
					AdminInstance.setIsModal(false)
					AdminInstance.setIsCreating(true)
				}}
								className='my-3 p-4 disabled:cursor-not-allowed leading-5 text-white transition-colors duration-200 transform bg-dark-green rounded-md
							hover:bg-light-green focus:outline-none'
								data-modal-target='staticModal' data-modal-toggle='staticModal'>Добавить запись
				</button>
				<div className='relative mt-3 mr-5 overflow-x-auto shadow-md sm:rounded-lg'>

					<table className='w-full text-sm text-left text-white'>
						<thead className='text-xs text-white uppercase bg-black bg-opacity-90'>
						<tr>
							<th scope='col' className='px-6 py-1.5'>
								City id
							</th>
							<th scope='col' className='px-3 py-1.5'>
								City name
							</th>
							<th scope='col' className='px-3 py-1.5'>
								Action
							</th>
						</tr>
						</thead>
						<tbody>
						{
							currentCities.map((item) => {
								return <tr key={item._id} className='border-b border-gray bg-black'>
									<th scope='row' className='px-6 py-1 font-medium text-white whitespace-nowrap'>
										{item._id}
									</th>
									<td className='px-3 py-1'>
										{item.name}
									</td>
									<td className='pr-3 py-1 text-light-gray'>
										<IconContext.Provider value={{ size: '1.5em' }}>
											<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
												AdminInstance.setIsModal(false)
												AdminInstance.setIsEditing(item._id)
											}}><BiEdit />
											</button>
											<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
												AdminInstance.setIsModal(false)
												AdminInstance.setIsDeleting(item._id)
											}}><RiDeleteBin5Line />
											</button>
										</IconContext.Provider>
									</td>
								</tr>
							})
						}
						</tbody>
					</table>
				</div>
				<Pagination currentPage={currentPage} lastPage={lastPage} pageSize={PageSize} totalCount={cities.length} onPageChange={page => setCurrentPage(page)}/>
			</div>
		</Layout>

	)
})

export default City