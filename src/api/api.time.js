import { $authHost } from './api.interceptor'

export const readTimes = async () => {
	try {
		const { data } = await $authHost.get('/time')
		return data
	} catch (e) {
		return e
	}
}

export const createTimes = async (name) => {
	const { data } = await $authHost.post('/time', {name})
	return data
}

export const updateTimes = async (id,name) => {
	const { data } = await $authHost.put('/time', {id, name})
	return data
}

export const deleteTimes = async (id) => {
	const { data } = await $authHost.delete(`/time/${id}`)
	return data
}