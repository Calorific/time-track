import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentProject, getCurrentProjectId } from '../store/user'
import SelectField from '../components/common/form/selectField'
import ProjectInfo from '../components/common/app/projectInfo'
import RecordTime from '../components/mainPage/recordTime'
import CreateRecord from '../components/mainPage/createRecord'
import { getProject, getProjectsList } from '../store/projects'
import CardWrapper from '../components/common/app/cardWrapper'
import cookieService from '../services/cookie.service'
import { computeCurrentRecordTime } from '../utils/computeCurrentRecordTime'

const MainPage = () => {
  const dispatch = useDispatch()
  const currentProjectId = useSelector(getCurrentProjectId())
  const projects = useSelector(getProjectsList())
  const currentProject = useSelector(getProject(currentProjectId))
  const computeTime = useCallback(computeCurrentRecordTime, [])

  const [time, setTime] = useState(computeTime)
  const [selectValue, setSelectValue] = useState(currentProject && { value: currentProject._id, label: currentProject.title })

  const options = projects.map(p => ({ value: p._id, label: p.title }))

  const handleChange = async data => {
    setSelectValue(data)
    await dispatch(changeCurrentProject(data.value))
    setTime(0)
  }

  const handleTimeChange = reset => {
    setTime(prevState => {
      const newTime = reset ? 0 : prevState + 1
      cookieService.setCurrentRecordTime(newTime)
      return newTime
    })
  }
  
  if (!projects || !projects.length)
    return (
      <CardWrapper>
        <h2 className='text-xl'>Вы еще не создали ни одного проекта</h2>
      </CardWrapper>
    )

  return (
    <div className='h-full w-full flex justify-center items-start pb-5 mt-16'>
      <CardWrapper externalClasses='min-w-[310px] max-w-[600px] sm:min-w-[600px]'>
        <div className="flex justify-between bg-gray-100 border-b rounded-t-xl py-2 px-4 md:py-3 md:px-5 dark:bg-gray-800 dark:border-gray-700">
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500 align-middle">
            Текущий проект
          </p>
          <SelectField name='projectSelect' options={options} value={selectValue} onChange={handleChange}
                       placeholder={'Выберите текущий проект'} isSearchable={true} noOptionsMessage='Ничего не найдено'
          />
        </div>
        <ProjectInfo project={currentProject} />
        {currentProject ? <>
          <div className='px-4 md:px-5'><hr /></div>
          <RecordTime onTimeChange={handleTimeChange} time={time} />
          <CreateRecord time={time} currentProjectId={currentProject._id} />
        </> : ''}
      </CardWrapper>
    </div>
  )
}

export default MainPage