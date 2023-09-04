import React from 'react'
import ProjectInfo from '../components/common/app/projectInfo'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject, getProject } from '../store/projects'
import { getProjectRecords } from '../store/records'
import Record from '../components/projectDetailsPage/record'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoBackButton from '../components/common/app/goBackButton'
import Button from '../components/common/app/button'

const ProjectDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const project = useSelector(getProject(id))
  const records = useSelector(getProjectRecords(id))

  const handleDelete = () => {
    dispatch(deleteProject(id))
    navigate('/')
  }

  return (
    <div className='flex justify-center h-full w-full p-2 sm:p-5'>
      <div className='max-w-[calc(750px+1rem)] relative'>
        <div className='max-w-[400px]'>
          <ProjectInfo project={project} alwaysShow={true} />
        </div>
        {records ? <div className="flex flex-wrap gap-2">
          {records.map(r => <Record record={r} projectId={id} key={r._id} />)}
        </div> : <p className="mt-2 text-gray-800 dark:text-gray-400">Вы еще не добавили ни одной записи</p>}
        <div className='mt-4 pb-2'>
          <Button type='button' bgColor='bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' text='Удалить' onClick={handleDelete} />
          <GoBackButton />
        </div>
        <NavLink to={`/projects/${id}/edit`}>
          <FontAwesomeIcon icon={faPen} className='absolute top-2 right-1 sm:top-3 cursor-pointer text-emerald-500' />
        </NavLink>
      </div>
    </div>
  )
}

export default ProjectDetailsPage