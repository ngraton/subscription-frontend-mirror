


 const dateInterval = (date, interval) => {
    // console.log(date)
    let seperate = date.split('-')
    let numbers = seperate.map((number) => {
      return Number(number)
    })
    if (interval === 'annual'){
      return date
    }
    let thirty_days = [4, 9, 11]
    if (interval === 'monthly'){
      if (numbers[1] === 12){
        numbers[0]+= 1
        numbers[1] = 1
      }
    else {
        numbers[1]+= 1
        if (numbers[1] === 2){
          if (numbers[2] > 28){
            numbers[2] = 28
          }
        }
        else if (thirty_days.includes(numbers[1])) {
          if (numbers[2] > 30){
            numbers[2] = 30
          }
        }
      }
    }
    else if (interval === 'quarterly'){
      numbers[1] = numbers[1] + 3
      if (numbers[1] > 12){
        numbers[1] = numbers[1] - 12
        numbers[0]+= 1
      }
      else if (numbers[1] === 2){
        if (numbers[2] > 28){
          numbers[2] = 28
        }
      }
      else if (thirty_days.includes(numbers[1])) {
        if (numbers[2] > 30){
          numbers[2] = 30
        }
    }
  }
    if (interval === 'annual'){
      numbers[0]+= 1
      if (numbers[1] === 2){
        if (numbers[2] > 28){
          numbers[2] = 28
        }
      }
      else if (thirty_days.includes(numbers[1])) {
        if (numbers[2] > 30){
          numbers[2] = 30
        }
    }
   }
    
    let string = ''
    for (let i = 0; i < numbers.length; i++){
      string+= numbers[i].toString() + `-`
    }
   
    return string.slice(0,string.length - 1)
  }
  

  const recurringDates = (date, interval) => {
    let dates = []
    let use = 0
    if (dates.length === 0){
      dates.push(dateInterval(date, interval))
    }
    if (interval === 'monthly'){
      for (let i = 0;i < 11; i++){
        let use = dates[dates.length-1]
        dates.push(dateInterval(use, interval))
      }
    }
    if (interval === 'quarterly'){
      for (let i = 0;i < 3; i++){
        let use = dates[dates.length-1]
        dates.push(dateInterval(use, interval))
      }
    }
    if (interval === 'annual'){
      return [date]
    }
    return dates
  }

export default {
  dateInterval: dateInterval,
  recurringDates: recurringDates
}
