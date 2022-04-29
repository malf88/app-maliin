import React from 'react'
import { Button, ButtonGroup, Chip } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import moment from 'moment'
import ButtonPay from './ButtonPay'
import ButtonDeleteBill from './ButtonDeleteBill'
import ButtonEditBill from './ButtonEditBill'

const BillDatagripColumns = (reloadGrid, accountId) => {
  return [
    {
      field: 'acoes',
      /*eslint unicode-bom: ["error", "never"]*/
      headerName: 'Ações',
      width: 210,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <ButtonGroup variant="text" aria-label="outlined primary button group">
              {params.row.pay_day == null ? (
                <>
                  <ButtonPay key={'u' + params.row.id} reloadGrid={reloadGrid} row={params.row} />
                  <ButtonEditBill
                    key={'e' + params.row.id}
                    reloadGrid={reloadGrid}
                    row={params.row}
                    accountId={accountId}
                  />
                  <ButtonDeleteBill
                    key={'d' + params.row.id}
                    reloadGrid={reloadGrid}
                    row={params.row}
                  />
                </>
              ) : (
                <Chip label="Pago!" icon={<AttachMoneyIcon />} color="success" />
              )}
              {params.row.credit_card_id !== null ? (
                <Button
                  color="info"
                  title="Ver fatura do cartão de crédito"
                  size="small"
                  variant="contained"
                >
                  <CreditCardIcon />
                </Button>
              ) : (
                ''
              )}
            </ButtonGroup>
          </>
        )
      },
    },
    { field: 'creditcard_id', headerName: 'C.', width: 15 },
    { field: 'id', headerName: '#', width: 90 },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 280,
      editable: false,
    },

    {
      field: 'category',
      valueGetter: (params) =>
        params.row.category !== null ? params.row.category.name : 'Cartão de crédito',
      headerName: 'Categoria',
      type: 'string',
      width: 110,
      editable: false,
    },
    {
      field: 'due_date',
      headerName: 'Vencimento',
      width: 110,
      valueGetter: (params) => moment(params.row.due_date).format('DD/MM/YYYY'),
      type: 'date',
      editable: false,
    },
    {
      field: 'date',
      valueGetter: (params) => moment(params.row.date).format('DD/MM/YYYY'),
      headerName: 'Data',
      type: 'date',
      width: 110,
      editable: false,
    },
    {
      field: 'pay_day',
      valueGetter: (params) =>
        params.row.pay_day != null ? moment(params.row.pay_day).format('DD/MM/YYYY') : '',
      headerName: 'Pagamento',
      type: 'date',
      width: 110,
      editable: false,
    },
    {
      field: 'amount',
      valueGetter: (params) => {
        let formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
        return formatter.format(params.row.amount)
      },
      headerName: 'Valor',
      width: 110,
      editable: false,
      renderCell: (params) => {
        return (
          <span style={params.row.amount >= 0 ? styles.positive : styles.negative}>
            {params.formattedValue}
          </span>
        )
      },
    },
  ]
}

export default BillDatagripColumns

const styles = {
  positive: {
    color: '#061957',
  },
  negative: {
    color: '#F00',
  },
}
