import React from 'react'
import AdminLayout from './AdminLayout'
import Layout from './Layout'

const Admin = () => {
	return (
		<Layout>
			<AdminLayout>
				<h1 className='m-auto text-xl font-semibold tracking-widest uppercase text-gray'>Добро пожаловать в
					панель администратора</h1>
			</AdminLayout></Layout>
	)
}

export default Admin