export function formatDay(day) {
  const date = new Date(day)

  const formatDate = `${daysOfWeek[date.getDay()]} ${date.toLocaleDateString()}`

  return formatDate
}
export function formatTime(time) {
  const date = new Date(time)
  const formatTime = `${date.getHours(date.getUTCHours() + 5)}:${
    date.getMinutes() ? date.getMinutes() : '00'
  }`
  return formatTime
}

const daysOfWeek = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
]
