import { $authHost } from './api.interceptor'

export const createSearch = async (name, level, duration, periodicity, time, format,
																	 age, city, numberOfPeople, participantsGender) => {

	try {
		const { data } = await $authHost.post('/search', {name, level, duration, periodicity, time, format,
			age, city, numberOfPeople, participantsGender})
		return data
	} catch (e) {
		return e
	}
}

export const readSearches = async () => {
	try {
		const { data } = await $authHost.get('/search')
		return data
	} catch (e) {
		return e
	}
}

export const updateSearches = async (id, marker, name, owner, level, duration, periodicity, time, format,
																		 age, city, numberOfPeople, participantsGender, searchGender) => {
	try {
		const { data } = await $authHost.put('/search', {id,  name, owner, level, duration, periodicity, time, format,
			age, city, numberOfPeople, participantsGender, searchGender, marker })
		return data
	} catch (e) {
		return e
	}
}

export const deleteSearches = async (id) => {
	try {
		const { data } = await $authHost.delete(`/search/${id}`)
		return data
	} catch (e) {
		return e
	}
}