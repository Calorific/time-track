import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/user'
import { NavLink } from 'react-router-dom'
import Dropdown from './dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const currentUser = useSelector(getCurrentUser())
  const menu = useRef(null)
  const menuBtn = useRef(null)
  const menuState = useRef(false)

  const getLinkClassName = ({ isActive }) => 'font-medium sm:py-6 font-roboto ' + (isActive
        ? 'font-medium text-blue-600 sm:py-6 dark:text-blue-500'
        : 'text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500')

  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(prevState => {
      menuState.current = !prevState
      return !prevState
    })
  }

  useEffect(() => {
    const handleClick = e => {
      if (menuState.current && !menuBtn.current.contains(e.target))
        setShow(false)
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])

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
            <button type="button" onClick={toggleShow} ref={menuBtn}
                className="p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium text-gray-700
                 shadow-sm align-middle bg-gray-50 text-sm mr-1 dark:bg-slate-900 dark:hover:bg-slate-800
                 dark:border-gray-700 dark:text-gray-400 sm:dark:hover:text-gray-200"
            >
              <FontAwesomeIcon icon={faBars} className={`${show ? 'hidden' : ''} w-4 h-4`} />
              <FontAwesomeIcon icon={faXmark} className={`${!show ? 'hidden' : ''} w-4 h-4`} />
            </button>
            <Dropdown title={currentUser.name} />
          </div>
        </div>
        <div className={`${show ? 'top-full opacity-100' : 'top-[-400px] opacity-0'} sm:opacity-100 pl-4
              pb-4 sm:p-0 border-[1px] border-gray-600 sm:border-0 absolute sm:top-0
              z-1000 bg-gray-50 dark:bg-gray-800 sm:relative left-0 right-0 overflow-hidden basis-full grow sm:block`}
            ref={menu}
            style={{ transition: show ? 'opacity 500ms ease-in-out' : 'opacity 500ms ease-in-out, top 1ms ease-in-out 500ms' }}
        >
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