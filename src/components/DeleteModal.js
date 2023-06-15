import React from 'react'
import { observer } from 'mobx-react-lite'
import { useAppContext } from '../context/AppContext'
import ModalLayout from './ModalLayout'
import { deleteAges, updateAges } from '../api/api.age'
import { IconContext } from 'react-icons'
import { IoClose } from 'react-icons/io5'

const DeleteModal = observer(({document, load, deleteFunc }) => {

	const { AdminInstance } = useAppContext()

	return (
		<ModalLayout admin={true} func={()=> {
			deleteFunc(AdminInstance._isDeleting).then(r=> {
				console.log(r)
				load()
			})
			AdminInstance.setIsDeleting('')
		}}>
			<div className='flex items-start justify-between p-4 border-b rounded-t border-gray'>
				<h3 className='text-xl font-semibold text-white'>
					Удаление записи из документа {document} с id={AdminInstance._isDeleting}
				</h3>
				<button type='button' onClick={() => {
					AdminInstance.setIsModal(!AdminInstance._isModal)
					AdminInstance.setIsDeleting('')
				}}
								className='text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm
								 p-1.5 ml-auto inline-flex items-center'
								data-modal-hide='staticModal'>
					<IconContext.Provider value={{ size: '2em'}}><IoClose/></IconContext.Provider>
				</button>
			</div>

			<div className='p-6 space-y-6'>
				<p className='inline text-xl font-semibold text-white'>Вы действительно хотите удалить запись с id {AdminInstance._isDeleting}?</p>
			</div>
		</ModalLayout>
	)
})

export default DeleteModal