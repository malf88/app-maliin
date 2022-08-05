import React from 'react'
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Box from '@mui/material/Box'
import Pages from '../const/Pages'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { v4 } from 'uuid'
import Avatar from '@mui/material/Avatar'

const Nav = () => {
  const pages = Pages()
  return (
    <Box
      sx={{
        mt: 0,
        backgroundColor: '#5090ab',
        boxShadow: '1px 0px 1px 1px #5090ab',
        minHeight: '86vh',
      }}
      id="menu-lateral"
    >
      <List>
        {pages.map((page) => (
          <ListItem disablePadding key={v4()}>
            <ListItemButton href={page.path}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#026c87' }}>{page.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
export default Nav
