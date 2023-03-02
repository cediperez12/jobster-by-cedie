import React, { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import {
  toggleSidebar,
  logoutUser,
  clearStore,
} from '../features/user/userSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [showLogout, setShowLogout] = useState(false)

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={(e) => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              className="dropdown-btn"
              onClick={(e) => dispatch(clearStore('Logout successful...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
