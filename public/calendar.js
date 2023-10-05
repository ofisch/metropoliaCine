document.addEventListener("DOMContentLoaded", function () {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectMonth = document.getElementById("selectMonth");

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  console.log(currentMonth);
  let currentDay = currentDate.getDate();

  const monthDiv = document.getElementById("month");
  const weekDiv = document.getElementById("week");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");
  const currentMonthButton = document.getElementById("currentMonth");
  const calendarDiv = document.getElementById("calendar");

  const getInfo = async () => {
    let url = "https://users.metropolia.fi/~onnif/calendar-data.json";
    let proxyUrl = `https://corsproxy.io/?https%3A%2F%2Fusers.metropolia.fi%2F~onnif%2Fcalendar-data.json`;

    try {
      let res = await fetch(proxyUrl);
      console.log("res: ", res);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  function isOngoingMonth(year, month) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    return year === currentYear && month === currentMonth;
  }

  const generateCalendar = async (year, month) => {
    calendarDiv.innerHTML = "";
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const daysInMonth = endDate.getDate();
    const firstDay = startDate.getDay();

    monthDiv.textContent = `${year} ${monthNames[month]}`;

    weekDiv.innerHTML = `
      <div class="grid grid-cols-7 text-center max-w-5xl mx-auto">
        ${dayNames
          .map((dayName, index) => {
            const isCurrentDay = index === new Date().getDay();
            const textStyle = isCurrentDay ? "text-action" : "";
            return `<div class="${textStyle}">${dayName}</div>`;
          })
          .join("")}
      </div>
    `;

    for (let i = 0; i < firstDay; i++) {
      calendarDiv.innerHTML += `<div></div>`;
    }

    let info = await getInfo();

    const eventMap = info;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateContainer = document.createElement("div");
      dateContainer.classList.add(
        "py-2",
        "text-center",
        "h-28",
        "overflow-y-auto",
        "rounded",
        "border",
        "border-transparent",
        "hover:border",
        "hover:border-action",
        "transition",
        "ease-in-out",
        "duration-300"
      );

      if (day === currentDay && isOngoingMonth(year, currentMonth)) {
        dateContainer.classList.remove(
          "border",
          "border-transparent",
          "hover:border",
          "hover:border-action"
        );
        dateContainer.classList.add(
          "border",
          "border-2",
          "border-action",
          "rounded"
        );
      }

      if (
        eventMap[day] &&
        eventMap[day][0].month === currentMonth + 1 &&
        eventMap[day][0].year === currentYear
      ) {
        const events = eventMap[day];
        const eventHtml = events
          .map((event) => {
            return `
              <div class="w-11/12 mt-1 text-sm bg-event rounded mx-auto text-primary">
                <p class="text-center">${event.time}</p>
                <p class="text-center">${event.event}</p>
              </div>
            `;
          })
          .join("");
        dateContainer.innerHTML = `
          <div>${day}</div>
          ${eventHtml}
        `;
      } else {
        dateContainer.innerText = day;
      }

      calendarDiv.appendChild(dateContainer);
    }
  };

  updateCalendar = () => {
    generateCalendar(currentYear, currentMonth);
  };

  updateCalendar();

  prevMonthButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar();
    selectMonth.value = currentMonth;
  });

  nextMonthButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
    selectMonth.value = currentMonth;
  });

  currentMonthButton.addEventListener("click", function () {
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    updateCalendar();
    selectMonth.value = currentMonth;
  });

  selectMonth.addEventListener("change", function () {
    currentMonth = parseInt(selectMonth.value);
    updateCalendar();
  });
});
