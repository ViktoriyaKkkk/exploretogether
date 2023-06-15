import {useEffect, useState} from 'react';
import { readAges } from '../api/api.age'


export const useAges = () => {
	const [ages, setAges] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readAges().then(data => setAges(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [ages, error, load];
};
