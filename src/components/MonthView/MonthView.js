import React, { Component } from 'react'
import SingleSubscription from '../SingleSubscription/SingleSubscription'

class MonthView extends Component {
  showSubscriptions() {
    return this.props.subscriptions.map((subscriptionObj, index) => {
      return <SingleSubscription key={index} subscription={subscriptionObj} />
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
      <div>
        <h2>{this.props.month}</h2>
        {this.props.subscriptions.length > 0 && this.showSubscriptions()}
        <h3>Total $ </h3>
      </div>
    )
  }
}

export default MonthView
