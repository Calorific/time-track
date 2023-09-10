import React, { useState } from 'react'
import CardWrapper from '../components/common/app/cardWrapper'
import FormComponent from '../components/common/form/form'
import TextField from '../components/common/form/textField'
import Button from '../components/common/app/button'
import { useNavigate, useParams } from 'react-router-dom'
import TextAreaField from '../components/common/form/textAreaField'
import SelectField from '../components/common/form/selectField'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectTypes } from '../store/user'
import * as yup from 'yup'
import projectValidations from '../validations/project.validation'
import { addProject, editProject, getProject, getProjectsLoading } from '../store/projects'
import Loader from '../components/common/app/loader'
import GoBackButton from '../components/common/app/goBackButton'

const ProjectForm = () => {
  const params = useParams()
  const isEditing = !!params.id
  const { title, description, type } = useSelector(getProject(params.id)) || {}

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(getProjectsLoading())
  const types = useSelector(getProjectTypes())
  const options = [...types.map(t => ({ value: t, label: t }))]
  const [projectErrors, setProjectErrors] = useState({})

  const validationScheme = yup.object().shape(projectValidations)

  const defaultData = isEditing
      ? { title, description: description !== 'Без описания' ? description : '', type }
      : { type: options[0].value }

  const handleSubmit = async project => {
    const payload = { ...project }
    payload.description ||= 'Без описания'
    const data = await dispatch(isEditing
        ? editProject({ navigate, id: params.id, payload })
        : addProject({ navigate, payload }))

    if (data?.errors?.formErrors)
      setProjectErrors(data.errors.formErrors)
  }

  return (
    <div className='h-full w-full flex justify-center items-start pb-5 mt-8'>
      <CardWrapper className={'min-w-[310px] sm:min-w-[450px] p-4 ' + (loading ? 'hidden' : '')}>
        <h2 className="text-xl sm:text-3xl dark:text-gray-200">{isEditing ? 'Редактировать' : 'Создать'} проект</h2>
        <FormComponent className="mt-4" defaultData={defaultData} validationScheme={validationScheme}
                       onSubmit={handleSubmit} serverErrors={projectErrors}>
          <TextField name="title" label="Название" autoFocus />
          <TextAreaField name="description" label="Описание" />
          <SelectField name='type' options={options} className='mb-4' label='Выберите тип проекта' />
          <Button type="submit" text={isEditing ? 'Сохранить' : 'Создать'} />
          <GoBackButton type='button' />
        </FormComponent>
      </CardWrapper>
      {loading ? <Loader /> : ''}
    </div>
  )
}

export default ProjectForm