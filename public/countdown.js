let allEvents = [];
let allEventsAsDates = [];
const getInfo = async () => {
  let proxyUrl = `https://corsproxy.io/?https%3A%2F%2Fusers.metropolia.fi%2F~onnif%2Fcalendar-data.json`;

  try {
    let res = await fetch(proxyUrl);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
//converts object items into a date object
function convertTimeToDate(dataObject) {
  const year = dataObject.year;
  const month = dataObject.month - 1; // Months in JavaScript Date are 0-based
  const date = dataObject.date;
  const timeParts = dataObject.time.split('.');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  return new Date(year, month, date, hours, minutes);
}
function findNextUpcomingDate(datesArray) {
  const now = new Date().getTime();
  let closestDate = null;
  let timeDifference = Infinity;

  datesArray.forEach((date) => {
    const gap = date - now;
    if (gap > 0 && gap < timeDifference) {
      closestDate = date;
      timeDifference = gap;
    }
  });

  return closestDate;
}
const countdown = async () => {

  const countDate = findNextUpcomingDate(allEventsAsDates);
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

//sort function for dates
function compareDates(a, b) {
  // Compare by year
  if (a.year !== b.year) {
    return a.year - b.year;
  }

  // Compare by month
  if (a.month !== b.month) {
    return a.month - b.month;
  }

  // Compare by date
  if (a.date !== b.date) {
    return a.date - b.date;
  }

  // Compare by time (convert to a common format for comparison)
  const timeA = a.time.includes('-') ? a.time.split('-')[0] : a.time;
  const timeB = b.time.includes('-') ? b.time.split('-')[0] : b.time;

  return timeA.localeCompare(timeB);
}

const timesort = (jsonData) => {
  const transformedData = [];

  for (const dateIndex in jsonData) {
    if (jsonData.hasOwnProperty(dateIndex)) {
      const date = parseInt(dateIndex); // Convert the dateIndex to a number
      const events = jsonData[dateIndex];
  
      events.forEach((eventObj) => {
        const transformedObj = {
          date: date,
          year: eventObj.year,
          month: eventObj.month,
          time: eventObj.time,
          event: eventObj.event,
        };
        transformedData.push(transformedObj);
        allEvents = transformedData;
      });
    }
  }
};
getInfo()
  .then((times) => {
    data = times; // You can access the object returned by getInfo here
    timesort(data);
    console.log(allEvents);
    for(let i = 0;i < allEvents.length; i++){
      allEventsAsDates.push(convertTimeToDate(allEvents[i]));
      console.log(convertTimeToDate(allEvents[i]));
    }
  })
  .catch((error) => {
    console.error(error);
  });
setInterval(countdown, 1000);
