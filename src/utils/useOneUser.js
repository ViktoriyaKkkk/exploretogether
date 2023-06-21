import {useEffect, useState} from 'react';
import { readOneUser } from '../api/api.user'


export const useOneUser= (id) => {
	const [user, setUser] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readOneUser(id).then(data => setUser(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [user, error, load];
};
