import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export const Togglable = ({ children, showButtonLabel, hideButtonLabel }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisivility = () => setVisible(!visible)

  const showHideButton = () => {
    return hideButtonLabel === 'cancel'
      ? <Button variant='secondary' onClick={toggleVisivility}>{hideButtonLabel}</Button>
      : <button onClick={toggleVisivility}>{hideButtonLabel}</button>
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisivility}>{showButtonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        {showHideButton()}
      </div>
    </div>
  )
}