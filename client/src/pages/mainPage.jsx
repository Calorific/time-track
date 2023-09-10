import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentProject, getCurrentProjectId } from '../store/user'
import SelectField from '../components/common/form/selectField'
import ProjectInfo from '../components/common/app/projectInfo'
import RecordTime from '../components/mainPage/recordTime'
import CreateRecord from '../components/mainPage/createRecord'
import { getProject, getProjectsList } from '../store/projects'
import cookieService from '../services/cookie.service'
import { computeRecordTime } from '../utils/computeRecordTime'
import Divider from '../components/common/app/divider'
import CardWrapper from '../components/common/app/cardWrapper'

const MainPage = () => {
  const dispatch = useDispatch()
  const currentProjectId = useSelector(getCurrentProjectId())
  const projects = useSelector(getProjectsList())
  const currentProject = useSelector(getProject(currentProjectId))
  const computeTime = useCallback(computeRecordTime, [])

  const [time, setTime] = useState(computeTime)
  const [selectValue, setSelectValue] = useState(currentProject?._id)

  const options = projects.map(p => ({ value: p._id, label: p.title }))

  const handleChange = async data => {
    setSelectValue(data)
    await dispatch(changeCurrentProject(data.value))
    setTime(0)
  }

  const handleTimeChange = reset => {
    setTime(prevState => {
      const newTime = reset ? 0 : prevState + 1
      const startTime = +cookieService.getStartTime()
      if (startTime) {
        const timePassed = Math.round((Date.now() - startTime) / 1000)
        if (newTime < timePassed && !reset) {
          cookieService.setCurrentRecordTime(timePassed)
          return timePassed
        }
      }
      cookieService.setCurrentRecordTime(newTime)
      return newTime
    })
  }
  
  if (!projects || !projects.length)
    return (
        <div className='h-full w-full flex justify-center items-start pb-5 mt-16'>
          <CardWrapper>
            <h2 className="text-md sm:text-xl dark:text-gray-200 text-center p-2">Вы еще не создали ни одного проекта</h2>
          </CardWrapper>
        </div>
    )

  return (
    <div className='h-full w-full flex justify-center items-start pb-5 mt-16'>
      <CardWrapper className='min-w-[310px] max-w-[600px] sm:min-w-[540px] md:min-w-[600px] !p-0 mx-2'>
        <div className="flex justify-between bg-gray-100 border-b rounded-t-xl py-2 px-4 md:py-3 md:px-5 dark:bg-gray-800 dark:border-gray-700">
          <p className="mt-2 mr-1 text-sm text-gray-500 dark:text-gray-500 align-middle">
            Текущий проект
          </p>
          <SelectField name='project' options={options} value={selectValue} onChange={handleChange} label='Текущий проект' />
        </div>
        <ProjectInfo project={currentProject} />
        {currentProject ? <>
          <div className='px-4 md:px-5'><Divider /></div>
          <RecordTime onTimeChange={handleTimeChange} time={time} />
          <CreateRecord time={time} currentProjectId={currentProject._id} />
        </> : ''}
      </CardWrapper>
    </div>
  )
}

export default MainPage