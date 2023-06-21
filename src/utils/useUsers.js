import {useEffect, useState} from 'react';
import { readUsers } from '../api/api.user'

export const useUsers= () => {
	const [users, setUsers] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readUsers().then(data => setUsers(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [users, error, load];
};
