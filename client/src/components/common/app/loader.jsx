import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ size }) => {
  return (
    <div className={`${size} text-blue-500 inline-block animate-spin rounded-full border-4 border-solid border-current
           border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`} role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}

Loader.defaultProps = {
  size: 'w-20 h-20'
}

Loader.propTypes = {
  size: PropTypes.string,
}
export default Loader