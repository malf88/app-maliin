import SearchField from '../../utils/assets/SearchField'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CategoryService from '../../../services/CategoryService'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useHistory } from 'react-router-dom'
import { ShimmerBadge, ShimmerTable } from 'react-shimmer-effects'
import { ConfirmBox } from '../../utils/components/ConfirmBox'
import { deleteCategory } from '../../../actions/CategoryAction'

const Categories = () => {
  const [categoryList, setCategoryList] = useState([])
  const [idCategory, setIdCategory] = useState(null)
  const [visibleModalDelete, setVisibleModalDelete] = useState(false)
  useEffect(() => {
    async function fetchData() {
      if (categoryList.length === 0) {
        let categoryService = new CategoryService()
        categoryService.getCategories().then((response) => {
          setCategoryList(response.data)
        })
      }
    }
    fetchData()
  }, [categoryList])
  const columnsCategories = [
    {
      dataField: 'id',
      text: 'Id',
      headerStyle: { width: 65 },
      searchable: false,
      headerAttrs: { scope: 'col' },
    },
    {
      dataField: 'name',
      text: 'Name',
      headerStyle: { width: '50%' },
      headerAttrs: { scope: 'col' },
    },
    {
      dataField: 'investment',
      headerStyle: { width: 60 },
      style: { color: '#058a05' },
      text: 'Investment',
      align: 'center',
      headerAttrs: { scope: 'col' },
    },
    {
      dataField: 'actions',
      headerStyle: { width: 30 },
      text: 'Actions',
      headerAttrs: { scope: 'col' },
    },
  ]
  const rowsTableCategories = (categories) => {
    let categoriesRow = []
    categories.forEach((item, index) => {
      categoriesRow.push({
        id: '#' + item.id,
        name: item.name,
        investment: item.is_investiment ? <CIcon icon={icon.cilCheck} /> : '',
        actions: (
          <CButtonGroup>
            <CButton
              color="danger"
              title="Delete category"
              onClick={() => {
                setIdCategory(item.id)
                setVisibleModalDelete(true)
              }}
            >
              <CIcon icon={icon.cilX} />
            </CButton>
            <CButton
              color="warning"
              title="Edit category"
              onClick={() => {
                history.push('/categories/edit?id=' + item.id)
              }}
            >
              <CIcon icon={icon.cilPen} />
            </CButton>
          </CButtonGroup>
        ),
      })
    })
    return categoriesRow
  }

  const options = {
    hideSizePerPage: true,
    sizePerPageList: [
      {
        text: '15',
        value: 15,
      },
      {
        text: 'All',
        value: rowsTableCategories(categoryList).length,
      },
    ],
  }
  let history = useHistory()
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Categories</strong>
          </CCardHeader>
          <CCardBody>
            <ConfirmBox
              onOk={() => {
                deleteCategory(idCategory, setCategoryList)
              }}
              onCancel={() => {}}
              okLabel="Sim"
              cancelLabel="Não"
              setVisible={setVisibleModalDelete}
              visible={visibleModalDelete}
              message="Do you really want to delete the registry?"
            />
            <CButton
              color="success"
              title="Insert category"
              size="lg"
              className="rounded-circle mb-4"
              onClick={() => history.push('/categories/insert')}
            >
              <CIcon icon={icon.cilPlus} />
            </CButton>
            {categoryList.length === 0 ? (
              <>
                <ShimmerBadge width={300} />
                <ShimmerTable row={2} col={4} />
              </>
            ) : (
              <ToolkitProvider
                keyField="id"
                data={rowsTableCategories(categoryList)}
                columns={columnsCategories}
                search
                bootstrap4
              >
                {(props) => (
                  <div>
                    {/* eslint-disable-next-line react/prop-types */}
                    <SearchField {...props.searchProps} />
                    <hr />

                    <BootstrapTable
                      noDataIndication="No registry"
                      bordered={false}
                      striped={true}
                      hover={true}
                      wrapperClasses="table-responsive-md"
                      {
                        /* eslint-disable-next-line react/prop-types */
                        ...props.baseProps
                      }
                      pagination={paginationFactory(options)}
                    />
                  </div>
                )}
              </ToolkitProvider>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Categories
