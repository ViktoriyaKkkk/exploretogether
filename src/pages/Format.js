import React, { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useAges } from '../utils/useAges'

import Layout from '../components/Layout'
import UpdateModal from '../components/UpdateModal'
import { createAges, deleteAges, updateAges } from '../api/api.age'
import DeleteModal from '../components/DeleteModal'
import CreateModal from '../components/CreateModal'
import Sidebar from '../components/Sidebar'
import { createFormats, deleteFormats, updateFormats } from '../api/api.format'
import { useFormats } from '../utils/useFormat'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IconContext } from 'react-icons'


const Format = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(() => {
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate('/')
		}
	})

	const { AdminInstance } = useAppContext()

	const [formats, error, load] = useFormats()
	const formatsById = useMemo(() => {
		return formats?.reduce((prev, curr) => {
			return { ...prev, [curr._id]: [curr.name] }
		}, {})
	}, [formats])

	return (
		<Layout>
			{
				AdminInstance._isEditing !== '' &&
				<UpdateModal document={'Formats'} records={formatsById} load={load} updateFunc={updateFormats} />
			}
			{
				AdminInstance._isDeleting !== '' && <DeleteModal document={'Formats'} load={load} deleteFunc={deleteFormats} />
			}
			{
				AdminInstance._isCreating && <CreateModal document={'Formats'} load={load} createFunc={createFormats} />
			}
			<Sidebar />
			<div className='pt-14'>
				<button onClick={() => {
					AdminInstance.setIsModal(false)
					AdminInstance.setIsCreating(true)
				}}
								className='my-3 ml-48 p-4 disabled:cursor-not-allowed leading-5 text-white transition-colors duration-200 transform bg-dark-green rounded-md
							hover:bg-light-green focus:outline-none'
								data-modal-target='staticModal' data-modal-toggle='staticModal'>Добавить запись
				</button>
				<div className='relative mt-3 mr-5 ml-48 overflow-x-auto shadow-md sm:rounded-lg'>

					<table className='w-full text-sm text-left text-white'>
						<thead className='text-xs text-white uppercase bg-black bg-opacity-90'>
						<tr>
							<th scope='col' className='px-6 py-2'>
								Format id
							</th>
							<th scope='col' className='px-3 py-2'>
								Format name
							</th>
							<th scope='col' className='px-3 py-2'>
								Action
							</th>
						</tr>
						</thead>
						<tbody>
						{
							formats.map((item) => {
								return <tr key={item._id} className='border-b border-gray bg-black'>
									<th scope='row' className='px-6 py-1.5 font-medium text-white whitespace-nowrap'>
										{item._id}
									</th>
									<td className='px-3 py-1.5'>
										{item.name}
									</td>
									<td className='pr-3 py-1.5 text-light-gray'>
										<IconContext.Provider value={{ size: '1.5em' }}>
											<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
												AdminInstance.setIsModal(false)
												AdminInstance.setIsEditing(item._id)
											}}><BiEdit />
											</button>
											<button className='px-3 py-1.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
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
			</div>
		</Layout>

	)
})

export default Format