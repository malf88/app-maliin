export const columnsBill = [
  {
    dataField: 'C',
    text: 'C.',
    headerStyle: { width: 20, textAlign: 'center' },
    style: { color: '#029402' },
    align: 'center',
    searchable: false,
    headerAttrs: { scope: 'col' },
  },
  {
    dataField: 'id',
    text: 'Id',
    headerStyle: { width: 65 },
    searchable: false,
    headerAttrs: { scope: 'col' },
  },
  {
    dataField: 'description',
    text: 'Description',
    headerStyle: { width: 320 },
    headerAttrs: { scope: 'col' },
  },
  {
    dataField: 'category',
    headerStyle: { width: 120 },
    text: 'Category',
    headerAttrs: { scope: 'col' },
  },
  {
    dataField: 'date',
    text: 'Date',
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 100 },
  },
  {
    dataField: 'due_date',
    text: 'Due Date',
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 100 },
  },
  {
    dataField: 'amount',
    text: 'Amount',
    searchable: false,
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 120 },
  },
  {
    dataField: 'actions',
    text: 'Actions',
    searchable: false,
    style: { width: 120, color: '#035203' },
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 100 },
  },
]

export const columnsChildBill = [
  {
    dataField: 'id',
    text: 'Id',
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 80 },
    searchable: false,
  },
  {
    dataField: 'description',
    text: 'Description',
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 200 },
  },
  {
    dataField: 'due_date',
    text: 'Due Date',
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 100 },
  },
  {
    dataField: 'amount',
    text: 'Amount',
    headerAttrs: { scope: 'col' },
    headerStyle: { width: 120 },
  },
  {
    headerStyle: { width: 80 },
    headerAttrs: { scope: 'col' },
    dataField: 'paid',
    text: 'Paid',
    style: { color: '#035203' },
  },
]
