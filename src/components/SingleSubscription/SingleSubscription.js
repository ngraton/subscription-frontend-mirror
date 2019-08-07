import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class SingleSubscription extends Component {
  
  getDueDate() {
    let dueDate = this.props.subscription['due_date'].split('-')
    return dueDate[dueDate.length - 1]
  }

  render() {
    return (
      <Row>
        <Col><h3>{this.props.subscription.name}</h3></Col>
        <Col><h3>Due on {this.getDueDate()}</h3></Col>
        <Col><h3>$ {this.props.subscription.payment}</h3></Col>
      </Row>
    )
  }
}

export default SingleSubscription
