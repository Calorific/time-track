import React, { useState } from 'react'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import Button from '../common/app/button'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import registerValidations from '../../validations/register'
import CheckboxField from '../common/form/checkboxField'
import { getAuthLoading, signUp } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../common/app/loader'
import toast from 'react-hot-toast'
import { parseServerErrors } from '../../utils/parseServerErrors'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authLoading = useSelector(getAuthLoading())
  const [authErrors, setAuthErrors] = useState({})

  const handleSubmit = async payload => {
    const data = await dispatch(signUp({ payload, navigate }))

    if (data && data.errors) {
      data.errors.message
        ? toast.error(parseServerErrors(data.errors.message))
        : setAuthErrors(data.errors.formErrors)
    }
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
                       defaultData={defaultValues} serverErrors={authErrors}>
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