import { toast } from 'react-toastify'
import { React } from 'react'
export const promiseDelete = (promise) => {
  toast.promise(
    promise,
    {
      pending: 'Removing record',
      success: 'Registration removed',
      error: 'There was an error removing the registry',
    },
    {
      theme: 'colored',
    },
  )
}
export const promiseLoader = (promise) => {
  toast.promise(
    promise,
    {
      pending: 'Loading data...',
      success: 'Data loaded',
      error: 'There was an error downloading the data.',
    },
    {
      theme: 'colored',
    },
  )
}
const parseError = (errors) => {
  let messages = []
  for (let error in errors) {
    for (let messagesError in errors[error]) {
      messages.push(errors[error][messagesError])
    }
  }
  return messages
}
export const promiseUpdate = (promise) => {
  toast.promise(
    promise,
    {
      pending: 'Updating data...',
      success: 'Record updated',
      error: {
        render({ data }) {
          return parseError(data.response.data.errors).map((item, index) => {
            return <div key={index}>{item}</div>
          })
        },
      },
    },
    {
      theme: 'colored',
    },
  )
}

export const promiseInfo = (message, promise) => {
  toast.promise(
    promise,
    {
      pending: 'Processing...',
      success: message,
      error: 'Error in process!',
    },
    {
      theme: 'colored',
    },
  )
}

export const alertsSuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'colored',
  })
}
export const alertsError = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'colored',
  })
}
export const alertsWarning = (message) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'colored',
  })
}
