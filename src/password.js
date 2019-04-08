import React, { Component } from 'react'
import { connect } from 'react-redux'
import zxcvbn from 'zxcvbn'

import { addPassword } from './actions'

class Password extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      name: 'My Password',
      password: 'p@ssw0rd',
    }

    this.setPassword = this.setPassword.bind(this)
    this.setName = this.setName.bind(this)
  }

  generatePassword() {
    // https://bit.ly/2GaxI2i -- "Math.random().toString(36).slice(-8)"
    let newPassword = Math.random().toString(36).slice(-8)
    this.setState({ password: newPassword })
  }

  setPassword(e) {
    let newPassword = e.target.value
    this.setState({ password: newPassword })
  }

  setName(e) {
    let newName = e.target.value
    this.setState({ name: newName })
  }

  evaluatePassword() {
    let data = zxcvbn(this.state.password)
    return data.score
  }

  render() {
    return (
      <div>
        <input type="text" name="name" onChange={this.setName} value={this.state.name} />
        <input type="text" name="password" onChange={this.setPassword} value={this.state.password} />
        
        <p>Password Safety: {this.evaluatePassword()}/4</p>
        <div>
          <button onClick={(e) => {
            this.generatePassword()
          }}>Generate</button>
        </div>

        <div>
          <button onClick={(e) => {
            this.props.addPassword(this.state.name, this.state.password)
          }}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = () => {
  return {
    addPassword
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Password)
