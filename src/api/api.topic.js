import { $authHost } from './api.interceptor'

export const readTopics = async () => {
	try {
		const { data } = await $authHost.get('/topic')
		return data
	} catch (e) {
		return e
	}
}

export const createTopics = async (name) => {
	const { data } = await $authHost.post('/topic', {name})
	return data
}

export const updateTopics = async (id,name) => {
	const { data } = await $authHost.put('/topic', {id, name})
	return data
}

export const deleteTopics = async (id) => {
	const { data } = await $authHost.delete(`/topic/${id}`)
	return data
}