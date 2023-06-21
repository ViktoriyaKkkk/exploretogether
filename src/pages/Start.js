import React, { useEffect, useMemo } from 'react'
import StartForm from '../components/StartForm'
import { useAppContext } from '../context/AppContext'
import { observer } from 'mobx-react-lite'
import Admin from '../components/Admin'
import Profile from '../components/Profile'
import StartSocket from '../components/StartSocket'

const Start = observer(() => {

	const { userStore } = useAppContext()

	return (
		<>
			{
				userStore.isProfile && <Profile/>
			}
			{
				userStore._isAuth ?
					userStore._user.role === '641e18b855a5d5389d78aba8' ? <Admin/> :
					<StartSocket/> : <StartForm/>
			}
	</>
	)
})

export default Start