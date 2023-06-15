import React, { useEffect, useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { useReports } from '../utils/useReports'
import { deleteReports, updateReports } from '../api/api.report'
import DeleteModal from '../components/DeleteModal'
import Sidebar from '../components/Sidebar'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { BiEdit } from 'react-icons/bi'
import { IconContext } from "react-icons";
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdDoneOutline } from 'react-icons/md'

const Report = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(()=>{
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate("/")
		}})

	const {AdminInstance} = useAppContext()

	const [reports, error, load] = useReports()

	return (
		<Layout>
			{
				AdminInstance._isDeleting!=='' && <DeleteModal document={'Reports'} load={load} deleteFunc={deleteReports}/>
			}
			<Sidebar />
			<div className='relative mt-20 mr-5 ml-48 overflow-x-auto shadow-md sm:rounded-lg'>

				<table className='w-full text-sm text-left text-white'>
					<thead className='text-xs text-white uppercase bg-black bg-opacity-90'>
					<tr>
						<th scope='col' className='pl-6 pr-3 py-2'>
							Report id
						</th>
						<th scope='col' className='pr-3 py-2'>
							Sender
						</th>
						<th scope='col' className='pr-3 py-2'>
							Offender
						</th>
						<th scope='col' className='pr-3 py-2'>
							ReportText
						</th>
						<th scope='col' className='pr-3 py-2'>
							Processed
						</th>
						<th scope='col' className='pr-6 py-2'>
							Action
						</th>
					</tr>
					</thead>
					<tbody>
					{
						reports.map((item)=>{
							return <tr key={item._id} className='border-b border-gray bg-black'>
								<th scope='row' className='pl-6 pr-3 py-1.5 font-medium text-white whitespace-nowrap'>
									{item._id}
								</th>
								<td className='pr-3 py-1.5'>
									{item.sender}
								</td>
								<td className='pr-3 py-1.5'>
									{item.offender}
								</td>
								<td className='pr-3 py-1.5'>
									{item.reportText}
								</td>
								<td className='pr-3 py-1.5'>
									{`${item.processed}`}
								</td>
								<td className='pr-6 py-1.5 text-light-gray'>
									<IconContext.Provider value={{ size: '1.5em'}}>
										<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={()=> {
										updateReports(item._id, true).then(r=>load())
									}}><MdDoneOutline/>
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
			</div>
		</Layout>

	)
})

export default Report