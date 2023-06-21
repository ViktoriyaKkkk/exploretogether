import { $authHost} from './api.interceptor'

export const readMessages = async (id) => {
	try {
		const { data } = await $authHost.get(`/message/${id}`)
		return data
	} catch (e) {
		return e
	}
}

export const createMessages = async (searchId,author,message,time) => {
	const { data } = await $authHost.post('/message', {searchId,author,message,time})
	return data
}
