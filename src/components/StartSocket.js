import React, { useEffect, useMemo } from 'react'
import Main from './Main'
import { useSearch } from '../utils/useSearch'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { observer } from 'mobx-react-lite'

const StartSocket = observer(() => {

	const {userStore} = useAppContext()

	const [searches] = useSearch()
	const chats = useMemo(() => searches?.filter(search => {
		let res = false
		search.owner === userStore._user.id ? res = true : search.participants.forEach((item) => {
			if (item === userStore._user.id) {
				res = true
			}
		})
		return res
	}), [searches, userStore])

	useMemo(()=>chats?.forEach((item)=>{
		userStore.socket.emit('join_room', item._id)
	}),[chats,userStore.socket])

	const location = useLocation()
	useEffect(() => {
		userStore.socket.on('receive_message', (data) => {
			userStore.setChat([...userStore.chat, data])
			if (data.searchId !== location.pathname.split('/')[2]) {
				userStore.setNotifications([...userStore.notifications, data])
			}
		})
		userStore.setIsConnected(true)
	}, [])
 // console.log('startsocket',mobx.toJS(userStore.isConnected))
	return (
		<Main/>
	)
})

export default StartSocket