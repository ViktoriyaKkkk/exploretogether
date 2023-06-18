import {useEffect, useState} from 'react';
import { readAges } from '../api/api.age'
import { readUsers } from '../api/api.user'
import { readSearches } from '../api/api.search'
import { useAppContext } from '../context/AppContext'

export const useSearch= () => {
	const [searches, setSearches] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readSearches().then(data => setSearches(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [searches, error, load];
};
