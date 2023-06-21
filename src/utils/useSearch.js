import {useEffect, useState} from 'react';
import { readSearches } from '../api/api.search'

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
