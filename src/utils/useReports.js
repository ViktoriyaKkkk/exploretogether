import {useEffect, useState} from 'react';
import { readReports } from '../api/api.report'


export const useReports= () => {
	const [reports, setReports] = useState([])
	const [error, setError] = useState(null)
	const load = () => {
		readReports().then(data => setReports(data), (error)=>{
			setError(error.message)
		})
	}
	useEffect(load, [])
	return [reports, error, load];
};
