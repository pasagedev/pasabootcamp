import React, { useState } from 'react'

export const Togglable = ({ children, showButtonLabel, hideButtonLabel }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisivility = () => setVisible(!visible)

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisivility}>{showButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisivility}>{hideButtonLabel}</button>
      </div>
    </div>
  )
}