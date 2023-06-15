import { useEffect, useState } from 'react'
import { set } from 'mobx'


export const useValidation = (value, validations) => {
	const [errLength, setErrLength] = useState('')
	const [errEmpty, setErrEmpty] = useState('')
	const [errCorrect, setErrCorrect] = useState('')
	const [errMaxLength, setErrMaxLength] = useState('')
	const [errZero, setErrZero] = useState('')

	const validate = () => {
		if (typeof value !== 'undefined') {
			for (const validation in validations) {
				switch (validation) {
					case 'minLength':
						value && value.length < validations[validation] ? setErrLength(`Поле должно содержать не менее ${validations[validation]} символов`) : setErrLength('')
						break;
					case 'maxLength':
						value.length > validations[validation] ? setErrMaxLength(`Поле должно содержать не более ${validations[validation]} символов`) : setErrMaxLength('')
						break;
					case 'isEmpty':
						!value ? setErrEmpty('Поле не должно быть пустым') : setErrEmpty('')
						break;
					case 'isZero':
						value===0 ? setErrZero('Поле не должно быть пустым') : setErrZero('')
						break;
					case 'isCorrect':
						value.match(
							/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						) ? setErrCorrect('') : setErrCorrect('Некорректные данные')
						break;
				}
			}
		}

	}

	useEffect(() => {
		validate()
	}, [value])

	return [errEmpty || errZero || errLength || errMaxLength || errCorrect, validate]
}