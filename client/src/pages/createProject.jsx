import React from 'react'
import FormWrapper from '../components/common/app/formWrapper'
import FormComponent from '../components/common/form/form'
import TextField from '../components/common/form/textField'
import Button from '../components/common/app/button'
import { useNavigate, useParams } from 'react-router-dom'
import TextAreaField from '../components/common/form/textAreaField'
import SelectField from '../components/common/form/selectField'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectTypes } from '../store/user'
import * as yup from 'yup'
import projectValidations from '../validations/project'
import { addProject, getProjectsLoading } from '../store/projects'
import Loader from '../components/common/app/loader'

const CreateProject = () => {
  const params = useParams()
  console.log(params)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(getProjectsLoading())
  const types = useSelector(getProjectTypes())
  const options = [...types.map(t => ({ value: t, label: t }))]
  const goBack = () => {
    navigate('/projects')
  }

  const validationScheme = yup.object().shape(projectValidations)

  const defaultData = { type: types[0] }

  const handleSubmit = payload => {
    payload.description ||= 'Без описания'
    dispatch(addProject({ navigate, payload }))
  }

  return (
    <div className='h-full w-full flex justify-center items-start pb-5 mt-8'>
      <FormWrapper externalClasses={loading ? 'hidden' : ''}>
        <h2 className="text-3xl">Создать проект</h2>
        <FormComponent classes="mt-4" defaultData={defaultData} validationScheme={validationScheme} onSubmit={handleSubmit}>
          <TextField name="title" label="Название" autoFocus />
          <TextAreaField name="description" label="Описание" />
          <SelectField name='type' options={options} classes='mb-4' placeholder='Выберите тип проекта' defaultValue={options[0]} />
          <Button type="submit" text="Создать" />
          <Button type="button" text="Назад" bgColor='bg-amber-500 hover:bg-amber-700' classes='ml-2' onClick={goBack} />
        </FormComponent>
      </FormWrapper>
      {loading ? <Loader /> : ''}
    </div>
  )
}

export default CreateProject