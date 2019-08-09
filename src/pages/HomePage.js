import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MonthView from '../components/MonthView/MonthView';
import UsersAPI from '../api/UsersAPI';
import monthSorter from '../logic/monthSorter';

class HomePage extends Component {
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

  generateMonthLists() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date()
    let currentMonth = date.getMonth()
    let orderedMonths = months.slice(currentMonth)
    orderedMonths.push(...months.slice(0, currentMonth))
    const calcMonthCode = (index) => {
      let offset = currentMonth + index
      return offset
      } 
    
    
    return orderedMonths.map((month, index) => {
      return <MonthView key={index} month={month} subscriptions={this.state.subscriptions[month] ? this.state.subscriptions[month] : []} monthCode={calcMonthCode(index)} />
    })
  }

  render() {
    return (
      <div>
        {this.state.loggedin === false && <Redirect to='/login'/>}
        {this.generateMonthLists()}
      </div>
    )
  }
}

export default HomePage
