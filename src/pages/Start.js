import React from 'react'
import Layout from '../components/Layout'
import StartForm from '../components/StartForm'
import { useAppContext } from '../context/AppContext'
import Main from '../components/Main'
import { observer } from 'mobx-react-lite'
import Admin from '../components/Admin'
import Profile from '../components/Profile'

const Start = observer(() => {

	const { userStore } = useAppContext()

	return (
		<Layout>
			{
				userStore.isProfile && <Profile/>
			}
			{
				userStore._isAuth ?
					userStore._user.role === '641e18b855a5d5389d78aba8' ? <Admin/> :
					<Main/> : <StartForm/>
			}
	</Layout>
	)
})

export default Start