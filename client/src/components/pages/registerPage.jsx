import React from 'react'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import Button from '../common/controls/button'
import * as yup from 'yup'
import { NavLink } from 'react-router-dom'
import registerValidations from '../../validations/register'
import CheckboxField from '../common/form/checkboxField'

const RegisterPage = () => {
  const handleSubmit = data => {
    console.log(data)
  }

  const validationScheme = yup.object().shape(registerValidations)

  return (
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 login'>
      <h2 className='text-3xl'>Регистрация</h2>
      <FormComponent classes='mt-4' onSubmit={handleSubmit} validationScheme={validationScheme}>
        <TextField name='name' label='Имя' autoFocus />
        <TextField name='email' label='Email' />
        <TextField name='password' type='password' label='Пароль' />
        <CheckboxField name='agree' label='Согласие на обработку данных' />
        <Button type='submit' text='Зарегистрироваться' />
      </FormComponent>
      <p>Уже есть аккаунт? <NavLink to='/auth/login' className='text-blue-600'>Войти</NavLink></p>
    </div>
  )
}

export default RegisterPage