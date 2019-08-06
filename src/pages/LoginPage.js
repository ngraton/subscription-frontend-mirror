import React, { Component } from 'react';
import { Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import UsersAPI from '../api/UsersAPI';

class LoginPage extends Component {
  state = {
    username: '',
    redirectHome: false,
    redirectNewSub: false
  }
  
  onChange = async (e) => {
    await this.setState({username:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let userArr = []
    UsersAPI.getUserByUsername(this.state.username)
      .then(jsonResponse => {userArr = jsonResponse})
      .then(_res => {
        if (userArr.length > 0) {
          localStorage.setItem('username', this.state.username)
          this.props.setUsername(this.state.username)
          this.setState({redirectHome: true})
        } else {
          UsersAPI.addUserByUsername(this.state.username)
          .then(_jsonResponse => {
            this.props.setUsername(this.state.username)
            localStorage.setItem('username', this.state.username)
          })
          .then(_res => this.setState({redirectNewSub: true}))
        }
      })
  }

  render () {
    return (
      <Container>
        {this.state.redirectHome && <Redirect to='/' />}
        {this.state.redirectNewSub && <Redirect to='/addSubscription' />}
        <div align='center'>
        <h2>Login / Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formUserName">
            <Form.Label>username</Form.Label>
            <Form.Control type="text" placeholder="username" onChange={this.onChange}/>
          </Form.Group>
          <button type="submit">Submit</button>
        </Form>
        </div>
      </Container>
    )
  }
}
export default LoginPage;