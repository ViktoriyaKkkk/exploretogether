import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useAppContext } from '../context/AppContext'
import ModalLayout from './ModalLayout'
import { IconContext } from 'react-icons'
import { IoClose } from 'react-icons/io5'

const UpdateMiddle = observer(({document, records, load, updateFunc, dependName, dependencies }) => {

	const { AdminInstance } = useAppContext()
	const [name,setName] = useState(records[AdminInstance._isEditing]['name'])
	const [dependence,setDependence] = useState(records[AdminInstance._isEditing][dependName])

	return (
		<ModalLayout admin={true} func={()=> {
			updateFunc(AdminInstance._isEditing, name, dependence).then(r=> {
				load()
			})
			AdminInstance.setIsEditing('')
		}}>
			<div className='flex items-start justify-between p-4 border-b rounded-t border-gray'>
				<h3 className='text-xl place-self-center font-semibold text-white'>
					Редактирование записи из документа {document} с id={AdminInstance._isEditing}
				</h3>
				<button type='button' onClick={() => {
					AdminInstance.setIsModal(!AdminInstance._isModal)
					AdminInstance.setIsEditing('')
				}}
								className='text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm
								 p-1.5 ml-auto inline-flex items-center'
								data-modal-hide='staticModal'>
					<IconContext.Provider value={{ size: '2em'}}><IoClose/></IconContext.Provider>
				</button>
			</div>

			<div className='p-6 space-y-6'>
				<label className='inline text-xl font-semibold text-white'>{dependName}: </label>
				<select value={dependence} onChange={e => setDependence(e.target.value)}
								className='placeholder-light-gray block w-full px-4 py-2 mt-2 text-white bg-black border
							 border-gray rounded-md focus:ring-2 focus:ring-light-green focus:outline-none'>
					{
						dependencies.map((item) => {
							return <option value={item._id} key={item._id}>{item._id} - {item.name}</option>
						})
					}
				</select>
			</div>

			<div className='px-6 pb-6 space-y-6'>
				<label htmlFor='name' className='inline text-xl font-semibold text-white'>name: </label>
				<input id='name' type='name' name='name' placeholder='name' autoComplete='name'
							 value={name} onChange={e => setName(e.target.value)}
							 className='placeholder-light-gray block w-full px-4 py-2 mt-2 text-white bg-black border
							 border-gray rounded-md focus:ring-2 focus:ring-light-green
							 focus:outline-none'
							 required />
			</div>
		</ModalLayout>
	)
})

export default UpdateMiddle