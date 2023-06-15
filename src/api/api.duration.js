import { $authHost } from './api.interceptor'

export const readDurations = async () => {
	try {
		const { data } = await $authHost.get('/duration')
		return data
	} catch (e) {
		return e
	}
}

	export const createDurations = async (name) => {
		const { data } = await $authHost.post('/duration', { name })
		return data
	}

	export const updateDurations = async (id, name) => {
		const { data } = await $authHost.put('/duration', { id, name })
		return data
	}

	export const deleteDurations = async (id) => {
		const { data } = await $authHost.delete(`/duration/${id}`)
		return data
	}