import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import moment from 'moment/moment'
import { listBillsBetween } from '../Project/BillActions'
import PropTypes from 'prop-types'
import ptBR from 'moment/locale/pt-br'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const labels = [moment().format('MMMM')]
const ReceitasDespesas = (props) => {
  ReceitasDespesas.propTypes = {
    account: PropTypes.object,
  }
  moment().locale(ptBR.locale)
  const startDate = moment().startOf('month').format('YYYY-MM-DD')
  const endDate = moment().endOf('month').format('YYYY-MM-DD')
  const [bills, setBills] = useState({
    total: { total_cash_in: 0, total_cash_out: 0, total_estimated: 0, total_paid: 0 },
  })
  const data = {
    labels,
    datasets: [
      {
        label: 'Receitas',
        data: [bills.total.total_cash_in],
        backgroundColor: 'rgb(0,84,239)',
      },
      {
        label: 'Despesas',
        data: [bills.total.total_cash_out * -1],
        backgroundColor: 'rgb(210,29,29)',
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text:
          props.account.name + ' - ' + moment().format('MMMM') + ' / ' + moment().format('YYYY'),
      },
    },
  }
  useEffect(() => {
    async function getList() {
      setBills(await listBillsBetween(props.account.id, startDate, endDate))
    }
    getList()
  }, [])
  return <Bar options={options} data={data} />
}

export default ReceitasDespesas
