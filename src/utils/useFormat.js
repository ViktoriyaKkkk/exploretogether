import {useEffect, useState} from 'react';
import { readFormats } from '../api/api.format'


export const useFormats = () => {
	const [formats, setFormats] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readFormats().then(data => setFormats(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [formats, error, load];
};
