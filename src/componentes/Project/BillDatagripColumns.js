import React from 'react'
import { Button, ButtonGroup, Chip } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import moment from 'moment'
import * as PropTypes from 'prop-types'

function CurrencyFormat(props) {
  return null
}

CurrencyFormat.propTypes = {
  fixedDecimalScale: PropTypes.bool,
  thousandSeparator: PropTypes.string,
  renderText: PropTypes.func,
  prefix: PropTypes.string,
  value: PropTypes.string,
  decimalSeparator: PropTypes.string,
  displayType: PropTypes.string,
}
const BillDatagripColumns = () => [
  {
    field: 'acoes',
    headerName: 'Ações',
    width: 210,
    editable: false,
    renderCell: (params) => (
      <>
        <ButtonGroup variant="text" aria-label="outlined primary button group">
          {params.row.pay_day == null ? (
            <>
              <Button
                variant="contained"
                color="success"
                title="Pagar conta"
                size="small"
                disabled={params.row.pay_day !== null}
              >
                <AttachMoneyIcon />
              </Button>
              <Button
                variant="contained"
                color="warning"
                title="Editar conta"
                size="small"
                disabled={params.row.pay_day !== null}
              >
                <ModeEditIcon />
              </Button>
              <Button
                variant="contained"
                color="error"
                title="Excluir conta"
                size="small"
                disabled={params.row.pay_day !== null}
              >
                <DeleteForeverIcon />
              </Button>
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
    ),
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
    valueGetter: (params) => params.row.category.name,
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
    valueGetter: (params) => moment(params.row.pay_day).format('DD/MM/YYYY'),
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
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
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

export default BillDatagripColumns

const styles = {
  positive: {
    color: '#061957',
  },
  negative: {
    color: '#F00',
  },
}
