import React from 'react'
import PropTypes from 'prop-types'

const Type = ({ value, canDelete, onDelete }) => {

  return (
      <div className='relative grid items-center font-roboto font-medium whitespace-nowrap select-none bg-gray-900
       text-gray-100 py-1.5 px-3 text-xs rounded-lg dark:bg-gray-600 normal-case'>
        <span className={canDelete ? 'mr-5' : ''}>{value}</span>
        {canDelete ?
          <button onClick={() => onDelete(value)} className="align-middle select-none font-sans font-medium text-center transition-all
             w-5 h-5 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none max-w-[32px] max-h-[32px] text-xs
             text-white hover:bg-white/10 active:bg-white/30 !absolute top-2/4 right-1 -translate-y-2/4 mx-px rounded-md"
          >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 className="h-4 w-4" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </span>
        </button> : ''}
      </div>
  )
}

Type.propTypes = {
  value: PropTypes.string,
  canDelete: PropTypes.bool,
  onDelete: PropTypes.func,
}

export default Type