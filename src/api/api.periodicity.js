import { $authHost } from './api.interceptor'

export const readPeriodicities = async () => {
	try {
		const { data } = await $authHost.get('/periodicity')
		return data
	} catch (e) {
		return e
	}
}

export const createPeriodicities = async (name) => {
	const { data } = await $authHost.post('/periodicity', {name})
	return data
}

export const updatePeriodicities = async (id,name) => {
	const { data } = await $authHost.put('/periodicity', {id, name})
	return data
}

export const deletePeriodicities = async (id) => {
	const { data } = await $authHost.delete(`/periodicity/${id}`)
	return data
}