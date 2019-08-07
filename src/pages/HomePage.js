import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MonthView from '../components/MonthView/MonthView';
import UsersAPI from '../api/UsersAPI';
import monthSorter from '../logic/monthSorter';

class HomePage extends Component {
  state = {
    loggedin: true,
    subscriptions: {}
  }

// This is what backend returns
//   {
//     "username": "admin",
//     "subscriptions": [
//         {
//             "id": 1,
//             "name": "big bill",
//             "due_date": "2019-08-14",
//             "payment": 100000,
//             "interval": "annual",
//             "user": 1
//         }
//     ]
// }
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
    
    return orderedMonths.map((month, index) => {
      return <MonthView key={index} month={month} subscriptions={this.state.subscriptions[month] ? this.state.subscriptions[month] : []} />
    })
  }
  handleLogout(e) {
    localStorage.removeItem('username')
    this.props.setUsername('')
    this.setState({loggedin: false})
  }


  render() {
    return (
      <div>
        {this.state.loggedin === false && <Redirect to='/login'/>}
        <button onClick={(e)=>this.handleLogout(e)}>Logout</button>
        <Link to='/addsubscription'>Add New Subscription</Link>
        {this.generateMonthLists()}
      </div>
    )
  }
}

export default HomePage
