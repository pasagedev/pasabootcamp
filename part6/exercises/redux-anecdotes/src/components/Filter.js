import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = ({target}) => {
    const filterValue = target.value
    props.changeFilter(filterValue)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(
  null,
  {changeFilter}
)(Filter)

export default ConnectedFilter