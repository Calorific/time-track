import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getProjectsList } from '../store/projects'
import ProjectList from '../components/projectListPage/projectList'
import ProjectSearch from '../components/projectListPage/projectSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import SuccessButton from '../components/common/app/successButton'
import { orderBy } from '../utils/orderBy'



const ProjectListPage = () => {
  const itemsPerPage = 5

  const navigate = useNavigate()
  const { page: initialPage } = useParams()
  const projects = useSelector(getProjectsList())
  const [itemOffset, setItemOffset] = useState((+((initialPage - 1) || 0) * itemsPerPage) % projects.length)
  const [search, setSearch] = useState('')

  const paginationBaseClassName = 'text-gray-500 hover:text-blue-700 hover:bg-gray-200 py-1 px-2 inline-flex' +
      ' items-center transition-colors font-medium dark:hover:bg-gray-700 '

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % projects.length
    setItemOffset(newOffset)
    navigate(`/projects/${e.selected + 1}`)
  }

  const handleSearch = data => {
    setSearch(data)
    setItemOffset(0)
  }

  const endOffset = itemOffset + itemsPerPage
  const sortedProjects = orderBy(projects, 'createdAt', 'desc')
  const filteredProjects = search ? sortedProjects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : sortedProjects

  const currentItems = filteredProjects.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(filteredProjects.length / itemsPerPage)

  if (!projects.length)
    return <p className="text-base text-gray-900 dark:text-white mt-8 ml-8">
      У вас еще нет проектов. <NavLink to='/projects/create' className='text-blue-500'>Создать</NavLink>
    </p>

  if (!+initialPage || +initialPage < 0)
    return <Navigate to='/projects/1' />

  if (Math.ceil(projects.length / itemsPerPage) < +initialPage)
    return <Navigate to={'/projects/' + pageCount} />


  return (
    <div className='flex justify-center pt-5'>
      <div className='w-full sm:w-11/12 px-5 sm:px-0 flex justify-center flex-col'>
        <div className='flex gap-2 flex-wrap items-center pb-3'>
          <ProjectSearch value={search} onChange={handleSearch} className='w-52 sm:w-[315px]' placeholder='Поиск по названию' />
          <NavLink to='/projects/create'>
            <SuccessButton>
              <FontAwesomeIcon icon={faCirclePlus} /> <span className='hidden sm:inline-block'>Создать проект</span>
            </SuccessButton>
          </NavLink>
        </div>
        {filteredProjects.length ? <>
          <ProjectList projects={currentItems} />
          {pageCount > 1 && <ReactPaginate
              breakLabel="..."
              nextLabel="Вперед"
              onPageChange={handlePageClick}
              disableInitialCallback={true}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel="Назад"
              initialPage={+initialPage - 1 || 0}
              renderOnZeroPageCount={null}
              containerClassName="flex items-center justify-center space-x-2 mt-3"
              pageLinkClassName={paginationBaseClassName + 'rounded-sm'}
              previousLinkClassName={paginationBaseClassName + 'gap-2 rounded-md'}
              nextLinkClassName={paginationBaseClassName + 'gap-2 rounded-md'}
              activeLinkClassName="!text-blue-600"
          />}
        </> : <p className="text-base text-gray-900 dark:text-white mt-8 ml-8">
          По такому запросу ничего не найдено
        </p>}
      </div>
    </div>
  )
}

export default ProjectListPage