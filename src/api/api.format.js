import { $authHost } from './api.interceptor'

export const readFormats = async () => {
	try {
		const { data } = await $authHost.get('/format')
		return data
	} catch (e) {
		return e
	}
}

export const createFormats = async (name) => {
	const { data } = await $authHost.post('/format', {name})
	return data
}

export const updateFormats = async (id,name) => {
	const { data } = await $authHost.put('/format', {id, name})
	return data
}

export const deleteFormats = async (id) => {
	const { data } = await $authHost.delete(`/format/${id}`)
	return data
}