import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

class SingleSubscription extends Component {

  getDueDate(monthCode) {
    let dueDate = new Date(this.props.subscription['due_date'])
    dueDate.setMonth(monthCode)
    dueDate.setHours(10)
    let realMonthCode = monthCode > 11 ? monthCode - 12 : monthCode
    if(dueDate.getMonth() !== realMonthCode) {
    dueDate.setDate(0)
    } 
    return dueDate.getDate()
  }

  render() {
    return (
      <Row>
        <Col><p>{this.props.subscription.name}</p></Col>
        <Col><p>Due on {this.getDueDate(this.props.monthCode)}</p></Col>
        <Col><p>$ {this.props.subscription.payment}</p></Col>
      </Row>
    )
  }
}

export default SingleSubscription
