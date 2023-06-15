import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useSections } from '../utils/useSections'
import { useOneUser } from '../utils/useOneUser'

const Participant = () => {

	const {id} = useParams()

	const [user] = useOneUser()


	return (
		<Layout>
		<div className="flex flex-wrap justify-center h-screen bg-repeat bg-[url('../../public/img/bggrid2.svg')] [mask-image:linear-gradient(0deg,transparent,black)]">
			<div className='mt-16'>
				<h2 className='text-2xl font-semibold text-gray-900'>
					Имя: {user.name}
				</h2>
				<h2 className='text-2xl font-semibold text-gray-900'>
					Имя: {user.name}
				</h2>
			</div>
		</div>
		</Layout>
	)
}

export default Participant