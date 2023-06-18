import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

import Layout from '../components/Layout'

import DeleteModal from '../components/DeleteModal'

import Sidebar from '../components/Sidebar'
import UpdateMiddle from '../components/UpdateMiddle'
import { createSections, deleteSections, updateSections } from '../api/api.section'
import { useTopics } from '../utils/useTopics'
import { useSections } from '../utils/useSections'
import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IconContext } from 'react-icons'
import CreateMiddle from '../components/CreateMiddle'
import { Pagination } from '../components/Pagination'

const Section = observer(() => {

	const navigate = useNavigate()
	const { userStore } = useAppContext()
	useEffect(() => {
		if (Object.keys(userStore._user).length === 0 || userStore._user.role === '641e18b855a5d5389d78aba7') {
			navigate('/')
		}
	})

	const { AdminInstance } = useAppContext()

	const [sections, error, load] = useSections()
	const sectionsById = useMemo(() => {
		return sections?.reduce((prev, curr) => {
			return { ...prev, [curr._id]: curr }
		}, {})
	}, [sections])

	const [topics] = useTopics()

	const PageSize = 10;
	const lastPage = useMemo(()=>Math.ceil(sections.length / PageSize), [sections, PageSize]);

	const [currentPage, setCurrentPage] = useState(1);

	const currentSections = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize; //индекс первого элемента на странице
		const lastPageIndex = firstPageIndex + PageSize; //индекс последнего элемента(не выводится)
		return sections?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, sections]);

	return (
		<Layout>
			{
				AdminInstance._isEditing !== '' &&
				<UpdateMiddle document={'Sections'} records={sectionsById} load={load} dependencies={topics}
											dependName={'topicId'} updateFunc={updateSections} />
			}
			{
				AdminInstance._isDeleting !== '' &&
				<DeleteModal document={'Sections'} load={load} deleteFunc={deleteSections} />
			}
			{
				AdminInstance._isCreating &&
				<CreateMiddle document={'Sections'} dependencies={topics} dependName={'topicId'} load={load}
											createFunc={createSections} />
			}
			<Sidebar />
			<div className='pt-14 ml-48'>
				<button onClick={() => {
					AdminInstance.setIsModal(false)
					AdminInstance.setIsCreating(true)
				}}
								className='my-3 p-4 disabled:cursor-not-allowed leading-5 text-white transition-colors duration-200 transform bg-dark-green rounded-md
							hover:bg-light-green focus:outline-none'
								data-modal-target='staticModal' data-modal-toggle='staticModal'>Добавить запись
				</button>
				<div className='relative mt-3 mr-5 overflow-x-auto shadow-md sm:rounded-lg'>

					<table className='w-full text-sm text-left text-white'>
						<thead className='text-xs text-white uppercase bg-black bg-opacity-90'>
						<tr>
							<th scope='col' className='px-6 py-1.5'>
								Section id
							</th>
							<th scope='col' className='px-3 py-1.5'>
								Topic id
							</th>
							<th scope='col' className='px-3 py-1.5'>
								Section name
							</th>
							<th scope='col' className='px-3 py-1.5'>
								Action
							</th>
						</tr>
						</thead>
						<tbody>
						{
							currentSections.map((item) => {
								return <tr key={item._id} className='border-b border-gray bg-black'>
									<th scope='row' className='px-6 py-1 font-medium text-white whitespace-nowrap'>
										{item._id}
									</th>
									<td className='px-3 py-1'>
										{item.topicId}
									</td>
									<td className='px-3 py-1'>
										{item.name}
									</td>
									<td className='pr-3 py-1 text-light-gray'>
										<IconContext.Provider value={{ size: '1.5em' }}>
											<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
												AdminInstance.setIsModal(false)
												AdminInstance.setIsEditing(item._id)
											}}><BiEdit />
											</button>
											<button className='px-2.5 py-2.5 hover:bg-gray hover:text-white rounded-md' onClick={() => {
												AdminInstance.setIsModal(false)
												AdminInstance.setIsDeleting(item._id)
											}}><RiDeleteBin5Line />
											</button>
										</IconContext.Provider>
									</td>
								</tr>
							})
						}
						</tbody>
					</table>
				</div>
				<Pagination currentPage={currentPage} lastPage={lastPage} pageSize={PageSize} totalCount={sections.length} onPageChange={page => setCurrentPage(page)}/>
			</div>
		</Layout>

	)
})

export default Section