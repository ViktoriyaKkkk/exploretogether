import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useReports } from '../utils/useReports'
import { createReports, deleteReports, updateReports } from '../api/api.report'
import DeleteModal from '../components/DeleteModal'
import Sidebar from '../components/Sidebar'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { BiEdit } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdDoneOutline } from 'react-icons/md'
import ReadModal from '../components/ReadModal'
import { IoClose } from 'react-icons/io5'
import { useUsers } from '../utils/useUsers'
import UpdateUser from '../components/UpdateUser'
import { updateUsers } from '../api/api.user'
import ModalLayout from '../components/ModalLayout'

const Report = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(() => {
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate('/')
		}
	})

	const { AdminInstance } = useAppContext()

	const [reports, error, load] = useReports()

	const [users, errorUsers, loadUsers] = useUsers()
	const usersById = useMemo(() => {
		return users?.reduce((prev, curr) => {
			return { ...prev, [curr._id]: curr }
		}, {})
	}, [users])

	const [notificationText, setNotificationText] = useState('')

	return (
		<Layout>
			{
				AdminInstance._isDeleting !== '' && <DeleteModal document={'Reports'} load={load} deleteFunc={deleteReports} />
			}
			<Sidebar />
			{
				AdminInstance._isEditing !== '' && <UpdateUser document={'Users'} records={usersById} load={loadUsers} updateFunc={updateUsers}/>
			}
			{Object.keys(userStore.isReading).length !== 0 &&
				<ReadModal btn={'Изменить'} dis={false} func={() => {
					AdminInstance.setIsModal(false)
					AdminInstance.setIsEditing(userStore.isReading)
				}}>
					<div className='relative flex items-start text-center justify-center p-4 border-b rounded-t border-gray'>
						<h3 className='md:text-xl text-base mr-7 font-semibold text-white place-self-center'>
							Пользователь {usersById[userStore.isReading].name}
						</h3>
						<button type='button' onClick={() => {
							AdminInstance.setIsModal(true)
							userStore.setIsReading('')
						}}
										className='absolute right-4 top-3 text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
										data-modal-hide='staticModal'>

							<IconContext.Provider value={{ size: '2em' }}><IoClose /></IconContext.Provider>
						</button>
					</div>
					<div className='md:text-xl text-sm px-6 py-4 space-y-2 text-white'>
						<p className='font-semibold'>Имя: {usersById[userStore.isReading].name}</p>
						<p className='font-semibold'>Пол: {usersById[userStore.isReading].gender}</p>
						<p className='font-semibold'>Социальная
							сеть: {usersById[userStore.isReading].socialNetwork ? usersById[userStore.isReading].socialNetwork : '-'}</p>
						<p
							className='font-semibold'>Информация: {usersById[userStore.isReading].info ? usersById[userStore.isReading].info : '-'}</p>
					</div>
				</ReadModal>}

			{
				AdminInstance.isCreating && <ModalLayout admin={false} func={() => {
					updateReports(AdminInstance.isCreating._id, true, usersById[AdminInstance.isCreating.offender],
						notificationText).then(r => load())
				}}>
					<div className='relative flex items-start justify-center p-4 border-b border-gray rounded-t'>
						<h3 className='md:text-xl text-lg mr-7 font-semibold text-white place-self-center'>
							Предупреждение пользователя о нарушении
						</h3>
						<button type='button' onClick={() => {
							AdminInstance.setIsModal(!AdminInstance._isModal)
							AdminInstance.setIsCreating(!AdminInstance.setIsCreating)
						}}
										className='absolute right-4 top-3 text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
										data-modal-hide='staticModal'>
							<IconContext.Provider value={{ size: '2em' }}><IoClose /></IconContext.Provider>
						</button>
					</div>

					<div className='p-8 space-y-3'>
						<label htmlFor='report' className='inline md:text-xl text-base font-semibold text-white'>Текст уведомления: </label>
						<textarea cols='40' rows='3' id='report' name='report' placeholder='Введите текст уведомления'
											autoComplete='report'
											value={notificationText} onChange={e => setNotificationText(e.target.value)}

											className='block w-full px-4 py-2 text-gray bg-black font-semibold
								border border-gray rounded-md focus:border-dark-green focus:outline-none focus:ring-2 focus:ring-light-green'
											required />
					</div>
				</ModalLayout>
			}

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
						reports.map((item) => {
							return <tr key={item._id} className='border-b border-gray bg-black'>
								<th scope='row' className='pl-6 pr-3 py-1.5 font-medium text-white whitespace-nowrap'>
									{item._id}
								</th>
								<td className='pr-3 py-1.5'>
									{item.sender}
								</td>
								<td className='pr-3 py-1.5'>
									<button onClick={()=>userStore.setIsReading(item.offender)}>
										{item.offender}
									</button>
								</td>
								<td className='pr-3 py-1.5'>
									{item.reportText}
								</td>
								<td className='pr-3 py-1.5'>
									{`${item.processed}`}
								</td>
								<td className='pr-6 py-1.5 text-light-gray'>
									<IconContext.Provider value={{ size: '1.5em' }}>
										<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
											AdminInstance.setIsCreating(item)
											AdminInstance.setIsModal(false)
										}}><MdDoneOutline />
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
		</Layout>

	)
})

export default Report