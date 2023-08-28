import React, { useState } from 'react'
import FormComponent from '../components/common/form/form'
import TextField from '../components/common/form/textField'
import Button from '../components/common/app/button'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import registerValidations from '../validations/register'
import CheckboxField from '../components/common/form/checkboxField'
import { getAuthLoading, signUp } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/app/loader'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authLoading = useSelector(getAuthLoading())
  const [authErrors, setAuthErrors] = useState({})

  const handleSubmit = async payload => {
    const data = await dispatch(signUp({ payload, navigate }))

    if (data?.errors?.formErrors)
      setAuthErrors(data.errors.formErrors)
  }

  const validationScheme = yup.object().shape(registerValidations)

  const defaultValues = {
    name: 'Abc',
    email: 'a@mail.ru',
    password: 'Test1234',
    agree: true
  }

  return (
    <>
      {!authLoading ? <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 login">
        <h2 className="text-3xl">Регистрация</h2>
        <FormComponent classes="mt-4" onSubmit={handleSubmit} validationScheme={validationScheme}
                       defaultData={defaultValues} serverErrors={authErrors}
        >
          <TextField name="name" label="Имя" autoFocus />
          <TextField name="email" label="Email" />
          <TextField name="password" type="password" label="Пароль" />
          <CheckboxField name="agree" label="Согласие на обработку данных" />
          <Button type="submit" text="Зарегистрироваться" />
        </FormComponent>
        <p>Уже есть аккаунт? <NavLink to="/auth/login" className="text-blue-600">Войти</NavLink></p>
      </div> : <Loader />}
    </>
  )
}

export default RegisterPage