import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import './SingleSubscription.css'

class SingleSubscription extends Component {

  getDueDate(monthCode) {
    let dueDate = new Date(this.props.subscription['due_date'])
    let now = new Date()
    dueDate.setHours(30)
    console.log(dueDate)
    console.log(now)
    dueDate.setMonth(monthCode)
    console.log(dueDate.getDate())
    let realMonthCode = monthCode > 11 ? monthCode - 12 : monthCode
    if(dueDate.getMonth() !== realMonthCode) {
    dueDate.setDate(0)
    } 
    return dueDate.getDate()
  }

  render() {
    return (
      <Row>
        <Col><p className='Subscription-text'>{this.props.subscription.name}</p></Col>
        <Col><p className='Subscription-text'>Due on {this.getDueDate(this.props.monthCode)}</p></Col>
        <Col><p className='Subscription-text'>$ {this.props.subscription.payment}</p></Col>
      </Row>
    )
  }
}

export default SingleSubscription
