import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import AdminLayout from './AdminLayout'

const Admin = () => {
	return (
		<AdminLayout>
			<h1 className='m-auto text-xl font-semibold tracking-widest uppercase text-gray'>Добро пожаловать в
				панель администратора</h1>
		</AdminLayout>
	)
}

export default Admin