import React from 'react'
import { clsx } from 'clsx'
import { useAppContext } from '../context/AppContext'
import { observer } from 'mobx-react-lite'

const ModalLayout = observer(({admin, func, children }) => {

	const { AdminInstance} = useAppContext()

	return (
		<div id='staticModal' data-modal-backdrop='static' tabIndex='-1' aria-hidden='true'
				 className={clsx('fixed flex flex-wrap place-content-center justify-center right-0 z-50 w-full pt-16 overflow-x-hidden overflow-y-auto ' +
					 'md:inset-0 h-[calc(100%-1rem)] max-h-full', AdminInstance._isModal && 'hidden', admin && 'pl-40')}>
			<div className='relative w-4/5 md:w-1/3 max-w-2xl max-h-full'>

				<div className={clsx('relative rounded-lg bg-black shadow shadow-md drop-shadow-[0_0_35px_rgba(64,147,107,0.9)]')}>

					{children}

					<div className='flex place-content-center items-center p-6 space-x-2 border-t border-gray rounded-b'>
						<button data-modal-hide='staticModal' type='button' onClick={()=> {
							func()
							AdminInstance.setIsModal(!AdminInstance._isModal)
						}}
										className='px-6 disabled:cursor-not-allowed md:text-base text-sm py-2 leading-5 text-white transition-colors
										duration-200 transform bg-dark-green rounded-md
							hover:bg-light-green focus:outline-none'>
							Подтвердить
						</button>
						<button data-modal-hide='staticModal' type='button' onClick={()=> {
							AdminInstance.setIsModal(!AdminInstance._isModal)
							AdminInstance.setIsDeleting('')
							AdminInstance.setIsEditing('')
							AdminInstance.setIsCreating(false)
						}}
										className='px-6 disabled:cursor-not-allowed py-2 leading-5 text-white transition-colors
										duration-200 transform bg-dark-green rounded-md
							hover:bg-light-green focus:outline-none'>Отмена
						</button>
					</div>
				</div>
			</div>
		</div>

	)
})

export default ModalLayout