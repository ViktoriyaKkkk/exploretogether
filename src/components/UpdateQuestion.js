import React, { useState } from 'react'
import { updateQuestions } from '../api/api.question'
import { IconContext } from 'react-icons'
import { IoClose } from 'react-icons/io5'
import ModalLayout from './ModalLayout'
import { useAppContext } from '../context/AppContext'
import { useQuestions } from '../utils/useQuestions'
import { useValidation } from '../utils/useValidation'

const UpdateQuestion = ({records, load, updateFunc }) => {
	const {AdminInstance} = useAppContext()

	const [answer,setAnswer] = useState('')
	const [questionErr, validateQuestion] = useValidation(answer, { isEmpty: true })
	const [bluredQuestion, setBluredQuestion] = useState(false)

	return (
		<ModalLayout admin={true} func={() => {
			updateFunc(AdminInstance.isEditing, records[AdminInstance.isEditing].sender,
				records[AdminInstance.isEditing].questionText, answer).then(r => {
				setBluredQuestion(false)
				setAnswer('')
				load()
				console.log(r)
			})
		}}>
			<div className='relative flex items-start justify-center p-4 border-b border-gray rounded-t'>
				<h3 className='mr-7 font-semibold text-white place-self-center'>
					Вопрос от пользователя с id {records[AdminInstance.isEditing].sender}
				</h3>
				<button type='button' onClick={() => {
					AdminInstance.setIsModal(!AdminInstance._isModal)
					AdminInstance.setIsEditing('')
					setBluredQuestion(false)
				}}
								className='absolute right-4 top-3 text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
								data-modal-hide='staticModal'>
					<IconContext.Provider value={{ size: '2em' }}><IoClose /></IconContext.Provider>
				</button>
			</div>

			<div className='p-8 space-y-3'>
				<p className='text-white font-semibold'>Вопрос: {records[AdminInstance.isEditing].questionText}</p>
				<label htmlFor='question' className='inline font-semibold text-white'>Ответ: </label>
				<textarea cols='40' rows='3' id='question' name='question' placeholder='Введите текст ответа'
									autoComplete='question'
									value={answer} onChange={e => setAnswer(e.target.value)}
									onBlur={e => {
										setBluredQuestion(true)
										validateQuestion()
									}}
									className='block w-full px-4 py-2 text-white bg-black font-semibold
								border border-gray rounded-md focus:border-dark-green focus:outline-none focus:ring-2 focus:ring-light-green'
									required />
				{
					questionErr && bluredQuestion && <p className='fixed bottom-24 text-red'>{questionErr}</p>
				}
			</div>
		</ModalLayout>
	)
}

export default UpdateQuestion