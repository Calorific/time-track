import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/user'
import { NavLink } from 'react-router-dom'
import Dropdown from './dropdown'

const Navbar = () => {
  const currentUser = useSelector(getCurrentUser())

  const getLinkClassName = ({ isActive }) => 'font-medium sm:py-6 font-roboto ' + (isActive
        ? 'font-medium text-blue-600 sm:py-6 dark:text-blue-500'
        : 'text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500')

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-gray-50 border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
      <nav
          className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <NavLink className="flex-none text-xl font-semibold dark:text-gray-100 mr-8" to="/" aria-label="Brand">
            Time Track
          </NavLink>
          <div className="sm:hidden">
            <button type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border
                  font-medium text-gray-700 shadow-sm align-middle bg-gray-50 text-sm mr-1
                  dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"
            >
              <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            <Dropdown title={currentUser.name} />
          </div>
        </div>
        <div id="navbar-collapse-with-animation" className="hs-collapse pl-4 pb-4 sm:p-0 border-[1px] border-gray-600 sm:border-0 absolute z-1000 bg-gray-50 dark:bg-gray-800 sm:relative left-0 right-0 hidden overflow-hidden basis-full grow sm:block">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
            <NavLink className={getLinkClassName} to="/" aria-current="page" end>
              Главная
            </NavLink>
            <NavLink className={getLinkClassName} to="/projects" aria-current="page">
              Проекты
            </NavLink>
            <NavLink className={getLinkClassName} to="/statistics" aria-current="page" end>
              Статистика
            </NavLink>
            <Dropdown title={currentUser.name} className='hidden sm:block' />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar