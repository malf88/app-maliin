import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, Button, ButtonGroup, CircularProgress, Skeleton } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { listCategories } from '../../componentes/Category/CategoryActions'
import CategoryButtonDelete from '../../componentes/Category/CategoryButtonDelete'
import { v4 } from 'uuid'

const CategoryList = (props) => {
  CategoryList.propTypes = {
    setCategoryId: PropTypes.func,
    categoryId: PropTypes.number,
  }
  const [backdrop, setBackdrop] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    async function loadListCategory() {
      setBackdrop(true)
      let list = await listCategories()
      setCategoryList(list)
      setBackdrop(false)
    }

    loadListCategory()
  }, [deleteCategory])

  const reloadTable = () => {
    setDeleteCategory(v4())
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
              key={'u' + params.row.id}
              color="primary"
              title="Editar categoria"
              size="small"
              onClick={() => props.setCategoryId(params.row.id)}
            >
              <ModeEditIcon />
            </Button>
            <CategoryButtonDelete
              reloadCallback={reloadTable}
              key={'db' + params.row.id}
              category={params.row}
            />
          </ButtonGroup>
        </>
      ),
    },
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 300,
      editable: false,
    },
    {
      field: 'is_investment',
      headerName: 'Investimento?',
      width: 110,
      editable: false,
      renderCell: (params) => {
        return params.row.is_investiment && 'Sim'
      },
    },
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {backdrop ? (
        <Skeleton sx={{ mt: -5 }} animation="wave" width={'100%'} height={'100%'} />
      ) : (
        <DataGrid
          sx={{ mt: 5 }}
          density="compact"
          columnBuffer={2}
          columnThreshold={2}
          rows={categoryList}
          columns={columns}
          pageSize={15}
          disableSelectionOnClick
        />
      )}
    </div>
  )
}

export default CategoryList
