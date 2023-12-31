import React, { useState } from 'react'
import FormComponent from '../components/common/form/form'
import TextField from '../components/common/form/textField'
import Button from '../components/common/app/button'
import * as yup from 'yup'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import loginValidations from '../validations/login.validation'
import CheckboxField from '../components/common/form/checkboxField'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthLoading, logIn } from '../store/auth'
import Loader from '../components/common/app/loader'
import CardWrapper from '../components/common/app/cardWrapper'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const authLoading = useSelector(getAuthLoading())
  const [authErrors, setAuthErrors] = useState({})

  const handleSubmit = async payload => {
    const referer = state?.referer
    const data = await dispatch(logIn({ payload, navigate, referer }))

    if (data?.errors?.formErrors)
      setAuthErrors(data.errors.formErrors)
  }

  const defaultData = {
    keepLoggedIn: true
  }

  const validationScheme = yup.object().shape(loginValidations)

  return <>
    <CardWrapper className={'min-w-[310px] sm:min-w-[450px] p-4 ' + (authLoading ? 'hidden' : '')}>
      <h2 className='text-3xl dark:text-gray-200'>Авторизация</h2>
      <FormComponent className='mt-4' onSubmit={handleSubmit} validationScheme={validationScheme}
                     serverErrors={authErrors} defaultData={defaultData}
      >
        <TextField name='email' label='Email' autoFocus />
        <TextField name='password' type='password' label='Пароль' />
        <CheckboxField name='keepLoggedIn' label='Оставаться в сети' />
        <Button type='submit' text='Войти' />
      </FormComponent>
      <p className='dark:text-gray-200'>Еще нет аккаунта? <NavLink to='/auth/register' className='text-blue-600'>Зарегистрироваться</NavLink></p>
    </CardWrapper>
    {authLoading ? <Loader /> : ''}
  </>
}

export default LoginPage