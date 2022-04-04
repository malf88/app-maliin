import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalculator } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import * as icon from '@coreui/icons'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  //System Menu
  {
    component: CNavTitle,
    name: 'Finance',
  },
  {
    component: CNavItem,
    name: 'Accounts',
    to: '/accounts',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/categories',
    icon: <CIcon icon={icon.cilList} customClassName="nav-icon" />,
  },
  //End System Menu
]

export default _nav
