export function getLastDate(date) {
  return new Date(new Date(date.getFullYear(),date.getMonth()+1,1)-24*60*60*1000+1)
}