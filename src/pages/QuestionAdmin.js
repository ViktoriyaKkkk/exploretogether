import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Layout from '../components/Layout'
import DeleteModal from '../components/DeleteModal'
import Sidebar from '../components/Sidebar'
import { IconContext } from 'react-icons'
import { MdDoneOutline } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useQuestions } from '../utils/useQuestions'
import { deleteQuestions, updateQuestions } from '../api/api.question'
import UpdateQuestion from '../components/UpdateQuestion'

const QuestionAdmin = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(()=>{
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate("/")
		}})

	const {AdminInstance} = useAppContext()

	const [questions, error, load] = useQuestions()
	const questionsById = useMemo(() => {
		return questions?.reduce((prev, curr) => {
			return { ...prev, [curr._id]: curr }
		}, {})
	}, [questions])


	return (
		<Layout>
			{
				AdminInstance._isDeleting!=='' && <DeleteModal document={'Questions'} load={load} deleteFunc={deleteQuestions}/>
			}
			{
				AdminInstance._isEditing!=='' && <UpdateQuestion records={questionsById} load={load} updateFunc={updateQuestions}/>
			}
			<Sidebar />

			<div className='relative mt-20 mr-5 ml-48 overflow-x-auto shadow-md sm:rounded-lg'>

				<table className='w-full text-sm text-left text-white'>
					<thead className='text-xs text-white uppercase bg-black bg-opacity-90'>
					<tr>
						<th scope='col' className='pl-6 pr-3 py-2'>
							Question id
						</th>
						<th scope='col' className='pr-3 py-2'>
							Sender
						</th>
						<th scope='col' className='pr-3 py-2'>
							QuestionText
						</th>
						<th scope='col' className='pr-3 py-2'>
							AnswerText
						</th>
						<th scope='col' className='pr-6 py-2'>
							Action
						</th>
					</tr>
					</thead>
					<tbody>
					{
						questions.map((item)=>{
							return <tr key={item._id} className='border-b border-gray bg-black'>
								<th scope='row' className='pl-6 pr-3 py-1.5 font-medium text-white whitespace-nowrap'>
									{item._id}
								</th>
								<td className='pr-3 py-1.5'>
									{item.sender}
								</td>
								<td className='pr-3 py-1.5'>
									{item.questionText}
								</td>
								<td className='pr-3 py-1.5'>
									{item.answerText}
								</td>
								<td className='pr-6 py-1.5 text-light-gray'>
									<IconContext.Provider value={{ size: '1.5em'}}>
										<button disabled={item.answerText} className='disabled:cursor-not-allowed px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={()=> {
											AdminInstance.setIsEditing(item._id)
											AdminInstance.setIsModal(false)
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

export default QuestionAdmin