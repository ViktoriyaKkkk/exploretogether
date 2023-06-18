import React from 'react'
import toast from "react-hot-toast";
import { clsx } from 'clsx'
import { MdOutlineClose } from 'react-icons/md'
import { FaRegFrown, FaRegGrinBeam } from 'react-icons/fa'

const Toast = (type, heading, text) => {
	return (
		toast.custom(
			(t) => (
				<div
					className={clsx('flex flex-row items-center justify-center w-96 bg-black' +
						' px-4 py-6 text-white shadow-2xl border border-gray hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl ' +
						'relative transition-all duration-500 ease-in-out;', t.visible ? "top-0" : "-top-96")}>
					<div className={clsx('text-2xl text-light-green mr-5 ml-2', type!=='ok' && 'text-red')}>
						{
							type==='ok' ? <FaRegGrinBeam /> : <FaRegFrown />
						}
					</div>
					<div className='flex flex-col items-start justify-center ml-4 cursor-default'>
						<h1 className='text-base text-white font-semibold leading-none tracking-wider'>{heading}</h1>
						<p className='text-sm text-dark-white mt-2 leading-relaxed tracking-wider'>
							{text}
						</p>
					</div>
					<div className='absolute top-2 right-2 cursor-pointer text-lg' onClick={() => toast.dismiss(t.id)}>
						<MdOutlineClose />
					</div>
				</div>
			),
			{ id: "unique-notification", position: "top-center" }
		)
	)
}

export default Toast