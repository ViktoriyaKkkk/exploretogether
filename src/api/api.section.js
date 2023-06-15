import { $authHost } from './api.interceptor'

export const readSections = async () => {
	try {
		const { data } = await $authHost.get('/section')
		return data
	} catch (e) {
		return e
	}
}

export const createSections = async (name,topicId) => {
	const { data } = await $authHost.post('/section', {name, topicId})
	return data
}

export const updateSections = async (id,name,topicId) => {
	const { data } = await $authHost.put('/section', {id, name, topicId})
	return data
}

export const deleteSections = async (id) => {
	const { data } = await $authHost.delete(`/section/${id}`)
	return data
}