getDueDate(monthCode, date) {
  let dueDate = new Date(date)
  dueDate.setMonth(monthCode)
  dueDate.setHours(30)
  dueDate.getMonth() !== monthCode && dueDate.setDate(0)
  return dueDate.getDate()
}
