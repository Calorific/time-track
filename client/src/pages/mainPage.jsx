import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentProject, getCurrentProjectId } from '../store/user'
import SelectField from '../components/common/form/selectField'
import ProjectInfo from '../components/mainPage/projectInfo'
import RecordTime from '../components/mainPage/recordTime'
import CreateRecord from '../components/mainPage/createRecord'
import { getCurrentProject, getProjects } from '../store/projects'
import toast from 'react-hot-toast'

const MainPage = () => {
  const dispatch = useDispatch()
  const currentProjectId = useSelector(getCurrentProjectId())
  const projects = useSelector(getProjects())
  const currentProject = useSelector(getCurrentProject(currentProjectId))

  const options = projects.map(p => ({ value: p._id, label: p.title }))
  const [time, setTime] = useState(0)

  const [selectValue, setSelectValue] = useState(currentProject && { value: currentProject._id, label: currentProject.title })

  const handleChange = async data => {
    const errors = await dispatch(changeCurrentProject(data.value))

    if (errors)
      toast.error('На сервере не удалось поменять текущий проект. Попробуйте позже')

    setSelectValue(data)
    setTime(0)
  }

  const handleTimeChange = reset => {
    setTime(prevState => reset ? 0 : prevState + 1)
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
        <div className="flex flex-col min-w-[310px] max-w-[600px] sm:min-w-[600px] bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] justify-center">
          <div className="flex justify-between bg-gray-100 border-b rounded-t-xl py-2 px-4 md:py-3 md:px-5 dark:bg-gray-800 dark:border-gray-700">
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500 align-middle">
              Текущий проект
            </p>
            <SelectField name='projectSelect' options={options} value={selectValue} onChange={handleChange}
                         isSearchable={true} noOptionsMessage='Ничего не найдено'
            />
          </div>
          <ProjectInfo currentProject={currentProject} />
          <div className='px-4 md:px-5'><hr /></div>
          <RecordTime onTimeChange={handleTimeChange} time={time} />
          {currentProject && <CreateRecord time={time} currentProjectId={currentProject._id} />}
        </div>
      </div>
    </>
  )
}

export default MainPage