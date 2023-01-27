import React from 'react'

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className='ErrorMessage'>{message}</div>
}

export default ErrorMessage