import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PropTypes from 'prop-types'
import { deleteSharedAccount, getListSharedAccount } from './AccountActions'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import InsertShareEmail from './InsertShareEmail'
import { toast } from 'react-toastify'
const ShareDatagrid = (props) => {
  ShareDatagrid.propTypes = {
    accountId: PropTypes.number,
    openModalShare: PropTypes.bool,
  }
  const [backdrop, setBackdrop] = useState(false)
  const [userList, setUserList] = useState([])
  const getUsers = async () => {
    setBackdrop(true)

    let users = await getListSharedAccount(props.accountId)
    setUserList(users)
    setBackdrop(false)
  }
  useEffect(() => {
    getUsers()
  }, [props.openModalShare])
  const deleteShare = async (idUser, idAccount) => {
    setBackdrop(true)
    await deleteSharedAccount(idAccount, idUser)
      .then((response) => {
        toast.success('Compartilhamento excluído com sucesso!')
        getUsers()
      })
      .catch((error) => {
        toast.error('Erro ao excluir compartilhamento!')
        setBackdrop(false)
      })
  }
  const columns = [
    {
      field: 'acoes',
      /*eslint unicode-bom: ["error", "never"]*/
      headerName: 'Ações',
      width: 80,
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
              onClick={() => deleteShare(params.row.pivot.user_id, params.row.pivot.account_id)}
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
    {
      field: 'google_id',
      headerName: 'S.',
      width: 50,
      renderCell: (param) => {
        return param.row.google_id !== null ? (
          <span title="Ativo">
            <RadioButtonCheckedIcon color="info" />
          </span>
        ) : (
          <span title="Inativo">
            <RadioButtonUncheckedIcon color="info" />
          </span>
        )
      },
    },
  ]
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <InsertShareEmail
        accountId={props.accountId}
        setBackdrop={setBackdrop}
        reloadGrid={getUsers}
      />
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
