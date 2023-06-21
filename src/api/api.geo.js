import { $geoHost, $ipHost} from './api.interceptor'

export const readGeo = async (ip) => {
	try {
		const { data } = await $geoHost.get(`/address?ip=${ip}`)
		localStorage.setItem('city',data.location.data.city)
		return data
	} catch (e) {
		return e
	}
}

export const readIp = async () => {
	try {
		const { data } = await $ipHost.get(``)
		return data
	} catch (e) {
		return e
	}
}

