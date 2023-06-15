import {useEffect, useState} from 'react';
import { readQuestions } from '../api/api.question'



export const useQuestions= () => {
	const [questions, setQuestions] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readQuestions().then(data => setQuestions(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [questions, error, load];
};
