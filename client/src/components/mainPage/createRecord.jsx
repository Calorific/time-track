import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import Button from '../common/app/button'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import * as yup from 'yup'
import recordValidations from '../../validations/record.validation'
import { useDispatch, useSelector } from 'react-redux'
import { addRecord, getRecordLoading } from '../../store/records'
import { parseTime } from '../../utils/parseTime'
import Loader from '../common/app/loader'
import { Dialog } from '@material-tailwind/react'
import SuccessButton from '../common/app/successButton'
import DangerButton from '../common/app/dangerButton'

const CreateRecord = ({ time, currentProjectId }) => {
  const dispatch = useDispatch()
  const loading = useSelector(getRecordLoading())
  const [show, setShow] = useState(false)
  const [recordErrors, setRecordErrors] = useState({})

  const validationScheme = yup.object().shape(recordValidations)

  const onSubmit = async record => {
    handleShow()
    const payload = { ...record }
    payload.description ||= 'Без описания'
    payload.projectId = currentProjectId
    payload.time = parseTime(payload.time || '0')

    const data = await dispatch(addRecord(payload))

    if (data?.errors?.formErrors)
      setRecordErrors(data.errors.formErrors)
  }

  const handleShow = () => {
    setRecordErrors({})
    setShow(prevState => !prevState)
  }

  return <>
    {!loading ? <div className="px-4 md:px-5 pb-2 md:pb-3">
      <SuccessButton onClick={handleShow}>Создать запись</SuccessButton>
    </div> : <div className='flex justify-center my-4'><Loader /></div>}
    <Dialog open={show} handler={handleShow} className={'dark:bg-gray-800 p-4 ' + (loading ? 'hidden' : '')} aria-modal size='xs'>
      <h2 className="text-3xl dark:text-gray-200 mb-2">Новая запись</h2>
      <FormComponent classes='px-2' {...{validationScheme, onSubmit, serverErrors: recordErrors }} clear={true}>
        <TextField name='time' label={`Затраченное время (${formatTime(time)})`} />
        <TextField name='description' label='Описание' />
        <Button type='submit' text='Создать' classes='mr-2' />
        <DangerButton type='button' onClick={handleShow}>Отмена</DangerButton>
      </FormComponent>
    </Dialog>
  </>

}

CreateRecord.propTypes = {
  time: PropTypes.number,
  currentProjectId: PropTypes.string,
}

export default CreateRecord