import React from 'react'
import { ButtonGroup } from '@mui/material'
import moment from 'moment'
import ButtonPay from './ButtonPay'
import ButtonDeleteBill from './ButtonDeleteBill'
import ButtonEditBill from './ButtonEditBill'
import ButtonInvoice from './ButtonInvoice'
import CreditCardIcon from '@mui/icons-material/CreditCard'

const BillDatagripColumns = (reloadGrid, accountId) => {
  return [
    {
      field: 'acoes',
      /*eslint unicode-bom: ["error", "never"]*/
      headerName: 'Ações',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <ButtonGroup size="small" variant="text" aria-label="outlined primary button group">
              <ButtonPay key={'u' + params.row.key} reloadGrid={reloadGrid} row={params.row} />
              {params.row.credit_card_id === null && (
                <ButtonEditBill
                  key={'e' + params.row.key}
                  reloadGrid={reloadGrid}
                  row={params.row}
                  accountId={accountId}
                />
              )}
              {params.row.credit_card_id === null && (
                <ButtonDeleteBill
                  key={'d' + params.row.key}
                  reloadGrid={reloadGrid}
                  row={params.row}
                />
              )}

              {params.row.credit_card_id !== null && (
                <ButtonInvoice
                  key={'i' + params.row.key}
                  accountId={accountId}
                  row={params.row}
                  reloadGrid={reloadGrid}
                />
              )}
            </ButtonGroup>
          </>
        )
      },
    },
    {
      field: 'creditcard_id',
      headerName: 'C.',
      width: 15,
      renderCell: (param) => {
        return param.row.credit_card_id !== null ? <CreditCardIcon /> : ''
      },
    },
    { field: 'id', headerName: '#', width: 90 },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 330,
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
      valueGetter: (params) => moment(params.row.due_date).utc(false).format('DD/MM/YYYY'),
      type: 'date',
      editable: false,
    },
    {
      field: 'date',
      valueGetter: (params) => moment(params.row.date).utc(false).format('DD/MM/YYYY'),
      headerName: 'Data',
      type: 'date',
      width: 110,
      editable: false,
    },
    {
      field: 'pay_day',
      valueGetter: (params) =>
        params.row.pay_day != null
          ? moment(params.row.pay_day).utc(false).format('DD/MM/YYYY')
          : '',
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
