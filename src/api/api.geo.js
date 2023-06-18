import { $geoHost, $ipHost} from './api.interceptor'

export const readGeo = async (ip) => {
	try {
		const { data } = await $geoHost.get(`/address?ip=${ip}`)
		console.log('city', data)
		localStorage.setItem('city',data.location.data.city)
		return data
	} catch (e) {
		console.log(e)
		return e
	}
}

export const readIp = async () => {
	try {
		const { data } = await $ipHost.get(``)
		console.log(data)
		return data
	} catch (e) {
		console.log(e)
		return e
	}
}

