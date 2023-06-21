import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Layout from '../components/Layout'
import DeleteModal from '../components/DeleteModal'
import Sidebar from '../components/Sidebar'
import { useSearch } from '../utils/useSearch'
import { deleteSearches, updateSearches } from '../api/api.search'
import UpdateSearch from '../components/UpdateSearch'
import { Pagination } from '../components/Pagination'

const Search = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(()=>{
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate("/")
		}})

	const {AdminInstance} = useAppContext()

	const [searches, error, load] = useSearch()
	const searchesById = useMemo(()=>{
		return searches?.reduce((prev, curr)=>{
			return {...prev, [curr._id]:curr}
		}, {})
	}, [searches])

	const PageSize = 16;
	const lastPage = useMemo(()=>Math.ceil(searches.length / PageSize), [searches, PageSize]);

	const [currentPage, setCurrentPage] = useState(1);

	const currentSearches = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize; //индекс первого элемента на странице
		const lastPageIndex = firstPageIndex + PageSize; //индекс последнего элемента(не выводится)
		return searches?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, searches]);
	return (
		<Layout>
			{
				AdminInstance._isEditing !== '' && <UpdateSearch document={'Searches'} records={searchesById} load={load} updateFunc={updateSearches}/>
			}
			{
				AdminInstance._isDeleting!=='' && <DeleteModal document={'Searches'} load={load} deleteFunc={deleteSearches}/>
			}
			<Sidebar />
			<div className='flex flex-wrap ml-48 mt-16 place-content-center'>
			{
				currentSearches?.map((item)=>{
					return 			<div key={item._id}
						className="flex flex-col text-white place-content-between basis-2/7 mr-5 mb-5 p-6 border border-gray rounded-lg shadow bg-black">
						<div>
							<h5 className="mb-2 text-xl font-bold tracking-tight">{item._id}</h5>
							<p className="mb-2 font-normal">Name: {item.name}</p>
							<p className="mb-2 font-normal">Owner: {item.owner}</p>
							<p className="mb-2 font-normal">Level: {item.level}</p>
							<p className="mb-2 font-normal">Duration: {item.duration}</p>
							<p className="mb-2 font-normal">Periodicity: {item.periodicity}</p>
							<p className="mb-2 font-normal">Time: {item.time}</p>
							<p className="mb-2 font-normal">Format: {item.format}</p>
							<p className="mb-2 font-normal">City: {item.city ? item.city : '-'}</p>
							<p className="mb-2 font-normal">NumberOfPeople: {item.numberOfPeople ? item.numberOfPeople : '-'}</p>
							<p className="mb-2 font-normal">ParticipantsGender: {item.participantsGender}</p>
							<p className="mb-2 font-normal">SearchGender: {item.searchGender}</p>
							<p className="mb-2 font-normal">Age: {item.age}</p>
							<p className="mb-2 font-normal">Participants:</p> {item.participants.map((participant)=>{
							return <p key={participant} className="mb-2 ml-5 font-normal">{participant}</p>
						})}
							<p className="font-normal">Marker: {`${item.marker}`}</p>
						</div>
						<div className={'flex flex-wrap place-content-between'}>
						<button onClick={()=>{
							AdminInstance.setIsModal(false)
							AdminInstance.setIsEditing(item._id)
						}}
										className='my-5 w-full text-white rounded-lgsm px-5 py-2.5 text-center transition-colors
							duration-200 transform bg-dark-green rounded-md hover:bg-light-green focus:outline-none'
										data-modal-target="staticModal" data-modal-toggle="staticModal" >Редактировать
						</button>

						<button onClick={()=>{
							AdminInstance.setIsModal(false)
							AdminInstance.setIsDeleting(item._id)
						}}
										className='w-full text-white rounded-lg px-5 py-2.5 text-center transition-colors
							duration-200 transform bg-dark-green rounded-md hover:bg-light-green focus:outline-none'
										data-modal-target="staticModal" data-modal-toggle="staticModal" >Удалить
						</button></div>
					</div>
				})
			}
				<Pagination currentPage={currentPage} lastPage={lastPage} pageSize={PageSize} totalCount={searches.length} onPageChange={page => setCurrentPage(page)}/>
		</div>
		</Layout>

	)
})

export default Search