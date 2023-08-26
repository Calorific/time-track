import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentProject, getCurrentProject, getUserProjects } from '../store/user'
import SelectField from '../components/common/form/selectField'
import ProjectInfo from '../components/mainPage/projectInfo'
import RecordTime from '../components/mainPage/recordTime'
import CreateRecord from '../components/mainPage/createRecord'

const MainPage = () => {
  const dispatch = useDispatch()
  const currentProject = useSelector(getCurrentProject())
  const projects = useSelector(getUserProjects())
  const options = projects.map(p => ({ value: p._id, label: p.title }))

  const [selectValue, setSelectValue] = useState(currentProject && { value: currentProject._id, label: currentProject.title })

  const handleChange = data => {
    dispatch(changeCurrentProject(data.value))
    setSelectValue(data)
  }

  
  if (!projects || !projects.length)
    return (
        <div className='h-full w-full flex justify-center items-start pb-5 mt-16'>
          <div className="flex flex-col min-w-[310px] max-w-[600px] sm:min-w-[600px] bg-white border
         shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] justify-center">
            <h2 className='text-xl'>Вы еще не создали ни одного проекта</h2>
          </div>
        </div>
    )

  return (
    <>
      <div className='h-full w-full flex justify-center items-start pb-5 mt-16'>
        <div className="flex flex-col min-w-[310px] max-w-[600px] sm:min-w-[600px] bg-white border
         shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] justify-center">
          <div className="flex justify-between bg-gray-100 border-b rounded-t-xl py-2 px-4 md:py-3 md:px-5 dark:bg-gray-800 dark:border-gray-700">
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500 align-middle">
              Текущий проект
            </p>
            <SelectField name='projectSelect' options={options} value={selectValue} onChange={handleChange}
               isSearchable={true} noOptionsMessage='Ничего не найдено' />
          </div>
          <ProjectInfo currentProject={currentProject} />
          <div className='px-4 md:px-5'><hr /></div>
          <RecordTime />
          <CreateRecord />
        </div>
      </div>
    </>
  )
}

export default MainPage