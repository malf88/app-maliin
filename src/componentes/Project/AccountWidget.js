import React from 'react'
import PropTypes from 'prop-types'
import { v4, v4 as uuidv4 } from 'uuid'
import { AccountContext } from './AccountList'
import BillInsert from '../../pages/projects/BillInsert'
import {
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import BillList from '../../pages/projects/BillList'

const AccountWidget = (props) => {
  AccountWidget.propTypes = {
    accounts: PropTypes.array,
    reloadCallback: PropTypes.func,
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '30px' }}>#</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.accounts.map((item) => (
            <TableRow key={v4()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">
                <AccountContext.Provider key={uuidv4()} value={item}>
                  <ButtonGroup variant="contained" size="small">
                    <BillInsert key={uuidv4()} reloadCallback={props.reloadCallback} />
                    <BillList reloadCallback={props.reloadCallback} />
                  </ButtonGroup>
                </AccountContext.Provider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AccountWidget
