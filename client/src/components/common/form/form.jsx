import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { parseServerErrors } from '../../../utils/parseServerErrors'

const FormComponent = ({ children, classes, validationScheme, onSubmit, defaultData, serverErrors }) => {
  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState({})

  const handleChange = useCallback(target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }, [setData])

  const validate = useCallback(data => {
    try {
      validationScheme.validateSync(data)
      setErrors({})
      return true
    } catch (e) {
      setErrors({ [e.path]: e.message })
      return false
    }
  }, [validationScheme, setErrors])

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate(data))
      return
    onSubmit(data)
  }

  useEffect(() => {
    if (Object.keys(data).length > 0)
      validate(data)
  }, [data, validate])

  const handleKeyDown = useCallback(e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      const form = e.target.form
      const indexField = Array.prototype.indexOf.call(form, e.target)
      form.elements[indexField + 1].focus()
    }
  }, [])

  const clonedElements = React.Children.map(children, child => {
    let config = {}

    if (child.props.type === 'submit')
      config = { ...child.props, disabled: !isValid }
    else if (!child.props.name)
      throw new Error('Name property is required for field components')
    else if (child.props.type !== 'submit') config = {
      ...child.props,
      onChange: handleChange,
      value: data[child.props.name] || '',
      error: errors[child.props.name] || parseServerErrors(serverErrors[child.props.name]),
      onKeyDown: handleKeyDown,
    }

    return React.cloneElement(child, config)
  })

  return (
    <form onSubmit={handleSubmit} className={classes}>
      {clonedElements}
    </form>
  )
}

FormComponent.defaultProps = {
  defaultData: {},
  serverErrors: {}
}

FormComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  validationScheme: PropTypes.object,
  onSubmit: PropTypes.func,
  defaultData: PropTypes.object,
  classes: PropTypes.string,
  serverErrors: PropTypes.object,
}
export default FormComponent