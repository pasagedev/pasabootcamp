import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const { notification, error } = useSelector(state => state)

  const className = error
    ? 'error'
    : 'success'

  return !notification
    ? null
    : (
      <div className={className}>
        {notification}
      </div>)
}