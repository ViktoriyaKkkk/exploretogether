import { $authHost } from './api.interceptor'

export const readCities = async () => {
	try {
		const { data } = await $authHost.get('/city')
		return data
	} catch (e) {
		return e
	}
}
export const createCities = async (name) => {
	const { data } = await $authHost.post('/city', {name})
	return data
}

export const updateCities = async (id,name) => {
	const { data } = await $authHost.put('/city', {id, name})
	return data
}

export const deleteCities = async (id) => {
	const { data } = await $authHost.delete(`/city/${id}`)
	return data
}