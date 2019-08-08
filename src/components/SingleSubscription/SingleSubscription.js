import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

const styles = {
  subscription_text: {
    fontWeight: 'normal',
    fontSize: '20px'
  }
}

class SingleSubscription extends Component {

  getDueDate(monthCode) {
    let dueDate = new Date(this.props.subscription['due_date'])
    dueDate.setMonth(monthCode)
    dueDate.setHours(30)
    dueDate.getMonth() !== monthCode && dueDate.setDate(0)
    return dueDate.getDate()
  }

  render() {
    return (
      <Row>
        <Col><p style={styles.subscription_text}>{this.props.subscription.name}</p></Col>
        <Col><p style={styles.subscription_text}>Due on {this.getDueDate(this.props.monthCode)}</p></Col>
        <Col><p style={styles.subscription_text}>$ {this.props.subscription.payment}</p></Col>
      </Row>
    )
  }
}

export default SingleSubscription
