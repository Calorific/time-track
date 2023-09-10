import React, { useState } from 'react'
import FormComponent from '../components/common/form/form'
import TextField from '../components/common/form/textField'
import Button from '../components/common/app/button'
import * as yup from 'yup'
import { NavLink, useNavigate } from 'react-router-dom'
import registerValidations from '../validations/register.validation'
import CheckboxField from '../components/common/form/checkboxField'
import { getAuthLoading, signUp } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/app/loader'
import CardWrapper from '../components/common/app/cardWrapper'

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

  return <>
    <CardWrapper externalClasses={'min-w-[310px] sm:min-w-[450px] p-4 ' + (authLoading ? 'hidden' : '')}>
      <h2 className="text-3xl dark:text-gray-200 mb-4">Регистрация</h2>
      <FormComponent onSubmit={handleSubmit} validationScheme={validationScheme} serverErrors={authErrors}>
        <TextField name="name" label="Имя" autoFocus />
        <TextField name="email" label="Email" />
        <TextField name="password" type="password" label="Пароль" />
        <CheckboxField name="agree" label="Согласие на обработку данных" />
        <Button type="submit" text="Зарегистрироваться" />
      </FormComponent>
      <p className='dark:text-gray-200'>Уже есть аккаунт? <NavLink to="/auth/login" className="text-blue-600">Войти</NavLink></p>
    </CardWrapper>
    {authLoading ? <Loader /> : ''}
  </>
}

export default RegisterPage