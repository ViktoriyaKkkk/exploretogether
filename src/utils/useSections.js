import {useEffect, useState} from 'react';
import { readSections } from '../api/api.section'

export const useSections = () => {
	const [sections, setSections] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readSections().then(data => setSections(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [sections, error, load];
};
