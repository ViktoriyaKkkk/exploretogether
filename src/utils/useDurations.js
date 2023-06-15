import {useEffect, useState} from 'react';
import {readDurations } from '../api/api.duration'


export const useDurations = () => {
	const [durations, setDurations] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readDurations().then(data => setDurations(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [durations, error, load];
};
