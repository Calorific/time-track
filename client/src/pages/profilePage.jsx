import React, { useState } from 'react'
import CardWrapper from '../components/common/app/cardWrapper'
import Loader from '../components/common/app/loader'
import SwitchField from '../components/common/form/switchField'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme, getCurrentUser } from '../store/user'
import Divider from '../components/common/app/divider'
import ProjectTypes from '../components/profilePage/projectTypes'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser())
  const [isDark, setIsDark] = useState(currentUser.theme === 'dark')
  const authLoading = false

  const handleChange = ({ value }) => {
    dispatch(changeTheme(value ? 'dark' : 'light'))
    setIsDark(value)
  }

  return (
    <div className='h-full w-full flex justify-center items-start pb-5 mt-16'>
      <CardWrapper externalClasses={'min-w-[310px] sm:min-w-[450px] p-4' + (authLoading ? 'hidden' : '')}>
        <h2 className="text-3xl dark:text-gray-200 mb-4">Профиль</h2>
        <SwitchField leftLabel='Светлая тема' rightLabel='Темная тема' name='theme' value={isDark}
                     onChange={handleChange} />
        <Divider />
        <ProjectTypes types={currentUser.projectTypes} />
      </CardWrapper>
      {authLoading ? <Loader /> : ''}
    </div>
  )

}

export default ProfilePage