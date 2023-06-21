import { $authHost} from './api.interceptor'

export const readReports = async () => {
	try {
		const { data } = await $authHost.get('/report')
		return data
	} catch (e) {
		return e
	}
}

export const createReports = async (sender, offender, reportText, processed) => {
	const { data } = await $authHost.post('/report', {sender, offender, reportText, processed})
	return data
}

export const updateReports= async (id,processed,offenderData, notificationText) => {
	const { data } = await $authHost.put('/report', {id,processed,offenderData, notificationText})
	return data
}

export const deleteReports = async (id) => {
	const { data } = await $authHost.delete(`/report/${id}`)
	return data
}