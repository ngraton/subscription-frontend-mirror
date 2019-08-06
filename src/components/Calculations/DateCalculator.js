import React, { Component } from 'react';

class DateCalculator extends Component {
  dateInterval = (date, interval) => {
    let seperate = date.split('-')
    let numbers = seperate.map((number) => {
      return Number(number)
    })
    if (interval === 'monthly'){
      if (numbers[1] === 12){
        numbers[0]+= 1
        numbers[1] = 1
      }
    else {
        numbers[1]+= 1
      }
    }
    if (interval === 'quarterly'){
      numbers[1] = numbers[1] + 3
      if (numbers[1] > 12){
        numbers[1] = numbers[1] - 12
        numbers[0]+= 1
      }
    }
    if (interval === 'anually'){
      numbers[0]+= 1
    }
    let string = ''
    for (let i = 0; i < numbers.length; i++){
      string+= numbers[i].toString() + `-`
    }
   
    return string.slice(0,string.length - 1)
    }
  

  recurringDates = (date, interval) => {
    let dates = []
    let use = dates[dates.length-1]
    if (dates.length === 0){
      dates.push(this.dateInterval(date, interval))
    }
    if (interval === 'monthly'){
      for (let i = 0;i < 11; i++){
        let use = dates[dates.length-1]
        dates.push(this.dateInterval(use, interval))
      }
    }
    if (interval === 'quarterly'){
      for (let i = 0;i < 3; i++){
        let use = dates[dates.length-1]
        dates.push(this.dateInterval(use, interval))
      }
    }
    if (interval === 'annually'){
      for (let i = 0;i < 3; i++){
        dates.push(this.dateInterval(use, interval))
      }
    }
    return dates
  }
  render () {
    return (
      <div>
        <h1>
          Check the console
        </h1>
      </div>
    )
  }
}
export default DateCalculator;
