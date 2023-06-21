import React, { useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useAppContext } from '../context/AppContext'
import ModalLayout from './ModalLayout'
import { IconContext } from 'react-icons'
import { IoClose } from 'react-icons/io5'
import { useUsers } from '../utils/useUsers'
import { useLevels } from '../utils/useLevels'
import { useDurations } from '../utils/useDurations'
import { usePeriodicities } from '../utils/usePeriodicities'
import { useTimes } from '../utils/useTimes'
import { useFormats } from '../utils/useFormat'
import { useCities } from '../utils/useCities'
import { useAges } from '../utils/useAges'

const UpdateSearch = observer(({document, records, load, updateFunc}) => {

	const { AdminInstance } = useAppContext()
	const [selectedName,setSelectedName] = useState(records[AdminInstance._isEditing]['name'])

	const [selectedOwner,setSelectedOwner] = useState(records[AdminInstance._isEditing]['owner'])
	const [owners] = useUsers()

	const [selectedLevel,setSelectedLevel] = useState(records[AdminInstance._isEditing]['level'])
	const [levels] = useLevels()
	const levelsById = useMemo(()=>{
		return levels?.reduce((prev, curr)=>{
			return {...prev, [curr._id]:curr}
		}, {})
	}, [levels])
	const bundlOfLevels = useMemo(() => {
			return levels.filter((level) => {
				return level.sectionId === levelsById[selectedLevel]['sectionId']
			})
	}, [levels])

	const [selectedDuration,setSelectedDuration] = useState(records[AdminInstance._isEditing]['duration'])
	const [durations] = useDurations()

	const [periodicities] = usePeriodicities()
	const [selectedPeriodicity, setSelectedPeriodicity] = useState(records[AdminInstance._isEditing]['periodicity'])

	const [times] = useTimes()
	const [selectedTime, setSelectedTime] = useState(records[AdminInstance._isEditing]['time'])

	const [formats] = useFormats()
	const [selectedFormat, setSelectedFormat] = useState(records[AdminInstance._isEditing]['format'])

	const [cities] = useCities()
	const [selectedCity, setSelectedCity] =useState(records[AdminInstance._isEditing]['city'])

	const [selectedNumberOfPeople, setSelectedNumberOFPeople] = useState(records[AdminInstance._isEditing]['numberOfPeople'])

	const [selectedParticipantsGender, setSelectedParticipantsGender] = useState(records[AdminInstance._isEditing]['participantsGender'])

	const [selectedSearchGender, setSelectedSearchGender] = useState(records[AdminInstance._isEditing]['searchGender'])

	const [ages] = useAges()
	const [selectedAge, setSelectedAge] = useState(records[AdminInstance._isEditing]['age'])

	const [selectedMarker, setSelectedMarker] = useState(records[AdminInstance._isEditing]['marker'])

	return (
		<ModalLayout admin={true} func={()=> {
			updateFunc(AdminInstance._isEditing, selectedMarker, selectedName, selectedOwner, selectedLevel, selectedDuration, selectedPeriodicity, selectedTime,
				selectedFormat, selectedAge, selectedParticipantsGender, selectedSearchGender, selectedCity, selectedNumberOfPeople).then(r=> {
				load()
			})
			AdminInstance.setIsEditing('')
		}}>
			<div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
				<h3 className='text-xl font-semibold text-white'>
					Редактирование записи из документа {document} с id={AdminInstance._isEditing}
				</h3>
				<button type='button' onClick={() => {
					AdminInstance.setIsModal(!AdminInstance._isModal)
					AdminInstance.setIsEditing('')
				}}
								className='text-white bg-transparent hover:bg-gray hover:text-dark-white rounded-lg text-sm
								 p-1.5 ml-auto inline-flex items-center'
								data-modal-hide='staticModal'>

					<IconContext.Provider value={{ size: '2em'}}><IoClose/></IconContext.Provider>
				</button>
			</div>

			<form>
				<div className='grid mx-5 mb-5 grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
					<div>
						<label className='text-white' htmlFor='username'>Name: </label>
						<input value={selectedName} onChange={e=>setSelectedName(e.target.value)} placeholder={'Название за8проса на поиск'}
									 id='name' type='text' className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green' />
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>Level: </label>
						<select value={selectedLevel}
										onChange={(e) => setSelectedLevel(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={0}>Выберите уровень</option>
							{
								bundlOfLevels?.map((level) => {
									return <option value={level._id} key={level._id}>{level.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>Duration: </label>
						<select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={0}>Выберите длительность</option>
							{
								durations?.map((duration) => {
									return <option value={duration._id} key={duration._id}>{duration.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>Periodicity: </label>
						<select value={selectedPeriodicity} onChange={(e) => setSelectedPeriodicity(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={0}>Выберите частоту</option>
							{
								periodicities?.map((item) => {
									return <option value={item._id} key={item._id}>{item.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>Time: </label>
						<select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={0}>Выберите количество времени</option>
							{
								times?.map((item) => {
									return <option value={item._id} key={item._id}>{item.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>Format: </label>
						<select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={0}>Выберите формат</option>
							{
								formats?.map((item) => {
									return <option value={item._id} key={item._id}>{item.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>City: </label>
						<select disabled={selectedFormat!=='641e114f2945eabd89d70189'} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={0}>Выберите город</option>
							{
								cities?.map((item) => {
									return <option value={item._id} key={item._id}>{item.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>NumberOfPeople: </label>
						<select value={selectedNumberOfPeople} onChange={(e) => setSelectedNumberOFPeople(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={''}>Выберите число людей</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
							<option value={5}>5</option>
							<option value={6}>6</option>
							<option value={0}>Без ограничений</option>
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>ParticipantsGender: </label>
						<select value={selectedParticipantsGender} onChange={(e) => setSelectedParticipantsGender(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={''}>Выберите пол участников</option>
							<option value={'Жен'}>Женский</option>
							<option value={'Муж'}>Мужской</option>
							<option value={'Любой'}>Не имеет значения</option>
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>SearchGender: </label>
						<select value={selectedSearchGender} onChange={(e) => setSelectedSearchGender(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={''}>Выберите пол участников</option>
							<option value={'Жен'}>Женский</option>
							<option value={'Муж'}>Мужской</option>
							<option value={'Любой'}>Не имеет значения</option>
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>Age: </label>
						<select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={0}>Выберите возрастной диапазон</option>
							{
								ages?.map((item) => {
									return <option value={item._id} key={item._id}>{item.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label className='text-white' htmlFor='passwordConfirmation'>Marker: </label>
						<select value={selectedMarker} onChange={(e) => setSelectedMarker(e.target.value)}
										className='block w-full px-4 py-2 mt-2 rounded-md focus:outline-none placeholder-light-gray
									 text-white bg-black border border-gray focus:ring-2 focus:ring-light-green'>
							<option value={true}>True</option>
							<option value={false}>False</option>
						</select>
					</div>

				</div>
			</form>
		</ModalLayout>
	)
})

export default UpdateSearch