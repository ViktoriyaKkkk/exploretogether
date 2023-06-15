import React, { useMemo, useState } from 'react'
import ReadModal from './ReadModal'
import { useOneUser } from '../utils/useOneUser'
import { IconContext } from 'react-icons'
import { IoClose } from 'react-icons/io5'
import { useAppContext } from '../context/AppContext'
import { updateUsers } from '../api/api.user'
import { observer } from 'mobx-react-lite'
import { useValidation } from '../utils/useValidation'
import { clsx } from 'clsx'

const Profile = observer(() => {

	const {userStore} = useAppContext()

	const [user, err, load] = useOneUser(userStore.user.id)

	const [name,setName] = useState(' ')
	const [nameErr, validateName] = (useValidation(name, {minLength: 3, isEmpty: true }))
	const [bluredName, setBluredName] = useState(false)

	const [email,setEmail] = useState('')
	const [emailErr, validateEmail] = useValidation(email, {isEmpty: true, isCorrect:true})
	const [bluredEmail, setBluredEmail] = useState(false)

	const [password,setPassword] = useState('')
	const [passwordErr, validatePassword] = useValidation(password, {minLength: 6, isEmpty: true, maxLength:20 })
	const [bluredPassword, setBluredPassword] = useState(false)

	const [newPassword, setNewPassword] = useState('')
	const [newPasswordErr, validateNewPassword] = useValidation(newPassword, {minLength: 6, maxLength:20 })
	const [bluredNewPassword, setBluredNewPassword] = useState(false)

	const [gender,setGender] = useState('')
	const [socialNetwork,setSocialNetwork] = useState('')
	// const [snErr, validateSn] = useValidation(socialNetwork, {isEmpty: true})
	// const [bluredSn, setBluredSn] = useState(false)

	const [info,setInfo] = useState('')

	useMemo(()=>{
		setName(user.name)
		setEmail(user.email)
		setGender(user.gender)
		setSocialNetwork(user.socialNetwork || '')
		setInfo(user.info || '')
	},[user])

	return (
		<ReadModal btn={'Изменить'} func={()=> {
			if (userStore.editProfile) {
				updateUsers(userStore.user.id, name, email,'', password, newPassword, gender, socialNetwork, info).then(r=> {
					if (!r.response || r.response.status === 200){
						alert("Ваши персональные данные изменены")
						load()
						userStore.setEditProfile(false)
					} else {
						alert(r.response.data.message)
					}
				})
			}
			else {
				userStore.setEditProfile(true)
			}
		}} dis={userStore.editProfile && (nameErr || emailErr || passwordErr || newPasswordErr)}>
			<div className='relative flex items-start text-center justify-center p-4 border-b rounded-t border-gray'>
				<h3 className='md:text-xl text-base mr-7 font-semibold text-white'>
					{
						userStore.editProfile ? 'Редактирование персональных данных' : 'Персональные данные'
					}

				</h3>
				<button type='button' onClick={() => {
					userStore.editProfile ? userStore.setEditProfile(false) : userStore.setIsProfile(false)
				}}
								className='absolute right-4 top-3 text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg
								text-sm p-1.5 ml-auto inline-flex items-center'>

					<IconContext.Provider value={{ size: '2em'}}><IoClose/></IconContext.Provider>
				</button>
			</div>

			{
				userStore.editProfile ? 	<div className='grid grid-cols-1 m-5 md:gap-6 gap-4 md:grid-cols-2'>
						<div className='space-y-1 relative'>
							<label htmlFor='name' className='inline md:text-xl text-sm font-semibold text-white'>Имя: </label>
							<input id='name' type='name' name='name' placeholder='Имя' autoComplete='name'
										 value={name} onChange={e => setName(e.target.value)}
										 onBlur={e=> {
											 setBluredName(true)
											 validateName()
										 }}
										 className={clsx('block w-full md:text-base text-sm px-4 md:py-2 p-1 mt-2 text-white bg-black border ' +
											 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
											 'focus:ring-light-green focus:outline-none', nameErr && bluredName && 'border-none ring-2 ring-red focus:ring-red')}/>
							{
								nameErr && bluredName && <p className='absolute -bottom-5 md:text-base text-sm text-red'>{nameErr}</p>
							}
						</div>

						<div className='space-y-1'>
							<label htmlFor='email' className='inline md:text-xl text-sm font-semibold text-gray-500 dark:text-gray-400'>Эл. почта: </label>
							<input id='email' type='email' name='email' placeholder='Почта' autoComplete='email'
										 value={email} onChange={e => setEmail(e.target.value)}
										 onBlur={e=> {
											 setBluredEmail(true)
											 validateEmail()
										 }}
										 className={clsx('block w-full md:text-base text-sm px-4 md:py-2 p-1 mt-2 text-white bg-black border ' +
											 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
											 'focus:ring-light-green focus:outline-none', emailErr && bluredEmail && 'border-none ring-2 ring-red focus:ring-red')}/>
							{
								emailErr && bluredEmail && <p className='absolute -bottom-5 md:text-base text-sm text-red'>{emailErr}</p>
							}
						</div>

						<div className='space-y-1'>
							<label htmlFor='email' className='inline md:text-xl text-sm font-semibold text-gray-500 dark:text-gray-400
							after:content-["*"] after:ml-0.5 after:text-light-green after:text-xl'>Пароль:</label>
							<input id='password' type='password' name='password' placeholder='Пароль' autoComplete='current-password'
										 value={password} onChange={e => setPassword(e.target.value)}
										 onBlur={e=> {
											 setBluredPassword(true)
											 validatePassword()
										 }}
										 className={clsx('block w-full md:text-base text-sm px-4 md:py-2 p-1 mt-2 text-white bg-black border ' +
											 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
											 'focus:ring-light-green focus:outline-none', passwordErr && bluredPassword && 'border-none ring-2 ring-red focus:ring-red')}/>
							{
								passwordErr && bluredPassword && <p className='absolute -bottom-5 md:text-base text-sm text-red'>{passwordErr}</p>
							}
						</div>

						<div className='space-y-1'>
							<label htmlFor='newpassword' className='inline md:text-xl text-sm font-semibold text-gray-500 dark:text-gray-400'>Новый пароль: </label>
							<input id='newpassword' type='password' name='password' placeholder='Пароль' autoComplete='current-password'
										 value={newPassword} onChange={e => setNewPassword(e.target.value)}
										 onBlur={e=> {
											 setBluredNewPassword(true)
											 validateNewPassword()
										 }}
										 className={clsx('block w-full md:text-base text-sm px-4 md:py-2 p-1 mt-2 text-white bg-black border ' +
											 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
											 'focus:ring-light-green focus:outline-none', newPasswordErr && bluredNewPassword && 'border-none ring-2 ring-red focus:ring-red')}/>
							{
								newPasswordErr && bluredNewPassword && <p className='absolute -bottom-5 md:text-base text-sm text-red'>{newPasswordErr}</p>
							}
						</div>

						<div className='space-y-1'>
							<label className='inline md:text-xl text-sm font-semibold text-gray-500 dark:text-gray-400'>Пол: </label>
							<select value={gender} onChange={e => setGender(e.target.value)}
											className='block w-full md:text-base text-sm px-4 md:py-2 p-1 mt-2 text-white bg-black border
											 border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2
											 focus:ring-light-green focus:outline-none'>
								<option value={'Жен'}>Жен</option>
								<option value={'Муж'}>Муж</option>
							</select>
						</div>

						<div className='space-y-1 relative'>
							<label htmlFor='socialNetwork' className='inline md:text-xl text-sm font-semibold text-gray-500 dark:text-gray-400'>Социальная сеть: </label>
							<input id='socialNetwork' type='socialNetwork' name='socialNetwork' placeholder='Соцсеть' autoComplete='socialNetwork'
										 value={socialNetwork} onChange={e => setSocialNetwork(e.target.value)}
										 className={clsx('block w-full md:text-base text-sm px-4 md:py-2 p-1 mt-2 text-white bg-black border ' +
											 'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
											 'focus:ring-light-green focus:outline-none')}/>
						</div>

						<div className='space-y-1'>
							<label htmlFor='info' className='inline md:text-xl text-sm font-semibold text-white'>Информация: </label>
							<input id='info' type='info' name='info' placeholder='Информация' autoComplete='info'
										 value={info} onChange={e => setInfo(e.target.value)}
										 className='block w-full md:text-base text-sm px-4 md:py-2 p-1 mt-2 text-white bg-black border
											 border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2
											 focus:ring-light-green focus:outline-none'/>
						</div>
					</div>
					: <div className='px-6 py-4 space-y-2 text-white md:text-xl text-base font-semibold'>
						<p>Имя: {user.name}</p>
						<p>Эл. почта: {user.email}</p>
						<p>Пол: {user.gender}</p>
						{
							user.socialNetwork && <p>Социальная сеть: {user.socialNetwork}</p>
						}
						{
							user.info && 	<p>Информация: {user.info}</p>
						}
					</div>
			}

		</ReadModal>
	)
})

export default Profile