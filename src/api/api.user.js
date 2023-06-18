import {$authHost, $host} from './api.interceptor'
import jwtDecode from 'jwt-decode'

export const registration = async (name, email, password, gender) => {
	try {
		const { data } = await $host.post('/auth/registration', {email, password, name, gender})
		localStorage.setItem("token", data)
		return jwtDecode(data)
	} catch (e) {
		return e
	}
}

export const login = async (email, password) => {
	try {
		const { data } = await $host.post('/auth/login', {email, password})
		console.log("login: ",jwtDecode(data))
		localStorage.setItem("token", data)
		return jwtDecode(data)
	} catch (e) {
		return e
	}
}

export const check = async () => {
	try {
		const { data } = await $authHost.get('/auth/check')
		// console.log("res: ",res)
		localStorage.setItem("token", data)
		return jwtDecode(data)

	} catch (e) {
		return e
	}
}

export const readUsers = async () => {
	try {
		const { data } = await $authHost.get('/auth')
		console.log(data)
		return data

	} catch (e) {
		console.log(e)
		return e

	}
}

export const readOneUser = async (id) => {
	try {
		const { data } = await $authHost.get(`/auth/${id}`)
		return data
	} catch (e) {
		return e
	}
}

export const updateUsers = async (id, name, email,role, password, newPassword, gender, socialNetwork, info) => {
	try {
		const { data } = await $authHost.put('/auth', {
			id,
			name,
			email,
			role,
			password,
			newPassword,
			gender,
			socialNetwork,
			info,
		})
		return data
	} catch (e){
		return e
	}
}

export const deleteUsers = async (id) => {
	try {
		const { data } = await $authHost.delete(`/auth/${id}`)
		return data
	} catch (e) {
		return e
	}
}