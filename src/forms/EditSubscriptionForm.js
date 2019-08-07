import React from 'react';
import { Form, Button } from 'react-bootstrap';

class EditSubscriptionForm extends React.Component {

  render() {
    return (
      <div>
        <Form id="subscription_form" onChange={this.onChange} className="px-5 py-4">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="name"/>
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
          </Form.Group>
          <Button onClick={this.onClickDone} type="submit" className="ml-2">Done</Button>
        </Form>
      </div>
    )
  }
}

export default EditSubscriptionForm;