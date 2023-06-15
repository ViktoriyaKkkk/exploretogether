import React from 'react'
import Sidebar from './Sidebar'

const AdminLayout = ({children}) => {
	return (
		<div className="flex flex-col h-screen items-center">
			<Sidebar/>
			{children}
		</div>
	)
}

export default AdminLayout