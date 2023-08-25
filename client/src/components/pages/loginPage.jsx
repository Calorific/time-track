import React, { useState } from 'react'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import Button from '../common/app/button'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import loginValidations from '../../validations/login'
import CheckboxField from '../common/form/checkboxField'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthLoading, logIn } from '../../store/auth'
import toast from 'react-hot-toast'
import { parseServerErrors } from '../../utils/parseServerErrors'
import Loader from '../common/app/loader'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authLoading = useSelector(getAuthLoading())
  const [authErrors, setAuthErrors] = useState({})

  const handleSubmit = async payload => {
    const data = await dispatch(logIn({ payload, navigate }))

    if (data && data.errors) {
      data.errors.message
          ? toast.error(parseServerErrors(data.errors.message))
          : setAuthErrors(data.errors.formErrors)
    }
  }

  const defaultData = {
    email: 'a@mail.ru',
    password: 'Test1234',
    keepLoggedIn: true
  }

  const validationScheme = yup.object().shape(loginValidations)

  return (
      !authLoading ? <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 login'>
        <h2 className='text-3xl'>Авторизация</h2>
        <FormComponent classes='mt-4' onSubmit={handleSubmit} validationScheme={validationScheme} serverErrors={authErrors} defaultData={defaultData}>
          <TextField name='email' label='Email' autoFocus />
          <TextField name='password' type='password' label='Пароль' />
          <CheckboxField name='keepLoggedIn' label='Оставаться в сети' />
          <Button type='submit' text='Войти' />
        </FormComponent>
        <p>Еще нет аккаунта? <NavLink to='/auth/register' className='text-blue-600'>Зарегистрироваться</NavLink></p>
      </div> : <Loader />
  )
}

export default LoginPage