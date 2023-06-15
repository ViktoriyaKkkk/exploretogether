import {useEffect, useState} from 'react';
import { readMessages } from '../api/api.message'
import { useAppContext } from '../context/AppContext'


export const useMessages= (id) => {
	const { userStore } = useAppContext()
	const load = () => {
		readMessages(id).then(data => {
			if (data) {
				console.log(data)
				userStore.setChat(data)
			} else {
				userStore.setChat([])
			}
		})
	}
	useEffect(load, [id])
};
