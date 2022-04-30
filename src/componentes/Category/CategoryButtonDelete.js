import React, { useState } from 'react'
import { Button } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CategoryDelete from '../../pages/categories/CategoryDelete'
import PropTypes from 'prop-types'

const CategoryButtonDelete = (props) => {
  CategoryButtonDelete.propTypes = {
    category: PropTypes.object,
    reloadCallback: PropTypes.func,
  }
  const [deleteCategory, setDeleteCategory] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const handleShowDelete = (state) => {
    setShowDelete(state)
  }
  return (
    <>
      <Button
        key={'bd' + props.category.id}
        color="error"
        title="Excluir categoria"
        size="small"
        onClick={() => handleShowDelete(true)}
      >
        <DeleteForeverIcon />
      </Button>
      <CategoryDelete
        key={'d' + props.category.id}
        category={props.category}
        reloadCallback={props.reloadCallback}
        callbackOpenDialog={handleShowDelete}
        openDialogDelete={showDelete}
      />
    </>
  )
}

export default CategoryButtonDelete
