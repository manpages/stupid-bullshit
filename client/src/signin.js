import * as API   from './api.js'
import      React from 'react/addons'

export default React.createClass({
  userChange(evt): void {
    this.setState({user: evt.target.value})
  },
  passwordChange(evt): void {
    this.setState({password: evt.target.value})
  },
  signin(): void {
    API.signin(this.state.user, this.state.password)
  },
  signup(): void {
    API.signup(this.state.user, this.state.password)
  },
  render(): any {
    return <div>
      <h1>Sign in or sign up</h1>
      <input type="text"     onChange={this.userChange}   />
      <input type="password" onChange={this.passwordChange} />
      <button id="signin" onClick={this.signin}>Sign in</button>
      <button id="signup" onClick={this.signup}>Sign up</button>
    </div>
  }
})
