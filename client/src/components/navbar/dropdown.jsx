import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Menu, MenuHandler, MenuList, MenuItem, } from "@material-tailwind/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/auth'
import { NavLink, useNavigate } from 'react-router-dom'

const Dropdown = ({ title, classes }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const goToProfile = () => {
    navigate('/profile')
  }

  const logout = () => {
    dispatch(logOut(navigate))
  }

  return (
    <span className={classes}>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <button type="button"
                  className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-gray-50
                     font-medium text-gray-700 align-middle hover:text-gray-500 transition-all text-sm dark:bg-gray-800
                     dark:hover:bg-gray-900 dark:text-gray-400 outline-none"
          >
            {title}
            <FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </MenuHandler>
        <MenuList className="p-1 dark:bg-slate-800 dark:border dark:border-gray-700">
          <MenuItem onClick={goToProfile} className={'flex items-center gap-2 rounded dark:hover:bg-gray-700 dark:hover:text-gray-300'}>
            <FontAwesomeIcon icon={faUser} />
            <Typography as="span" variant="small" className="font-normal">Профиль</Typography>
          </MenuItem>
          <MenuItem onClick={logout} className={'flex items-center gap-2 rounded dark:hover:bg-gray-700 dark:hover:text-gray-300'}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <Typography as="span" variant="small" className="font-normal">Выход</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </span>
  )
}

Dropdown.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.string,
}

export default Dropdown