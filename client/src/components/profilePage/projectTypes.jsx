import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import Button from '../common/app/button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLoading, updateTypes } from '../../store/user'
import * as yup from 'yup'
import typeValidations from '../../validations/type.validation'
import Loader from '../common/app/loader'
import Type from './type'

const ProjectTypes = ({ types }) => {
  const dispatch = useDispatch()
  const loading = useSelector(getUserLoading())
  const [show, setShow] = useState(false)
  const [serverErrors, setServerErrors] = useState({})

  const handleShow = () => {
    setShow(prevState => !prevState)
  }

  const handleSubmit = async payload => {
    const data = await dispatch(updateTypes([...types, payload.type]))
    if (data?.errors?.formErrors)
      setServerErrors(data.errors.formErrors)
    return data
  }

  const handleDelete = type => {
    dispatch(updateTypes(types.filter(t => t !== type)))
  }

  const validationScheme = yup.object().shape(typeValidations)

  return (
    <>
      {loading ? <div className="flex justify-center mt-3"><Loader /></div> : ''}
      <div className={loading ? 'hidden' : ''}>
        <p className='flex justify-between dark:text-gray-200 mt-3 mb-2'>
          <span>Типы проектов</span>
          <FontAwesomeIcon
              icon={show ? faMinus : faPlus}
              className={'cursor-pointer mt-[3px] ' + (show ? 'text-red-500' : 'text-green-500 ')}
              onClick={handleShow} />
        </p>
        <FormComponent classes={'flex gap-2 justify-between items-center ' + (!show ? 'hidden' : '')} onSubmit={handleSubmit} clear={true}
                             validationScheme={validationScheme} serverErrors={serverErrors}>
          <TextField name='type' label='Тип проекта' />
          <Button type='submit'><FontAwesomeIcon icon={faPlus} /></Button>
        </FormComponent>
        <div className="flex flex-wrap gap-2">
          {types.map((type, key) => <Type key={key} value={type} canDelete={types.length > 1} onDelete={handleDelete} /> )}
        </div>
      </div>
    </>
  )
}

ProjectTypes.propTypes = {
  types: PropTypes.array,
}

export default ProjectTypes