import {
  CButton,
  CButtonGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CreditCardService from '../../../services/CreditCardService'
import { promiseLoader } from '../../utils/assets/Alerts'
import { ShimmerTable } from 'react-shimmer-effects'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import SearchField from '../../utils/assets/SearchField'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { ConfirmBox } from '../../utils/components/ConfirmBox'
import { deleteCreditCard } from '../../../actions/CreditCardAction'
import { CreditCardInsert } from './CreditCardInsert'
import { CreditCardEdit } from './CreditCardEdit'

const CreditCards = (props) => {
  CreditCards.propTypes = {
    accountId: PropTypes.number,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    accountIdCallback: PropTypes.func,
  }
  const [loadList, setLoadList] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleInsert, setVisibleInsert] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [creditCardId, setCreditCardId] = useState(null)
  const [creditCardList, setCreditCardList] = useState([])
  const onCloseModal = () => {
    props.modalVisibleCallback(false)
  }
  useEffect(() => {
    function loadCreditCard() {
      if (props.modalVisibleState === true && creditCardList.length === 0 && !loadList) {
        let creditCardService = new CreditCardService()
        setLoadList(true)
        let promiseCreditCard = creditCardService
          .getCreditCards(props.accountId)
          .then((response) => {
            setCreditCardList(response.data)
            setLoadList(false)
          })
        promiseLoader(promiseCreditCard)
      }
    }
    loadCreditCard()
  }, [props.modalVisibleState, props.accountId, creditCardList, loadList])
  const columnsCreditCard = [
    {
      dataField: 'id',
      text: '#',
      headerStyle: { width: 10, textAlign: 'center' },
      align: 'center',
      searchable: false,
      headerAttrs: { scope: 'col' },
    },
    {
      dataField: 'name',
      text: 'Name',
      headerStyle: { width: 50 },
      headerAttrs: { scope: 'col' },
    },
    {
      dataField: 'due_day',
      text: 'Due day',
      headerStyle: { width: 10 },
      headerAttrs: { scope: 'col' },
    },
    {
      dataField: 'close_day',
      text: 'Close day',
      headerStyle: { width: 10 },
      headerAttrs: { scope: 'col' },
    },
    {
      dataField: 'actions',
      text: 'Actions',
      headerStyle: { width: 20, textAlign: 'center' },
      headerAttrs: { scope: 'col' },
      align: 'center',
    },
  ]
  const options = {
    hideSizePerPage: true,
  }
  const rowsTableCreditCard = (creditCards) => {
    let creditCardRow = []
    creditCards.forEach((item, index) => {
      creditCardRow.push({
        id: '#' + item.id,
        name: item.name,
        due_day: item.due_day,
        close_day: item.close_day,
        actions: (
          <>
            <CButtonGroup>
              <CButton
                color="danger"
                onClick={() => {
                  setCreditCardId(item.id)
                  setVisibleDelete(true)
                }}
              >
                <CIcon icon={icon.cilX} />
              </CButton>
              <CButton
                color="warning"
                onClick={() => {
                  setVisibleEdit(true)
                  setCreditCardId(item.id)
                }}
              >
                <CIcon icon={icon.cilPen} />
              </CButton>
            </CButtonGroup>
          </>
        ),
      })
    })
    return creditCardRow
  }
  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      onClosePrevented={onCloseModal}
      size="xl"
    >
      <CModalHeader onClose={onCloseModal}>
        <CModalTitle>List credit cards from account #{props.accountId}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CreditCardInsert
          accountIdCallback={props.accountIdCallback}
          accountId={props.accountId}
          modalVisibleCallback={setVisibleInsert}
          modalVisibleState={visibleInsert}
          actionAfterInsert={setCreditCardList}
        />
        <CreditCardEdit
          accountIdCallback={props.accountIdCallback}
          accountId={props.accountId}
          creditCardId={creditCardId}
          creditCardIdCallback={setCreditCardId}
          actionAfterUpdate={setCreditCardList}
          modalVisibleCallback={setVisibleEdit}
          modalVisibleState={visibleEdit}
        />
        <CButton
          color="success"
          title="Insert category"
          size="lg"
          className="rounded-circle mb-4"
          onClick={() => {
            setVisibleInsert(true)
          }}
        >
          <CIcon icon={icon.cilPlus} />
        </CButton>
        <ConfirmBox
          visible={visibleDelete}
          setVisible={setVisibleDelete}
          onCancel={() => {}}
          onOk={() => {
            deleteCreditCard(creditCardId, setCreditCardList)
          }}
          message="Do you really want to delete credit card?"
          cancelLabel="No"
          okLabel="Yes"
        />
        {creditCardList.length === 0 ? (
          <ShimmerTable row={5} col={5} />
        ) : (
          <ToolkitProvider
            keyField="id"
            data={rowsTableCreditCard(creditCardList)}
            columns={columnsCreditCard}
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
      </CModalBody>
      <CModalFooter></CModalFooter>
    </CModal>
  )
}
export default CreditCards
