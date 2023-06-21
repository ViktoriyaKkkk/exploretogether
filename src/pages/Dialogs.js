import React, { useEffect, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { IoLogoOctocat } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { TbCat } from 'react-icons/tb'
import { IoClose, IoSendSharp } from 'react-icons/io5'
import { useAppContext } from '../context/AppContext'
import { clsx } from 'clsx'
import { useMessages } from '../utils/useMessages'
import { createMessages } from '../api/api.message'
import { HiUserGroup } from 'react-icons/hi'
import { useSearch } from '../utils/useSearch'
import { useUsers } from '../utils/useUsers'
import ReadModal from '../components/ReadModal'
import ModalLayout from '../components/ModalLayout'
import { createReports } from '../api/api.report'
import { useValidation } from '../utils/useValidation'
import Profile from '../components/Profile'
import { BsChatDots } from 'react-icons/bs'
import { FaRegListAlt } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Toaster } from 'react-hot-toast'

const Dialogs = observer(() => {
	const { userStore, AdminInstance } = useAppContext()
	useEffect(() => {
		if (Object.keys(userStore._user).length === 0) {
			navigate('/')
		}
	})
	let { id } = useParams()

	const [searches] = useSearch()
	searches.reverse()
	const chats = useMemo(() => searches?.filter(search => {
		let res = false
		search.owner === userStore._user.id ? res = true : search.participants.forEach((item) => {
			if (item === userStore._user.id) {
				res = true
			}
		})
		return res
	}), [searches, userStore])

	useMemo(() => {
		if (typeof id === 'undefined' && typeof chats !== 'undefined' && chats.length !== 0) {
			id = chats[0]._id
		}
	}, [chats])

	const navigate = useNavigate()
	if (id != null && id !== 'undefined') {
		useMessages(id)
	}

	const [currMessage, setCurrMessage] = useState('')

	const sendMessage = async () => {
		if (currMessage !== '') {
			const messageData = {
				searchId: id,
				author: userStore.user.id,
				message: currMessage,
				time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
			}
			userStore.setChat([...userStore.chat, messageData])
			await createMessages(messageData.searchId, messageData.author, messageData.message, messageData.time)
			await userStore.socket.emit('send_message', messageData)
		}
	}

	const location = useLocation()
	useEffect(() => {
		let newNotifications = []
		userStore.notifications.forEach((item) => {
			if (item.searchId !== location.pathname.split('/')[2]) {
				newNotifications = [...newNotifications, item]
			}
		})
		userStore.setNotifications(newNotifications)
	}, [location,userStore.chat])

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	})

	const [selectedChat, setSelectedChat] = useState({})
	useEffect(() => {
		if (typeof id !== 'undefined' && typeof chats !== 'undefined' && chats !== []) {
			setSelectedChat(chats?.find(search => {
				return search._id === id
			}))
		}
	}, [chats, id])

	const [users] = useUsers()
	const usersById = useMemo(() => {
		return users?.reduce((prev, curr) => {
			return { ...prev, [curr._id]: curr }
		}, {})
	}, [users])

	const [reportText, setReportText] = useState('')
	const [reportErr, validateReport] = useValidation(reportText, { isEmpty: true })
	const [bluredReport, setBluredReport] = useState(false)

	const [tab, setTab] = useState('chat')
	let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	if (((id !== 'undefined' && id !== null) && typeof selectedChat === 'undefined') || Object.keys(usersById).length === 0 || typeof chats === 'undefined'){
	return	<Layout>
			<div className='absolute w-full -z-20 h-full bg-black'>
			</div>
			<div
				className="absolute w-full -z-10 h-full [mask-image:linear-gradient(0deg,black,transparent)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
			</div>
			<div className='h-screen h-[calc(var(--vh, 1vh) * 100)] flex flex-col items-center'>
			</div>
		</Layout>
	} else if (  chats === [] || typeof selectedChat === 'undefined'
		) {
		return <Layout>
			<div className='absolute w-full -z-20 h-full bg-black'>
			</div>
			<div
				className="absolute w-full -z-10 h-full [mask-image:linear-gradient(0deg,black,transparent)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
			</div>
			<div className='h-screen h-[calc(var(--vh, 1vh) * 100)] flex flex-col items-center'>
				<h2 className='my-auto text-3xl text-light-gray text-center font-bold'>У вас пока нет начатых диалогов</h2>
			</div>
		</Layout>
	}

	return (
		<Layout>
			<Toaster/>
			{
				userStore.isProfile && <Profile />
			}
			{Object.keys(userStore.isReading).length !== 0 &&
				<ReadModal btn={'Пожаловаться на пользователя'} dis={false} func={() => {
					AdminInstance.setIsModal(!AdminInstance.isModal)
				}}>
					<div className='relative flex items-start text-center justify-center p-4 border-b rounded-t border-gray'>
						<h3 className='md:text-xl text-base mr-7 font-semibold text-white place-self-center'>
							Пользователь {userStore.isReading.name}
						</h3>
						<button type='button' onClick={() => {
							userStore.setIsReading({})
						}}
										className='absolute right-4 top-3 text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
										data-modal-hide='staticModal'>

							<IconContext.Provider value={{ size: '2em' }}><IoClose /></IconContext.Provider>
						</button>
					</div>
					<div className='md:text-xl text-sm px-6 py-4 space-y-2 text-white'>
						<p className='font-semibold'>Имя: {userStore.isReading.name}</p>
						<p className='font-semibold'>Пол: {userStore.isReading.gender}</p>
						<p className='font-semibold'>Социальная
							сеть: {userStore.isReading.socialNetwork}</p>
						<p
							className='font-semibold'>Информация: {userStore.isReading.info ? userStore.isReading.info : '-'}</p>
					</div>

				</ReadModal>}

			{/*Окно жалобы*/}

			<ModalLayout admin={false} func={() => {
				createReports(userStore.user.id, userStore.isReading._id, reportText).then(r => {
				})
				alert(`Вы пожаловались на пользователя ${userStore.isReading.name}`)
			}}>
				<div className='relative flex items-start justify-center p-4 border-b border-gray rounded-t'>
					<h3 className='md:text-xl text-lg mr-7 font-semibold text-white place-self-center'>
						Жалоба на пользователя {userStore.isReading.name}
					</h3>
					<button type='button' onClick={() => {
						AdminInstance.setIsModal(!AdminInstance._isModal)
					}}
									className='absolute right-4 top-3 text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
									data-modal-hide='staticModal'>
						<IconContext.Provider value={{ size: '2em' }}><IoClose /></IconContext.Provider>
					</button>
				</div>

				<div className='p-8 space-y-3'>
					<label htmlFor='report' className='inline md:text-xl text-base font-semibold text-white'>Опишите вашу
						жалобу: </label>
					<textarea cols='40' rows='3' id='report' name='report' placeholder='Введите текст жалобы'
										autoComplete='report'
										value={reportText} onChange={e => setReportText(e.target.value)}
										onBlur={e => {
											setBluredReport(true)
											validateReport()
										}}
										className='block w-full px-4 py-2 text-white bg-black font-semibold
								border border-gray rounded-md focus:border-dark-green focus:outline-none focus:ring-2 focus:ring-light-green'
										required />
					{
						reportErr && bluredReport && <p className='fixed bottom-24 text-red'>{reportErr}</p>
					}
				</div>
			</ModalLayout>

			<div className='absolute w-full -z-20 h-full bg-black'>
			</div>
			<div
				className="absolute w-full -z-10 h-full [mask-image:linear-gradient(0deg,black,transparent)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
			</div>
			<div className='fixed bottom-0 w-full -z-40 h-full bg-black'>
			</div>
			<div
				className="fixed bottom-0 w-full -z-30 h-full [mask-image:linear-gradient(0deg,transparent,black)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
			</div>

			<div className='absolute w-full -z-20 h-full bg-black'>
			</div>
			<div
				className="absolute w-full -z-10 h-full [mask-image:linear-gradient(0deg,black,transparent)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
			</div>
			<div className='flex flex-wrap h-screen place-content-center justify-items-center pt-10'>
				<div className='container h-full w-full flex flex-wrap items-center place-content-center shadow-lg rounded-lg'>

					{/*Chatting*/}

					<div
						className='relative md:pt-0 pt-24 flex md:flex-row md:h-2/3 h-5/6 w-full md:w-11/12 xl:w-2/3 rounded-lg bg-black shadow shadow-md drop-shadow-[0_0_35px_rgba(64,147,107,0.9)]'>
						{/*chat list*/}
						<div className='absolute md:hidden w-full top-0 h-24 flex flex-row place-content-between p-5 text-white border-b border-gray'>
							<IconContext.Provider value={{ size: '2em'}}>
								<button onClick={()=>setTab('dialogs')} className={clsx('p-2', tab === 'dialogs' && 'text-light-green')}>
									<FaRegListAlt/>
								</button>
								<button onClick={()=>setTab('chat')} className={clsx('p-2 font-bold relative', tab === 'chat' && 'text-light-green')}>
									<BsChatDots />
									{
										userStore.notifications.filter((item) => {
											return (location.pathname.split('/')[2] !== item.searchId)}).length !== 0 && <span
											className=" absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 md:w-3 md:h-3 ml-2 md:text-xs text-base font-semibold text-black bg-light-green
									rounded-full">{userStore.notifications.length}</span>
									}
								</button>
								<button onClick={()=>setTab('info')} className={clsx('p-2', tab === 'info' && 'text-light-green')}>
									<AiOutlineInfoCircle/>
								</button>
							</IconContext.Provider>
						</div>
						<div className={clsx('md:grid grid-cols-1 md:place-content-start place-content-center min-w-full md:min-w-fit ' +
							'md:border-r-2 border-gray overflow-y-auto', tab !== 'dialogs' && 'hidden')}>

							{chats &&
								chats?.map((chat) => {
									return <button key={chat._id} onClick={() => {
										navigate(`/dialogs/${chat._id}`)
										setTab('chat')
									}}
																 className={clsx('h-16 md:text-base flex flex-row md:justify-items-start w-full py-2 pl-5 pr-3 items-center',
																	 id === chat._id ? 'border-b-2 border-l-4 border-dark-green' : 'border-b border-gray')}>
										<div className='w-1/4 text-white relative'>
											{
												userStore.notifications.filter((item) => {
													return (item.searchId === chat._id && location.pathname.split('/')[2] !== item.searchId)}).length !== 0 && <span
													className=' absolute -top-1 -left-3 inline-flex items-center justify-center w-3 h-3 ml-2 text-xs
													font-semibold text-black bg-light-green rounded-full'>{userStore.notifications.filter((item) => {
													return item.searchId === chat._id
												}).length}</span>
											}
											<IconContext.Provider value={{ size: '2em', color: 'white' }}>
												<HiUserGroup />
											</IconContext.Provider>
										</div>
										<div className='w-fit'>
											<p className='ml-2 text-white md:text-base text-2xl text-start'>{chat.name}</p>
										</div>
									</button>
								})
							}

							{/*end user list */}
						</div>
						{/*end chat list*/}

						{/*message */}
						<div className={clsx('w-full px-5 flex flex-col content-between', tab !== 'chat' && 'hidden')}>
							<div
								className={clsx('scrollbar flex overflow-y-scroll h-5/6 flex-col mt-5', userStore.chat && userStore.chat?.length > 6 &&
									'scrollbar-thumb-light-gray scrollbar-track-gray scrollbar-thin')}>
								{ userStore.chat.filter((item)=>{
									return item.searchId === location.pathname.split('/')[2]
								}).length === 0 ? <h1 className='text-xl text-gray place-self-center'>Здесь пока нет сообщений</h1> :
									userStore.chat.map((message,i) => {
										if (location.pathname.split('/')[2] === message.searchId) {
											return <div ref={messagesEndRef} key={i}
																	className={clsx('flex mt-2', message.author === userStore.user.id ?
																		'justify-end' : 'justify-start')}>
												{
													message.author !== userStore.user.id &&
													<div className='relative'><IconContext.Provider value={{ size: '2em' }}>
														<button className='px-2.5 py-2.5 text-white' onClick={() => {
															userStore.setIsReading(usersById[message.author])
														}}><IoLogoOctocat />
														</button>
														<span className='absolute bottom-0 left-2.5 text-gray'>{message.time}</span>
													</IconContext.Provider></div>
												}
												<div className='relative text-white'>
												<span
													className={clsx('absolute top-2 font-bold', message.author === userStore.user.id ? ' right-0' : 'left-0')}>
													{usersById[message.author]['name']}</span>
													<div
														className={clsx('mt-10 py-2 px-3',
															message.author === userStore.user.id ? 'mr-2 bg-dark-green rounded-bl-3xl rounded-tl-3xl rounded-tr-xl' :
																'ml-2 bg-gray rounded-br-3xl rounded-tr-3xl rounded-tl-xl')}
													>
														{message.message}
													</div>
												</div>
												{
													message.author === userStore.user.id &&
													<div className='relative'><IconContext.Provider value={{ size: '2em' }}>
														<button className='px-2.5 py-2.5 text-white' onClick={() => {
															userStore.setIsProfile(true)
														}}><TbCat />
														</button>
														<span className='absolute bottom-0 right-2.5 text-gray'>{message.time}</span>
													</IconContext.Provider></div>
												}
											</div>
										}
									})
								}

							</div>
							<div className='relative h-20 py-5'>
								<IconContext.Provider value={{ size: '2em' }}>
									<button className='px-2.5 py-2.5 text-dark-green absolute right-0 top-3.5 z-10' onClick={() => {
										sendMessage().then(r => {})
										setCurrMessage('')
									}}><IoSendSharp />
									</button>
								</IconContext.Provider>
								<input value={currMessage} onChange={e => {
									setCurrMessage(e.target.value)
								}}
											 className='w-full h-full pl-3 pr-14 bg-white placeholder-gray rounded-xl'
											 type='text'
											 placeholder='Введите сообщение...'
								/>

							</div>
						</div>
						{/*end message*/}
						<div className={clsx('min-w-fit mx-auto md:block md:border-l-2 border-gray px-5', tab !== 'info' && 'hidden')}>
							<div className='flex flex-col text-white'>
								<div className='font-semibold text-3xl md:text-xl pt-4'>{selectedChat.name}</div>
								<div className='font-semibold md:text-base text-2xl pt-4'>Владелец: {selectedChat.owner === userStore.user.id ? 'Вы' :
									usersById[selectedChat.owner]['name']}</div>
								{
									selectedChat.participants?.length !== 0 && <div className='font-semibold md:text-base text-2xl pt-2'>Участники:</div>}
								{
									selectedChat.participants?.map((participant) => {
										return <span key={participant} onClick={() => {
											userStore.setIsReading(usersById[participant])
										}} className='cursor-pointer md:text-base text-2xl pl-8 pt-2'>
											{usersById[participant]['name']}</span>
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
})

export default Dialogs