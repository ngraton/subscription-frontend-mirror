import React, { Component } from 'react'
import SingleSubscription from '../SingleSubscription/SingleSubscription'
import { Container, Row, Col } from 'react-bootstrap'

class MonthView extends Component {

  getMonthlyTotal(){
    let totalCost = 0
    for (let i=0; i < this.props.subscriptions.length; i++){
      let subscription = this.props.subscriptions[i]
      totalCost += subscription.payment
    }
    return totalCost
  }

  showSubscriptions() {
    return this.props.subscriptions.map((subscriptionObj, index) => {
      return <SingleSubscription key={index} subscription={subscriptionObj} edit={false}/>
    })
  }

// subscriptionObj
// {
//   "id": 1,
//   "name": "big bill",
//   "due_date": "2019-08-14",
//   "payment": 100000,
//   "interval": "annual",
//   "user": 1
// }

  render() {
    return (
      <Container>
        <h2>{this.props.month}</h2>
        <Container>
          {this.props.subscriptions.length > 0 && this.showSubscriptions()}
        </Container>
        <Row>
        <Col></Col>
          <Col>
            <h3>Total $ {this.getMonthlyTotal()}</h3>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default MonthView
