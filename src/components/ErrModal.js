import React from 'react'
import { observer } from 'mobx-react-lite'
import { useAppContext } from '../context/AppContext'

const ErrModal = observer(({func, children }) => {

	const { userStore } = useAppContext()

	return (
		<div id='staticModal' data-modal-backdrop='static' tabIndex='-1' aria-hidden='true'
				 className='fixed flex flex-wrap content-center justify-center right-0 z-50 w-full pt-16 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
			<div className='relative w-full max-w-2xl max-h-full'>

				<div className='relative bg-black rounded-lg shadow '>

					{children}

					<div className='flex items-center justify-center p-6 space-x-2 border-t border-gray rounded-b'>
						<button data-modal-hide='staticModal' type='button' onClick={()=> {
							func()
							// console.log(load())
						}}
										className='text-white bg-dark-green hover:bg-light-green focus:ring-4 focus:outline-none focus:ring-light-green
										font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
							Ок
						</button>
					</div>
				</div>
			</div>
		</div>

	)
})

export default ErrModal