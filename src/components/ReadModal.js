import React from 'react'
import { observer } from 'mobx-react-lite'
import { useAppContext } from '../context/AppContext'
import { clsx } from 'clsx'

const ReadModal = observer(({btn, func, dis, children }) => {

	const { userStore } = useAppContext()

	return (
		<div id='staticModal' data-modal-backdrop='static' tabIndex='-1' aria-hidden='true'
				 className={clsx('fixed flex flex-wrap content-center justify-center right-0 z-40 w-full pt-16 overflow-x-hidden ' +
					 'overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full', userStore._user.role !== '641e18b855a5d5389d78aba7' && 'pl-36')}>
			<div className='relative w-full max-w-2xl max-h-full'>

				<div className={clsx('relative mx-auto text-white rounded-lg w-1/2 shadow bg-black shadow-md ' +
					'drop-shadow-[0_0_35px_rgba(64,147,107,0.9)]', userStore._user.role === '641e18b855a5d5389d78aba7' && 'w-fit')}>

					{children}

					<div className='flex items-center justify-center p-6 space-x-2 border-t border-gray rounded-b'>
						<button disabled={dis} data-modal-hide='staticModal' type='button' onClick={()=> {
							func()
						}}
										className='px-6 disabled:cursor-not-allowed py-2 leading-5 text-white transition-colors duration-200 transform bg-dark-green rounded-md
							hover:bg-light-green focus:outline-none'>
							{btn}
						</button>
					</div>
				</div>
			</div>
		</div>

	)
})

export default ReadModal