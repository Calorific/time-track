import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import Button from '../common/app/button'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import * as yup from 'yup'
import recordValidations from '../../validations/record'
import { useDispatch, useSelector } from 'react-redux'
import { addRecord, getRecordLoading } from '../../store/records'
import { parseTime } from '../../utils/parseTime'
import Loader from '../common/app/loader'

const CreateRecord = ({ time, currentProjectId }) => {
  const dispatch = useDispatch()
  const loading = useSelector(getRecordLoading())
  const [show, setShow] = useState(false)

  const validationScheme = yup.object().shape(recordValidations)

  if (loading)
    return <Loader />

  if (!show)
    return (
      <div className="px-4 md:px-5 pb-2 md:pb-3">
        <Button bgColor='bg-green-500 hover:bg-green-700' text='Создать запись' onClick={() => setShow(true)} />
      </div>
    )

  const onSubmit = async data => {
    data.description ||= 'Без описания'
    data.projectId = currentProjectId
    data.time = parseTime(data.time)

    const errors = await dispatch(addRecord(data))
  }

  return (
    <FormComponent classes='px-4 md:px-5 pb-2 md:pb-3' validationScheme={validationScheme} onSubmit={onSubmit}>
      <TextField name='description' label='Описание' />
      <TextField name='time' label='Затраченное время' placeholder={formatTime(time)} />
      <Button type='submit' text='Создать' classes='mr-2' />
      <Button type='button' text='Отмена' onClick={() => setShow(false)} bgColor='bg-red-500 hover:bg-red-700' />
    </FormComponent>
  )
}

CreateRecord.propTypes = {
  time: PropTypes.number,
  currentProjectId: PropTypes.string,
}

export default CreateRecord