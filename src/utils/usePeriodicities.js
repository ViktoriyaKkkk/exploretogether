import {useEffect, useState} from 'react';
import { readPeriodicities } from '../api/api.periodicity'

export const usePeriodicities = () => {
	const [periodicities, setPeriodicities] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readPeriodicities().then(data => setPeriodicities(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [periodicities, error, load];
};
