import React from 'react'
import PropTypes from 'prop-types'

const CreateRecord = ({ time }) => {

  return (
    <div className="px-4 md:px-5 pb-2 md:pb-3">
      Create record
    </div>
  )
}

CreateRecord.propTypes = {
  time: PropTypes.number,
}

export default CreateRecord