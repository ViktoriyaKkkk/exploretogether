import {useEffect, useState} from 'react';
import { readLevels } from '../api/api.level'


export const useLevels = () => {
	const [levels, setLevels] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readLevels().then(data => setLevels(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [levels, error, load];
};
