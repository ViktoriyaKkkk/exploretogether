import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useAppContext } from '../context/AppContext'
import { useTopics } from '../utils/useTopics'
import { useSections } from '../utils/useSections'
import { useLevels } from '../utils/useLevels'
import { useDurations } from '../utils/useDurations'
import { usePeriodicities } from '../utils/usePeriodicities'
import { useTimes } from '../utils/useTimes'
import { useFormats } from '../utils/useFormat'
import { useCities } from '../utils/useCities'
import { useAges } from '../utils/useAges'
import { createSearch } from '../api/api.search'
import { useValidation } from '../utils/useValidation'
import { readCities } from '../api/api.city'
import { clsx } from 'clsx'
import { useSearch } from '../utils/useSearch'
import * as mobx from 'mobx'
import { useLocation } from 'react-router-dom'
import Toast from './Toast'
import { Toaster } from 'react-hot-toast'


const Main = observer(() => {

	const { userStore } = useAppContext()

	const [searchName, setSearchName] = useState('')
	const [nameErr, validateName] = useValidation(searchName, { isEmpty: true })
	const [bluredName, setBluredName] = useState(false)

	const [topics, errorTopic] = useTopics()
	topics.sort((a, b) => {
		return a.name.localeCompare(b.name); // по алфавиту (по возрастанию)
	})
	const [selectedTopic, setSelectedTopic] = useState(0)
	const [topicErr, validateTopic] = useValidation(selectedTopic, { isZero: true })
	const [bluredTopic, setBluredTopic] = useState(false)

	const [sections, errorSection] = useSections()
	sections.sort((a, b) => {
		return a.name.localeCompare(b.name); // по алфавиту (по возрастанию)
	})
	const bundlOfSections = useMemo(() => {
		if (selectedTopic !== 0) {
			return sections.filter((section) => {
				return section.topicId === selectedTopic
			})
		}
		return sections
	}, [selectedTopic, sections])
	const [selectedSection, setSelectedSection] = useState(0)
	const [sectionErr, validateSection] = useValidation(selectedSection, { isZero: true })
	const [bluredSection, setBluredSection] = useState(false)

	const [levels, errorLevel] = useLevels()
	const bundlOfLevels = useMemo(() => {
		if (selectedSection !== 0) {
			return levels.filter((level) => {
				return level.sectionId === selectedSection
			})
		}
		return levels
	}, [selectedSection, levels])
	const [selectedLevel, setSelectedLevel] = useState(0)
	const [levelErr, validateLevel] = useValidation(selectedLevel, { isZero: true })
	const [bluredLevel, setBluredLevel] = useState(false)

	const [selectedDuration, setSelectedDuration] = useState(0)
	const [durations, errorDuration] = useDurations()
	const [durationErr, validateDuration] = useValidation(selectedDuration, { isZero: true })
	const [bluredDuration, setBluredDuration] = useState(false)

	const [periodicities, errorPeriodicity] = usePeriodicities()
	const [selectedPeriodicity, setSelectedPeriodicity] = useState(0)
	const [periodicityErr, validatePeriodicity] = useValidation(selectedPeriodicity, { isZero: true })
	const [bluredPeriodicity, setBluredPeriodicity] = useState(false)

	const [times, errorTime] = useTimes()
	const [selectedTime, setSelectedTime] = useState(0)
	const [timeErr, validateTime] = useValidation(selectedTime, { isZero: true })
	const [bluredTime, setBluredTime] = useState(false)

	const [formats, errorFormat] = useFormats()
	const [selectedFormat, setSelectedFormat] = useState(0)
	const [formatErr, validateFormat] = useValidation(selectedFormat, { isZero: true })
	const [bluredFormat, setBluredFormat] = useState(false)

	const [cities, errorCity] = useCities()
	const citiesByName = useMemo(() => {
		return cities?.reduce((prev, curr) => {
			return { ...prev, [curr.name]: curr._id }
		}, {})
	}, [cities])

	const [selectedCity, setSelectedCity] = useState(0)
	let [cityErr, validateCity] = useValidation(selectedCity, { isZero: true })
	const [bluredCity, setBluredCity] = useState(false)

	useEffect(() => {
		if (selectedFormat !== '641e114f2945eabd89d70189' && bluredFormat) {
			setSelectedCity(0)
		}
	}, [selectedFormat, bluredFormat])

	const [selectedNumberOfPeople, setSelectedNumberOFPeople] = useState(' ')

	const [selectedParticipantsGender, setSelectedParticipantsGender] = useState('')

	const [ages, errorAge] = useAges()
	const [selectedAges, setSelectedAges] = useState(0)
	const [ageErr, validateAge] = useValidation(selectedAges, { isZero: true })
	const [bluredAge, setBluredAge] = useState(false)

	const startSearch = () => {
		let params = [searchName, selectedLevel, selectedDuration, selectedPeriodicity, selectedTime, selectedFormat, selectedAges, selectedCity, selectedNumberOfPeople]
		// if (selectedCity!==0) {
		// 	params = [...params, selectedCity]
		// }
		// if (selectedNumberOfPeople!=='') {
		// 	params = [...params, selectedNumberOfPeople]
		// }
		if (selectedParticipantsGender === '') {
			params = [...params, 'Любой']
		} else {
			params = [...params, selectedParticipantsGender]
		}
		// console.log(...params)
		createSearch(...params).then((data) => Toast('ok','Внимание!', data))
		// console.log(params)
	}

	useMemo(() => {
		if (Object.keys(citiesByName) !== 0 && localStorage.getItem('city') && selectedFormat === '641e114f2945eabd89d70189') {
			setSelectedCity(citiesByName[localStorage.getItem('city')])
			// console.log(citiesByName[localStorage.getItem('city')])
			// console.log(selectedCity)
		} else {
			// console.log('name',citiesByName)
		}
	}, [citiesByName, selectedFormat])

	const [searches, err, load] = useSearch()
	const chats = useMemo(() => searches?.filter(search => {
		let res = false
		search.owner === userStore._user.id ? res = true : search.participants.forEach((item) => {
			if (item === userStore._user.id) {
				res = true
			}
		})
		return res
	}), [searches, userStore])

	useEffect(()=>chats?.forEach((item)=>{
		userStore.socket.emit('join_room', item._id)
		console.log('joined ', item._id)
	}),[chats,userStore])

	const location = useLocation()
	useEffect(() => {
		userStore.socket.on('receive_message', (data) => {
			userStore.setChat([...userStore.chat, data])

			if (data.searchId !== location.pathname.split('/')[2]) {
				userStore.setNotifications([...userStore.notifications, data])
				console.log('zzzzzzzzzz', mobx.toJS(userStore.notifications))
			}
		})
	}, [userStore.socket])

	return (<>
			<Toaster/>
			<div className="absolute w-full -z-20 h-screen bg-black">
			</div>
			<div className="absolute w-full -z-10 h-screen [mask-image:linear-gradient(0deg,black,transparent)] bg-repeat bg-[url('../../public/img/bggrid2.svg')] ">
			</div>
			<div
				className="flex h-screen pt-12 flex-wrap align-middle overflow-y-scroll">
				<section className='max-w-4xl sm:w-fit w-2/3 self-center py-3 px-6 xl:p-6 my-5 md:my-auto mx-auto rounded-md shadow-md bg-black
				drop-shadow-[0_0_25px_rgba(64,147,107,0.9)]'>
					<h2 className='block text-center font-bold text-xl xl:text-2xl text-white'>Создание запроса на поиск
						партнеров</h2>
					<form>
						<div className='grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2'>
							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl' htmlFor='username'>Название запроса</label>
								<input value={searchName} onChange={e => setSearchName(e.target.value)}
											 onBlur={e => {
												 setBluredName(true)
												 validateName()
											 }}
											 placeholder={'Название запроса на поиск'}
											 id='name' type='text'
											 className={clsx('placeholder-light-gray text-sm block w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
												 'border-gray rounded-md focus:ring-2 focus:ring-light-green focus:outline-none', nameErr && bluredName &&
												 'ring-2 border-none ring-red focus:ring-red')} />
								{
									nameErr && bluredName && <p className='absolute -bottom-5 text-red text-sm'>{nameErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl' htmlFor='passwordConfirmation'>Тематика</label>
								<select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}
												onBlur={e => {
													setBluredTopic(true)
													validateTopic()
												}}
												className={clsx('block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', topicErr && bluredTopic && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите тему</option>
									{
										topics.map((topic) => {
											return <option value={topic._id} key={topic._id}>{topic.name}</option>
										})
									}
								</select>
								{
									topicErr && bluredTopic && <p className='absolute text-red text-sm'>{topicErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl'
											 htmlFor='passwordConfirmation'>Раздел</label>
								<select disabled={!selectedTopic} value={selectedSection}
												onChange={(e) => setSelectedSection(e.target.value)}
												onBlur={e => {
													setBluredSection(true)
													validateSection()
												}}
												className={clsx('block text-sm disabled:cursor-not-allowed  disabled:text-gray w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', sectionErr && bluredSection && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value='0'>Выберите раздел</option>
									{
										bundlOfSections?.map((section) => {
											return <option value={section._id} key={section._id}>{section.name}</option>
										})
									}
								</select>
								{
									sectionErr && bluredSection && <p className='absolute -bottom-5 text-red text-sm'>{sectionErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl' htmlFor='passwordConfirmation'>Уровень</label>
								<select disabled={!selectedSection} value={selectedLevel}
												onChange={(e) => setSelectedLevel(e.target.value)}
												onBlur={e => {
													setBluredLevel(true)
													validateLevel()
												}}
												className={clsx('block text-sm disabled:cursor-not-allowed disabled:text-gray w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', levelErr && bluredLevel && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите уровень</option>
									{
										bundlOfLevels?.map((level) => {
											return <option value={level._id} key={level._id}>{level.name}</option>
										})
									}
								</select>
								{
									levelErr && bluredLevel && <p className='absolute -bottom-5 text-red text-sm'>{levelErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl'
											 htmlFor='passwordConfirmation'>Длительность совместного
									обучения</label>
								<select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}
												onBlur={e => {
													setBluredDuration(true)
													validateDuration()
												}}
												className={clsx('block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', durationErr && bluredDuration && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите длительность</option>
									{
										durations?.map((duration) => {
											return <option value={duration._id} key={duration._id}>{duration.name}</option>
										})
									}
								</select>
								{
									durationErr && bluredDuration && <p className='absolute -bottom-5 text-red text-sm'>{durationErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl'
											 htmlFor='passwordConfirmation'>Частота встреч</label>
								<select value={selectedPeriodicity} onChange={(e) => setSelectedPeriodicity(e.target.value)}
												onBlur={e => {
													setBluredPeriodicity(true)
													validatePeriodicity()
												}}
												className={clsx('block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', periodicityErr && bluredPeriodicity && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите частоту</option>
									{
										periodicities?.map((item) => {
											return <option value={item._id} key={item._id}>{item.name}</option>
										})
									}
								</select>
								{
									periodicityErr && bluredPeriodicity && <p className='absolute -bottom-5 text-red text-sm'>{periodicityErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl'
											 htmlFor='passwordConfirmation'>Количество часов в
									день</label>
								<select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
												onBlur={e => {
													setBluredTime(true)
													validateTime()
												}}
												className={clsx('block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', timeErr && bluredTime && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите количество времени</option>
									{
										times?.map((item) => {
											return <option value={item._id} key={item._id}>{item.name}</option>
										})
									}
								</select>
								{
									timeErr && bluredTime && <p className='absolute -bottom-5 text-red text-sm'>{timeErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl'
											 htmlFor='passwordConfirmation'>Формат совместного
									обучения</label>
								<select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}
												onBlur={e => {
													setBluredFormat(true)
													validateFormat()
												}}
												className={clsx('block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', formatErr && bluredFormat && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите формат</option>
									{
										formats?.map((item) => {
											return <option value={item._id} key={item._id}>{item.name}</option>
										})
									}
								</select>
								{
									formatErr && bluredFormat && <p className='absolute -bottom-5 text-red text-sm'>{formatErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white' htmlFor='passwordConfirmation'>Город</label>
								<select disabled={selectedFormat !== '641e114f2945eabd89d70189'} value={selectedCity}
												onChange={(e) => setSelectedCity(e.target.value)}
												onBlur={e => {
													setBluredCity(true)
													validateCity()
												}}
												className={clsx('block text-sm disabled:cursor-not-allowed disabled:text-gray w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none', cityErr && bluredCity && selectedFormat === '641e114f2945eabd89d70189'
													&& 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите город</option>
									{
										cities?.map((item) => {
											return <option value={item._id} key={item._id}>{item.name}</option>
										})
									}
								</select>
								{
									cityErr && bluredCity && selectedFormat === '641e114f2945eabd89d70189' &&
									<p className='absolute -bottom-5 text-red text-sm'>{cityErr}</p>
								}
							</div>

							<div className='relative'>
								<label className='block text-white' htmlFor='passwordConfirmation'>Число участников
									совместного обучения</label>
								<select value={selectedNumberOfPeople} onChange={(e) => setSelectedNumberOFPeople(e.target.value)}
												className='block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border border-gray rounded-md
											focus:border-dark-green focus:shadow-light-green focus:ring-2 focus:ring-light-green focus:outline-none'>
									<option value={' '}>Выберите число людей</option>
									<option value={1}>1</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
									<option value={4}>4</option>
									<option value={5}>5</option>
									<option value={6}>6</option>
									<option value={0}>Без ограничений</option>
								</select>
							</div>

							<div className='relative'>
								<label className='block text-white' htmlFor='passwordConfirmation'>Пол
									участников</label>
								<select value={selectedParticipantsGender}
												onChange={(e) => setSelectedParticipantsGender(e.target.value)}
												className='block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border border-gray rounded-md
											focus:border-dark-green focus:shadow-light-green focus:ring-2 focus:ring-light-green focus:outline-none'>
									<option value={''}>Выберите пол участников</option>
									<option value={'Жен'}>Женский</option>
									<option value={'Муж'}>Мужской</option>
									<option value={'Любой'}>Не имеет значения</option>
								</select>
							</div>

							<div className='relative'>
								<label className='block text-white after:content-["*"] after:absolute after:ml-0.5 after:text-light-green after:text-xl mr-5'
											 htmlFor='passwordConfirmation'>Возрастной
									диапазон участников</label>
								<select value={selectedAges} onChange={(e) => setSelectedAges(e.target.value)}
												onBlur={e => {
													setBluredAge(true)
													validateAge()
												}}
												className={clsx('block text-sm w-full px-4 py-1.5 mt-2 text-white bg-black border ' +
													'border-gray rounded-md focus:border-dark-green focus:shadow-light-green focus:ring-2 ' +
													'focus:ring-light-green focus:outline-none ', ageErr && bluredAge && 'border-none ring-2 ring-red focus:ring-red')}>
									<option disabled={true} value={0}>Выберите возрастной диапазон</option>
									{
										ages?.map((item) => {
											return <option value={item._id} key={item._id}>{item.name}</option>
										})
									}
								</select>
								{
									ageErr && bluredAge && <p className='absolute -bottom-5 text-red'>{ageErr}</p>
								}
							</div>

						</div>

						<div className='flex justify-center mt-3 xl:mt-6'>
							<button onClick={startSearch} type='button'
											disabled={nameErr || topicErr || sectionErr || levelErr || durationErr
												|| periodicityErr || timeErr || formatErr || (cityErr && selectedFormat === '641e114f2945eabd89d70189') || ageErr}
											className='px-6 text-sm disabled:cursor-not-allowed uppercase py-2 leading-5 text-white transition-colors duration-200 transform bg-dark-green rounded-md
							hover:bg-light-green focus:outline-none'>Начать поиск
							</button>
						</div>
					</form>
				</section>
			</div>
		</>
	)
})

export default Main