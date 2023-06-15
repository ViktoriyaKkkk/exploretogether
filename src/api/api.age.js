import { $authHost, $host } from './api.interceptor'
import jwtDecode from 'jwt-decode'

export const readAges = async () => {
	try {
		const { data } = await $authHost.get('/age')
		return data
	} catch (e) {
		return e
	}
}

export const createAges = async (name) => {
	const { data } = await $authHost.post('/age', {name})
	return data
}

export const updateAges = async (id,name) => {
	const { data } = await $authHost.put('/age', {id, name})
	return data
}

export const deleteAges = async (id) => {
	const { data } = await $authHost.delete(`/age/${id}`)
	return data
}