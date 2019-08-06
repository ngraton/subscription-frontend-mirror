import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import SubscriptionsAPI from '../api/SubscriptionsAPI';

class Subscription extends Component {
  state = {
    name: '',
    due_date: '',
    interval:'',
    payment: 0,
    user: null,
    userDone: false
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
      let subscriptionObject = {
        "name": this.state.name,
        "due_date": this.state.due_date,
        "payment": this.state.payment,
        "interval": this.state.interval,
        "user": this.props.userID,
      }
      SubscriptionsAPI.addSubscription(subscriptionObject)
      document.getElementById("subscription_form").reset()
    }
  }

  onClickDone = (e) => {
    if (this.state.name && this.state.due_date && this.state.interval && this.state.payment) {
      e.preventDefault()
      //Post request to API creating a new subscription
      this.setState({userDone: true})
    }
  }

  render () {
    console.log(this.state)
    return (
      <div align='center'>
        {this.state.userDone && <Redirect to="/" />}
         <Form id="subscription_form" onChange={this.onChange}>
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
