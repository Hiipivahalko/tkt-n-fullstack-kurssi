import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {

  static propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visble: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visble: !this.state.visble })
  }

  render() {
    const hideWhenVisible = { display: this.state.visble ? 'none' : '' }
    const showWhenVisible = { display: this.state.visble ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

export default Togglable