import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class SingleSubscription extends Component {
  getDueDate() {
    let dueDate = this.props.subscription['due_date'].split('-')
    console.log(dueDate)
    return dueDate[dueDate.length - 1]
  }

  render() {
    return (
      <div>
        <h2>{this.props.subscription.name}</h2>
        <h3>Due on {this.getDueDate()}</h3>
        <h3>$ {this.props.subscription.payment}</h3>
      </div>
    )
  }
}

export default SingleSubscription
