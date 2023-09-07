import React from 'react'
import PropTypes from 'prop-types'

const ProjectSearch = ({ value, onChange, classes, placeholder }) => {

  const handleChange = e => {
    onChange(e.target.value)
  }

  return (
      <div className='dark:bg-gray-800'>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative dark:bg-gray-800">
          <div className="absolute inset-y-1 left-1 flex items-center pl-2 pointer-events-none dark:bg-gray-700">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search" placeholder={placeholder} onChange={handleChange} value={value}
                 className={`block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none
                   bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                   dark:text-gray-200 dark:focus:border-blue-500 max-w-full ` + classes} />
        </div>
      </div>
  )
}

ProjectSearch.defaultPtops = {
  classes: '',
  placeholder: 'Поиск'
}

ProjectSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  classes: PropTypes.string,
  placeholder: PropTypes.string,
}

export default ProjectSearch