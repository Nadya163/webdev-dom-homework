function formatDate (myDate) {
  let date = myDate.getDate();
  let month = myDate.getMonth() + 1;
  let hour = myDate.getHours();
  let minute = myDate.getMinutes();

  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return `${date}.${month}.${myDate.getFullYear().toString().substr(-2)} ${hour}:${minute}`;
}
// export { formatDate }; 