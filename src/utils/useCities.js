import {useEffect, useState} from 'react';
import { readCities } from '../api/api.city'


export const useCities = () => {
	const [cities, setCities] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readCities().then(data => setCities(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [cities, error, load];
};
