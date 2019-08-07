 const dateInterval = (date, interval) => {
    let seperate = date.split('-')
    let numbers = seperate.map((number) => {
      return Number(number)
    })
    let thirty_days = [4, 6, 9, 11]
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
    let thirty_days = ['4', '6', '9', '11']
    if (dates.length === 0){
      dates.push(dateInterval(date, interval))
    }
    if (interval === 'annual'){
      return dates
    }
    if (interval === 'monthly'){
      for (let i = 0;i < 11; i++){
        let use = dates[dates.length-1].split('-')
        if ((thirty_days.includes(use[1]) === false) && use[1] !== '2'){
          if(date.slice(8) === '31'){
           use[2] = '31'
          }
        }
        use = use.join()
        use = use.replace(/,/g, '-')
        dates[dates.length-1] = use
        dates.push(dateInterval(use, interval))
      }
    }
    if (interval === 'quarterly'){
      for (let i = 0;i < 3; i++){
        let use = dates[dates.length-1].split('-')
        if ((thirty_days.includes(use[1]) === false) && use[1] !== '2'){
          if(date.slice(8) === '31'){
           use[2] = '31'
          }
        }
        use = use.join()
        use = use.replace(/,/g, '-')
        dates[dates.length-1] = use
        dates.push(dateInterval(use, interval))
      }
    }
    return dates
  }

export default {
  dateInterval: dateInterval,
  recurringDates: recurringDates
}

