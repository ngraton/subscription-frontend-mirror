import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import SubscriptionsAPI from '../api/SubscriptionsAPI';
import UsersAPI from '../api/UsersAPI'

class Subscription extends Component {
  state = {
    name: '',
    due_date: '',
    interval:'',
    payment: 0,
    user: null,
    userDone: false,
    loggedin: true,
    submitted: false,
    submittedName: ''
  }

  componentDidMount() {
    UsersAPI.getUserByUsername(this.props.username)
      .then(jsonResponse => {
        if (jsonResponse[0]) {
          this.setState({
          user: jsonResponse[0].id
        })
      }
    })
  }

  onChange = async (e) => {
    await this.setState({
      name: document.getElementById('name').value,
      due_date: document.getElementById('due_date').value,
      interval: document.getElementById('interval').value,
      payment: document.getElementById('payment').value
    })
  }

  onClickAddAnother = (e) => {
    if (this.state.name && this.state.due_date && this.state.interval && this.state.payment) {
      e.preventDefault()
      let subscriptionObj = {
        name: this.state.name,
        due_date: this.state.due_date,
        payment: this.state.payment,
        interval: this.state.interval,
        user: this.state.user
      }
      SubscriptionsAPI.addSubscription(subscriptionObj)
      this.setState({submitted: true, submittedName: this.state.name})
      document.getElementById("subscription_form").reset()
    }
  }

  onClickDone = (e) => {
    if (this.state.name && this.state.due_date && this.state.interval && this.state.payment) {
      e.preventDefault()
      let subscriptionObj = {
        name: this.state.name,
        due_date: this.state.due_date,
        payment: this.state.payment,
        interval: this.state.interval,
        user: this.state.user
      }
      SubscriptionsAPI.addSubscription(subscriptionObj)
      this.setState({userDone: true})
    }
  }


  render () {
    return (
      <div align='center'>
        {this.state.userDone && <Redirect to="/" />}
        {this.state.loggedin === false && <Redirect to='/login'/>}
        {this.state.submitted && <Alert variant="danger" onClose={() => this.setState({submitted: false})} dismissible>Your subscription to {this.state.submittedName} was added</Alert>}
         <Form id="subscription_form" onChange={this.onChange} className="px-5 py-4">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="name"/>
            <br/>
            <Form.Text>Name of subscription</Form.Text>
          </Form.Group>
          <Form.Group controlId="due_date">
            <Form.Label>Due Date</Form.Label>
            <Form.Control required type="date" />
          </Form.Group>
          <Form.Group controlId="payment">
            <Form.Label>Cost</Form.Label>
            <Form.Control required type="number" />
          </Form.Group>
          <Form.Group controlId="interval">
            <Form.Label>Payment Interval</Form.Label>
            <Form.Control required as="select">
              <option></option>
              <option>monthly</option>
              <option>quarterly</option>
              <option>annual</option>
            </Form.Control>
            <br/>
            <Form.Text>How often payment is required in days</Form.Text>
          </Form.Group>
          <Button onClick={this.onClickAddAnother} type="submit">Add Another</Button>
          <Button onClick={this.onClickDone} type="submit" className="ml-2">Done</Button>
        </Form>
      </div>
    )
  }
}

export default Subscription;