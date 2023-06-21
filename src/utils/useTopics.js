import {useEffect, useState} from 'react';
import { readTopics } from '../api/api.topic'

export const useTopics = () => {
	const [topics, setTopics] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readTopics().then(data => setTopics(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [topics, error, load];
};
