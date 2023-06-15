import { useEffect, useState } from 'react'
import { login, registration } from '../api/api.user'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { observer } from 'mobx-react-lite'
import { useValidation } from '../utils/useValidation'
import { clsx } from 'clsx'
import ErrModal from './ErrModal'
import { readGeo, readIp } from '../api/api.geo'


const StartForm = observer(() => {

	const { userStore } = useAppContext()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [gender, setGender] = useState('Жен')
	const [socialNetwork, setSocialNetwork] = useState('')
	const [nameErr, validateName] = useValidation(name, { minLength: 3, isEmpty: true })
	const [bluredName, setBluredName] = useState(false)
	const [passwordErr, validatePassword] = useValidation(password, { minLength: 6, isEmpty: true, maxLength: 20 })
	const [bluredPassword, setBluredPassword] = useState(false)
	const [emailErr, validateEmail] = useValidation(email, { isEmpty: true, isCorrect: true })
	const [bluredEmail, setBluredEmail] = useState(false)
	// const [snErr, validateSn] = useValidation(socialNetwork, { isEmpty: true })
	// const [bluredSn, setBluredSn] = useState(false)

	const navigate = useNavigate()

	const auth = async () => {
		if (userStore._isLogin) {
			const res = await login(email, password)
			if (!res.response || res.response.status === 200) {
				console.log(res)
				userStore.setUser(res)
				userStore.setIsAuth(true)
				readIp().then(r => {
					if (r) {
						readGeo(r).then(loc => {
						})
					}
				})
			} else {
				alert(res.response.data.message)
			}
		} else {
			const res = await registration(name, email, password, gender)
			if (!res.response || res.response.status === 200) {
				readIp().then(r => {
					if (r) {
						readGeo(r).then(loc => {
						})
					}
				})
				userStore.setUser(res)
				userStore.setIsAuth(true)
			} else {
				alert(res.response.data.message)
			}

		}
	}

	return (<>
			<div className="flex pt-14 flex-col h-screen bg-[url('../../public/img/background.jpg')] bg-cover bg-center">
				<div className='grid place-items-center mx-2 my-auto'>

					<div className='ring-red ring-8 ring-opacity-50 w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12
            px-6 py-10 sm:px-10 sm:py-6
            bg-opacity-90 bg-black rounded-lg'>
						<h2 className='block text-center font-bold text-2xl lg:text-2xl text-white'>
							{userStore._isLogin ? 'Вход' : 'Регистрация'}
						</h2>

						<form className='mt-3' method='POST'>
							<div className='grid grid-cols-1 gap-4'>
								{
									!userStore._isLogin && <div>
										<label htmlFor='name' className='block text-white '>Имя:</label>
										<input id='name' type='name' name='name' placeholder='Введите имя' autoComplete='name'
													 value={name} onChange={e => setName(e.target.value)}
													 onBlur={e => {
														 setBluredName(true)
														 validateName()
													 }}
													 className={clsx('block w-full px-2 py-1.5 mt-1.5 text-gray bg-white border ' +
														 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
														 'focus:ring-light-green focus:outline-none', nameErr && bluredName && 'ring-2 ring-red focus:ring-red')}
													 required />
										{
											nameErr && bluredName && <p className='absolute text-red text-sm'>{nameErr}</p>
										}
									</div>
								}

								<div>
									<label htmlFor='email' className='block text-white'>Эл. почта:</label>
									<input id='email' type='email' name='email' placeholder='Введите эл. почту' autoComplete='email'
												 value={email} onChange={e => setEmail(e.target.value)}
												 onBlur={e => {
													 setBluredEmail(true)
													 validateEmail()
												 }}
												 className={clsx('block w-full px-2 py-1.5 mt-1.5 text-gray-700 bg-white border ' +
													 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													 'focus:ring-light-green focus:outline-none', emailErr && bluredEmail && 'ring-2 ring-red focus:ring-red')}
												 required />
									{
										emailErr && bluredEmail && <p className='absolute text-red text-sm'>{emailErr}</p>
									}
								</div>

								<div>
									<label htmlFor='password'
												 className='block text-white'>Пароль:</label>
									<input id='password' type='password' name='password' placeholder='Введите пароль'
												 autoComplete='current-password'
												 value={password} onChange={e => setPassword(e.target.value)}
												 onBlur={e => {
													 setBluredPassword(true)
													 validatePassword()
												 }}
												 className={clsx('block w-full px-2 py-1.5 mt-1.5 text-gray-700 bg-white border ' +
													 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													 'focus:ring-light-green focus:outline-none', passwordErr && bluredPassword && 'ring-2 ring-red focus:ring-red')}
												 required />
									{
										passwordErr && bluredPassword && <p className='absolute text-red text-sm'>{passwordErr}</p>
									}</div>
								{
									!userStore._isLogin && <>
										<div>
											<label htmlFor='password'
														 className='block text-white'>Пол:</label>

											<select value={gender} onChange={e => setGender(e.target.value)}
															className='block w-full px-2 py-1.5 mt-1.5 text-gray-700 bg-white border
												border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 focus:ring-light-green
												focus:outline-none'>
												<option value={'Жен'}>Женский</option>
												<option value={'Муж'}>Мужской</option>
											</select>
										</div>
										{/*<div className='flex items-center mb-4'>*/}

										{/*	<input*/}
										{/*		className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'*/}
										{/*		type='radio'*/}
										{/*		name='gender'*/}
										{/*		value='Жен'*/}
										{/*		id='female'*/}
										{/*		onChange={e => setGender(e.target.value)}*/}
										{/*		checked={gender === 'Жен' ? true : false} />*/}
										{/*	<label*/}
										{/*		className='mt-px text-black inline-block pl-[0.15rem] hover:cursor-pointer'*/}
										{/*		htmlFor='female'>*/}
										{/*		Жен*/}
										{/*	</label>*/}
										{/*</div>*/}
										{/*<div className='flex items-center mb-4'>*/}
										{/*	<input*/}
										{/*		className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'*/}
										{/*		type='radio'*/}
										{/*		name='gender'*/}
										{/*		value='Муж'*/}
										{/*		id='male'*/}
										{/*		onChange={e => setGender(e.target.value)}*/}
										{/*		checked={gender === 'Муж' ? true : false} />*/}
										{/*	<label*/}
										{/*		className='mt-px inline-block text-black pl-[0.15rem] hover:cursor-pointer'*/}
										{/*		htmlFor='male'>*/}
										{/*		Муж*/}
										{/*	</label>*/}
										{/*</div>*/}
									</>
								}

								<div className='sm:flex sm:flex-col text-md text-center'>

									<p className='flex-1 text-white text-md mx-4 my-1 sm:my-auto'>
										{
											userStore._isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'
										}

									</p>
									<Link to='/' onClick={() => userStore.setIsLogin(!userStore._isLogin)}
												className='flex-2 text-white underline'>
										{
											userStore._isLogin ? 'Зарегистрироваться' : 'Войти'
										}
									</Link>

								</div>

								<button type='button'
												disabled={!userStore._isLogin ? emailErr || passwordErr || nameErr : emailErr || passwordErr}
												onClick={auth}
												className='w-full py-3 bg-dark-green bg-transparent-none rounded-md
                    font-medium text-white text-sm uppercase text-center
                    focus:outline-none hover:bg-light-green hover:shadow-none  disabled:cursor-not-allowed'>
									{userStore._isLogin ? 'Войти' : 'Зарегистрироваться'}
								</button>


							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
})

export default StartForm