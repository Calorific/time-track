import React from 'react'
import PropTypes from 'prop-types'

const SwitchField = ({ leftLabel, rightLabel, name, value, onChange, onKeyDown, ...rest }) => {

  const handleLeftClick = () => {
    onChange({ name, value: false })
  }

  const handleRightClick = () => {
    onChange({ name, value: true })
  }

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.checked })
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <label className="text-sm text-gray-500 mr-3 dark:text-gray-400 -mt-1" onClick={handleLeftClick}>
          {leftLabel}
        </label>
        <input type="checkbox" id={name} name={name} checked={value} onChange={handleChange} onKeyDown={onKeyDown} {...rest}
            className="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600
              border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200
              focus:border-blue-600 outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600
              before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0
              checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0
              before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
        />
        <label className="text-sm text-gray-500 ml-3 dark:text-gray-400 -mt-1" onClick={handleRightClick}>
          {rightLabel}
        </label>
      </div>
    </>
  )
}

SwitchField.defaultProps = {
  value: false
}

SwitchField.propTypes = {
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default React.memo(SwitchField)