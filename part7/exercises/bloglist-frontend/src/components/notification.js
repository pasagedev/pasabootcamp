import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const { notification, error } = useSelector(state => state.notification)

  const variant = error
    ? 'danger'
    : 'success'

  return !notification
    ? null
    : (
      <Alert variant={variant}>
        {notification}
      </Alert>)
}