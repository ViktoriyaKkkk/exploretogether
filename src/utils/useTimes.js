import {useEffect, useState} from 'react';
import { readTimes } from '../api/api.time'


export const useTimes = () => {
	const [times, setTimes] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readTimes().then(data => setTimes(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [times, error, load];
};
