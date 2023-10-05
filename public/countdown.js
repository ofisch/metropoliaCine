const countdown = () => {
  const countDate = new Date("October 6, 2023 00:00:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  let dayEle = document.getElementById("day");
  let hourEle = document.getElementById("hour");
  let minuteEle = document.getElementById("minute");
  let secondEle = document.getElementById("second");
  dayEle.innerHTML = textDay;
  hourEle.innerHTML = textHour;
  minuteEle.innerHTML = textMinute;
  secondEle.innerHTML = textSecond;
};

setInterval(countdown, 1000);
