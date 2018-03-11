import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (e) => {
    this.props.filterChange(e.target.value)
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange}
          name='filter'/>
      </div>
    )
  }
}

export default connect(null, {filterChange})(Filter)