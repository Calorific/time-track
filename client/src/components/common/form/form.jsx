import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { parseServerErrors } from '../../../utils/parseServerErrors'

const FormComponent = ({ children, className, validationScheme, onSubmit, defaultData, serverErrors, clear }) => {
  const form = useRef()
  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState({})
  const isFirstRender = useRef(true)

  const handleChange = useCallback(target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }, [setData])


  const validate = useCallback(data => {
    if (!validationScheme) return true

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
  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate(data))
      return

    const errors = await onSubmit(data)

    if (!errors && clear)
      setData(defaultData)
  }

  useEffect(() => {
    if (isFirstRender.current)
      isFirstRender.current = false
    else if (Object.keys(data).length > 0)
      validate(data)
  }, [data, validate])

  useEffect(() => {
    const newErrors = Object.keys(serverErrors).reduce((acc, name) =>
        ({ ...acc, [name]: parseServerErrors(serverErrors[name]) }), {})
    setErrors(newErrors)
  }, [serverErrors, setErrors])

  const handleKeyDown = useCallback(e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      const form = e.target.form
      const indexField = Array.prototype.indexOf.call(form, e.target)
      form?.elements[(indexField + 1) % form.elements.length]?.focus()
    }
  }, [])

  const clonedElements = React.Children.map(children, child => {
    let config = {}

    if (['submit', 'button'].includes(child?.props.type))
      config = { ...child?.props, disabled: !isValid }
    else if (!child?.props.name)
      throw new Error('Name property is required for field components')
    else
      config = {
      ...child?.props,
      onChange: handleChange,
      value: data[child?.props.name] || '',
      error: errors[child?.props.name],
      onKeyDown: handleKeyDown,
    }

    return React.cloneElement(child, config)
  })

  return (
    <form onSubmit={handleSubmit} className={className} ref={form}>
      {clonedElements}
    </form>
  )
}

FormComponent.defaultProps = {
  defaultData: {},
  serverErrors: {},
  className: ''
}

FormComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  validationScheme: PropTypes.object,
  onSubmit: PropTypes.func,
  defaultData: PropTypes.object,
  className: PropTypes.string,
  serverErrors: PropTypes.object,
  clear: PropTypes.bool,
}
export default React.memo(FormComponent)