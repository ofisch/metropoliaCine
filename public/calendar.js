const generateCalendar = (year, month) => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const daysInMonth = endDate.getDate();

  const firstDay = startDate.getDay();

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

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthDiv = document.getElementById("month");
  const calendarDiv = document.getElementById("calendar");

  monthDiv.innerHTML = `
        <p class="text-center py-6 text-lg">${year} ${monthNames[month]}</p>
        <div class="grid grid-cols-7 text-center">
          ${dayNames
            .map((dayName, index) => {
              const isCurrentDay = index === new Date().getDay();
              const textStyle = isCurrentDay ? "text-tangerine" : "";
              return `<div class="${textStyle}">${dayName}</div>`;
            })
            .join("")}
        </div>
      `;

  for (let i = 0; i < firstDay; i++) {
    calendarDiv.innerHTML += `<div></div>`;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const eventMap = {
    3: [
      {
        time: "12.00",
        event: "testing",
      },
    ],
    2: [
      {
        time: "12.00",
        event: "testing",
      },
      {
        time: "23.30",
        event: "more testing",
      },
    ],
    11: [
      {
        time: "9.00 - 16.00",
        event: "Live opening",
      },
    ],
    15: [
      {
        time: "13.15",
        event: "Movie 1",
      },
    ],
  };

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
      "hover:border-tangerine"
    );

    if (year === currentYear && month === currentMonth && day === currentDay) {
      dateContainer.classList.remove(
        "border",
        "border-transparent",
        "hover:border",
        "hover:border-tangerine"
      );
      dateContainer.classList.add(
        "border",
        "border-2",
        "border-tangerine",
        "rounded"
      );
    }

    if (eventMap[day]) {
      const events = eventMap[day];
      const eventHtml = events
        .map((event) => {
          return `
              <div class="w-11/12 mt-1 text-sm bg-blue rounded mx-auto text-gunmetal">
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

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

generateCalendar(currentYear, currentMonth);
