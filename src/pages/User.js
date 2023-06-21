import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Layout from '../components/Layout'
import DeleteModal from '../components/DeleteModal'
import Sidebar from '../components/Sidebar'
import { IconContext } from 'react-icons'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useUsers } from '../utils/useUsers'
import { deleteUsers, updateUsers } from '../api/api.user'
import UpdateUser from '../components/UpdateUser'
import { Pagination } from '../components/Pagination'

const User = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(()=>{
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate("/")
		}})

	const {AdminInstance} = useAppContext()

	const [users, error, load] = useUsers()
	const usersById = useMemo(()=>{
		return users?.reduce((prev, curr)=>{
			return {...prev, [curr._id]:curr}
		}, {})
	}, [users])

	const PageSize = 10;
	const lastPage = useMemo(()=>Math.ceil(users.length / PageSize), [users, PageSize]);

	const [currentPage, setCurrentPage] = useState(1);

	const currentUsers = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize; //индекс первого элемента на странице
		const lastPageIndex = firstPageIndex + PageSize; //индекс последнего элемента(не выводится)
		return users?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, users]);

	return (
		<Layout>
			{
				AdminInstance._isEditing !== '' && <UpdateUser document={'Users'} records={usersById} load={load} updateFunc={updateUsers}/>
			}
			{
				AdminInstance._isDeleting!=='' && <DeleteModal document={'Users'} load={load} deleteFunc={deleteUsers}/>
			}
			<Sidebar />
			<div className='relative mt-20 mr-5 ml-48 overflow-x-auto shadow-md sm:rounded-lg'>

				<table className='w-full text-sm text-left text-white'>
					<thead className='text-xs text-white uppercase bg-black bg-opacity-90'>
					<tr>
						<th scope='col' className='pl-6 pr-3 py-2'>
							User id
						</th>
						<th scope='col' className='pr-3 py-2'>
							User name
						</th>
						<th scope='col' className='pr-3 py-2'>
							User email
						</th>
						<th scope='col' className='pr-3 py-2'>
							User role
						</th>
						<th scope='col' className='pr-3 py-2'>
							User gender
						</th>
						<th scope='col' className='pr-3 py-2'>
							User socialNetwork
						</th>
						<th scope='col' className='pr-3 py-2'>
							User info
						</th>
						<th scope='col' className='pr-6 py-2'>
							Action
						</th>
					</tr>
					</thead>
					<tbody>
					{
						currentUsers.map((item)=>{
							return <tr key={item._id} className='border-b border-gray bg-black'>
								<th scope='row' className='pl-6 pr-3 py-1 font-medium text-white whitespace-nowrap'>
									{item._id}
								</th>
								<td className='pr-3 py-1'>
									{item.name}
								</td>
								<td className='pr-3 py-1'>
									{item.email}
								</td>
								<td className='pr-3 py-1'>
									{item.role}
								</td>
								<td className='pr-3 py-1'>
									{item.gender}
								</td>
								<td className='pr-3 py-1'>
									{item.socialNetwork}
								</td>
								<td className='pr-3 py-1'>
									{item.info}
								</td>
								<td className='pr-6 py-1 text-light-gray'>
									<IconContext.Provider value={{ size: '1.5em'}}>
										<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
										AdminInstance.setIsModal(false)
										AdminInstance.setIsEditing(item._id)
									}}><BiEdit/>
									</button>
										<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
											AdminInstance.setIsModal(false)
											AdminInstance.setIsDeleting(item._id)
										}}><RiDeleteBin5Line/>
										</button></IconContext.Provider>
								</td>
							</tr>
						})
					}
					</tbody>
				</table>
				<Pagination currentPage={currentPage} lastPage={lastPage} pageSize={PageSize} totalCount={users.length} onPageChange={page => setCurrentPage(page)}/>
			</div>
		</Layout>

	)
})

export default User