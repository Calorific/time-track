import React from 'react'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import Button from '../common/app/button'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import loginValidations from '../../validations/login'
import CheckboxField from '../common/form/checkboxField'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/user'

const LoginPage = () => {

  const handleSubmit = data => {

  }

  const validationScheme = yup.object().shape(loginValidations)

  return (
      <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 login'>
        <h2 className='text-3xl'>Авторизация</h2>
        <FormComponent classes='mt-4' onSubmit={handleSubmit} validationScheme={validationScheme}>
          <TextField name='email' label='Email' autoFocus />
          <TextField name='password' type='password' label='Пароль' />
          <CheckboxField name='keepLoggedIn' label='Оставаться в сети' />
          <Button type='submit' text='Войти' />
        </FormComponent>
        <p>Еще нет аккаунта? <NavLink to='/auth/register' className='text-blue-600'>Зарегистрироваться</NavLink></p>
      </div>
  )
}

export default LoginPage