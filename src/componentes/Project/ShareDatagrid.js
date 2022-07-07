import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PropTypes from 'prop-types'
import { getListSharedAccount } from './AccountActions'

const ShareDatagrid = (props) => {
  ShareDatagrid.propTypes = {
    accountId: PropTypes.number,
    openModalShare: PropTypes.bool,
  }
  const [backdrop, setBackdrop] = useState(false)
  const [userList, setUserList] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      setBackdrop(true)
      //setBillList([])
      let users = await getListSharedAccount(props.accountId)
      setUserList(users)
      setBackdrop(false)
    }
    getUsers()
  }, [props.openModalShare])
  const columns = [
    {
      field: 'acoes',
      /*eslint unicode-bom: ["error", "never"]*/
      headerName: 'Ações',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              key={uuidv4}
              variant="contained"
              color="error"
              title="Remover compartilhamento"
              size="small"
            >
              <DeleteForeverIcon />
            </Button>
          </>
        )
      },
    },
    {
      field: 'first_name',
      headerName: 'Nome',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 200,
    },
  ]
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DataGrid
        autoHeight
        disableColumnSelector
        sx={{ mt: 5 }}
        density="compact"
        columnBuffer={8}
        rows={userList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </>
  )
}

export default ShareDatagrid
