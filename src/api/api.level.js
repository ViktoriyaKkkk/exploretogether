import { $authHost } from './api.interceptor'

export const readLevels = async () => {
	try {
		const { data } = await $authHost.get('/level')
		return data
	} catch (e) {
		return e
	}
}

export const createLevels = async (name,sectionId) => {
	const { data } = await $authHost.post('/level', {name, sectionId})
	return data
}

export const updateLevels = async (id,name,sectionId) => {
	const { data } = await $authHost.put('/level', {id, name, sectionId})
	return data
}

export const deleteLevels = async (id) => {
	const { data } = await $authHost.delete(`/level/${id}`)
	return data
}