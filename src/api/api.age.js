import { $authHost } from './api.interceptor'

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