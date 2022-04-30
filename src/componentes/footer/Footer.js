import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'

const version = require('../../../package.json').version
const Footer = () => (
  <BottomNavigation showLabels>
    <BottomNavigationAction label={'Versão App: ' + version} disabled={true} />
    <BottomNavigationAction label={'Versão Api: xxxx'} disabled={true} />
  </BottomNavigation>
)
export default Footer
