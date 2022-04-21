import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { listCreditCards } from '../../componentes/Projects/CreditCardActions'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, Button, ButtonGroup, CircularProgress, Skeleton } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CreditCardDelete from './CreditCardDelete'

const CreditCardList = (props) => {
  CreditCardList.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    setCreditCardId: PropTypes.func,
    creditCardId: PropTypes.number,
  }
  const [backdrop, setBackdrop] = useState(false)
  const [deleteCreditCard, setDeleteCreditCard] = useState(false)
  const [creditCardList, setCreditCardList] = useState([])
  useEffect(() => {
    async function loadListCreditCards() {
      if (!deleteCreditCard) {
        setBackdrop(true)
        let list = await listCreditCards(props.accountId)
        setCreditCardList(list)
        setBackdrop(false)
      }
    }
    loadListCreditCards()
  }, [deleteCreditCard, props.accountId])
  const handleShowDelete = (state) => {
    setDeleteCreditCard(state)
  }
  const columns = [
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 105,
      editable: false,
      renderCell: (params) => (
        <>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              color="primary"
              title="Editar cartão de crédito"
              size="small"
              onClick={() => props.setCreditCardId(params.row.id)}
            >
              <ModeEditIcon />
            </Button>
            <Button
              color="error"
              title="Excluir cartão de crédito"
              size="small"
              onClick={() => handleShowDelete(true)}
            >
              <DeleteForeverIcon />
            </Button>
          </ButtonGroup>
          <CreditCardDelete
            reloadCallback={props.reloadCallback}
            creditCardId={params.row.id}
            accountId={props.accountId}
            callbackOpenDialog={handleShowDelete}
            openDialogDelete={deleteCreditCard}
          />
        </>
      ),
    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      editable: false,
    },
    {
      field: 'due_day',
      headerName: 'Dia de vencimento',
      width: 110,
      type: 'number',
      editable: false,
    },
    {
      field: 'close_day',
      headerName: 'Dia de fechamento',
      type: 'number',
      width: 110,
      editable: false,
    },
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {backdrop ? (
        <Skeleton sx={{ mt: 5 }} animation="wave" width={'100%'} height={'100%'} />
      ) : (
        <DataGrid
          sx={{ mt: 5 }}
          density="compact"
          columnBuffer={2}
          columnThreshold={2}
          rows={creditCardList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      )}
    </div>
  )
}

export default CreditCardList
