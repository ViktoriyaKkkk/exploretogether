import { $authHost} from './api.interceptor'

export const readQuestions = async () => {
	try {
		const { data } = await $authHost.get('/question')
		return data
	} catch (e) {
		return e
	}
}

export const createQuestions = async (sender, questionText, answerText) => {
	const { data } = await $authHost.post('/question', {sender, questionText, answerText})
	return data
}

export const updateQuestions = async (id,sender,questionText,answerText) => {
	const { data } = await $authHost.put('/question', {id,sender,questionText,answerText})
	return data
}

export const deleteQuestions = async (id) => {
	const { data } = await $authHost.delete(`/question/${id}`)
	return data
}