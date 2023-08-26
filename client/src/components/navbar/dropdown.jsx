import React from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({ title, classes, items }) => {

  return (
    <>
      <div className={"hs-dropdown relative inline-flex " + classes}>
        <button
            id="hs-dropdown-with-title"
            type="button"
            className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-gray-50
                     font-medium text-gray-700 align-middle hover:text-gray-500 transition-all text-sm dark:bg-slate-900
                      dark:hover:bg-slate-800 dark:text-gray-400 outline-none"
        >
          {title}
          <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100
                     opacity-0 hidden bg-gray-50 shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200
                      dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
             style={{ marginTop: -17 }}
             aria-labelledby="hs-dropdown-with-title"
        >
          <div className="py-2 first:pt-0 last:pb-0">
            {items && items.map((item, i) => (
                <button className="flex items-center gap-x-3.5 rounded-md text-sm text-gray-800 hover:bg-gray-100
                      dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" key={i}>
                  {item}
                </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

Dropdown.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node,), PropTypes.node])
}

export default Dropdown