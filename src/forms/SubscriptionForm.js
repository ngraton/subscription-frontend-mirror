import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';


class Subscription extends Component {
  state = {
    name: '',
    due_date: '',
    interval:'',
    payment: 0,
    user: null
  }

  onChange = async (e) => {
    await this.setState({
      name: document.getElementById('name').value,
      due_date: document.getElementById('due_date').value,
      interval: document.getElementById('interval').value,
      payment: document.getElementById('payment').value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    //Post request to API creating a new subscription
  }
  render () {
    return (
      <div align='center'>
         <Form onChange={this.onChange}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="name"/>
            <br/>
            <Form.Text>Name of subscription</Form.Text>
          </Form.Group>
          <Form.Group controlId="due_date">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group controlId="payment">
            <Form.Label>Cost</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group controlId="interval">
            <Form.Label>Payment Interval</Form.Label>
            <Form.Control type="number" />
            <br/>
            <Form.Text>How often payment is required in days</Form.Text>
          </Form.Group>
          <input onClick={this.onSubmit} type="submit"/>
        </Form>
      </div>
    )
  }
}

export default Subscription;
