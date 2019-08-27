import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MonthGraphView from '../components/MonthGraphView/MonthGraphView';
import UsersAPI from '../api/UsersAPI';
import monthSorter from '../logic/monthSorter';

class MonthlyGraphPage extends Component {
  state = {
    loggedin: true,
    subscriptions: {}
  }

  componentDidMount() {
    if(localStorage.getItem('username')){
      UsersAPI.getUserByUsername(localStorage.getItem('username'))
        .then(response => response[0].subscriptions)
          .then(subscriptions => monthSorter.sortSubsByMonth(subscriptions))
            .then(sortedSubs => this.setState({subscriptions: sortedSubs}))
    }
  }

  generateSubscriptions() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date()
    let currentMonth = date.getMonth()
    let month = months[currentMonth]
    
    return <MonthGraphView month={month} subscriptions={this.state.subscriptions[month] ? this.state.subscriptions[month] : []} monthCode={currentMonth}/>
  }

  render() {
    return (
      <div>
        {this.state.loggedin === false && <Redirect to='/login'/>}
        {this.generateSubscriptions()}
      </div>
    )
  }
}

export default MonthlyGraphPage
