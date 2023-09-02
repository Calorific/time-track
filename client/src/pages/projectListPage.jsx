import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getProjectsList } from '../store/projects'
import ProjectList from '../components/projectListPage/projectList'
import ProjectSearch from '../components/projectListPage/projectSearch'
import Button from '../components/common/app/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'



const ProjectListPage = () => {
  const navigate = useNavigate()
  const { page: initialPage } = useParams()
  const projects = useSelector(getProjectsList())
  const [itemOffset, setItemOffset] = useState(0)
  const [search, setSearch] = useState('')
  const paginationBaseClasses = 'text-gray-500 hover:text-blue-700 hover:bg-gray-200 py-1 px-2 inline-flex items-center transition-colors font-medium '

  const itemsPerPage = 5

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
  const filteredProjects = search ? projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : projects

  const currentItems = filteredProjects.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(filteredProjects.length / itemsPerPage)

  if (!projects.length)
    return <p className="text-base text-gray-900 dark:text-white mt-8 ml-8">
      У вас еще нет проектов. <NavLink to='/projects/create' className='text-blue-500'>Создать</NavLink>
    </p>

  if (+initialPage < 0)
    return <Navigate to='/projects/' />

  if (Math.ceil(projects.length / itemsPerPage) < +initialPage)
    return <Navigate to={'/projects/' + pageCount} />


  return (
    <div className='flex justify-center pt-5'>
      <div className='w-full sm:w-11/12 flex justify-center flex-col'>
        <div className='flex gap-2 items-center pb-3'>
          <ProjectSearch value={search} onChange={handleSearch} />
          <NavLink to='/projects/create'>
            <Button bgColor='hidden sm:inline-block bg-green-500 hover:bg-green-700'>
              <FontAwesomeIcon icon={faCirclePlus} /> Создать проект
            </Button>
            <Button bgColor='inline-block sm:hidden bg-green-500 hover:bg-green-700'>
              <FontAwesomeIcon icon={faCirclePlus} />
            </Button>
          </NavLink>
        </div>
        {filteredProjects.length ? <>
          <ProjectList projects={currentItems} />
          <ReactPaginate
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
              pageLinkClassName={paginationBaseClasses + 'rounded-sm'}
              previousLinkClassName={paginationBaseClasses + 'gap-2 rounded-md'}
              nextLinkClassName={paginationBaseClasses + 'gap-2 rounded-md'}
              activeLinkClassName="!text-blue-600"
          />
        </> : <p className="text-base text-gray-900 dark:text-white mt-8 ml-8">
          По такому запросу ничего не найдено
        </p>}
      </div>
    </div>
  )
}

export default ProjectListPage