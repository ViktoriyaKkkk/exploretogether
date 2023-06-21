import axios from 'axios'

export const $host = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL
})

export const $authHost = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL
})

export const $ipHost = axios.create({
	baseURL: 'https://api64.ipify.org?format=json'
})

export const $geoHost = axios.create({
	baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate'
})

$authHost.interceptors.request.use(config => {
	if (config.headers) {
		config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	}
	return config
})

$host.interceptors.request.use(config => {
	return config
})

$geoHost.interceptors.request.use(config => {
	if (config.headers) {
		config.headers.Authorization = `Token 205aaeff0691466641ec8372e2f678235c07e2eb`
	}
	return config
})
