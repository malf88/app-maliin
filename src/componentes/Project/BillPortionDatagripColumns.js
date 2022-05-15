import React from 'react'
import moment from 'moment'

const BillPortionDatagripColumns = () => {
  return [
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

export default BillPortionDatagripColumns

const styles = {
  positive: {
    color: '#061957',
  },
  negative: {
    color: '#F00',
  },
}
