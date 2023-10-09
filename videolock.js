document.addEventListener("DOMContentLoaded", function () {
  let scheduledDate = 0;
  let scheduledYear = 0;
  let scheduledMonth = 0;
  let scheduledDay = 0;
  let scheduledHours = 0;
  let scheduledMinutes = 0;

  const beforeScheduledDate = () => {
    const currentDate = new Date();
    const democompoDate = new Date("2023-10-12T20:00:00");
    const mikkoDate = new Date("2023-11-16T18:00:00");
    const morningDate = new Date("2023-10-20T12:00:00");
    const museoDate = new Date("2023-11-08T19:20:00");
    const opiskelijaDate = new Date("2023-11-20T14:45:00");

    const path = window.location.pathname;
    const page = path.split("/").pop();
    console.log(page);

    if (page == "democompo.html") {
      scheduledDate = democompoDate;
    } else if (page == "mikko.html") {
      scheduledDate = mikkoDate;
    } else if (page == "morning.html") {
      scheduledDate = morningDate;
    } else if (page == "museo.html") {
      scheduledDate = museoDate;
    } else if (page == "opiskelija.html") {
      scheduledDate = opiskelijaDate;
    }

    scheduledYear = scheduledDate.getFullYear();
    scheduledMonth = scheduledDate.getMonth() + 1;
    scheduledDay = scheduledDate.getDate();
    scheduledHours = scheduledDate.getHours();
    scheduledMinutes = scheduledDate.getMinutes();

    if (scheduledMinutes < 10) {
      scheduledMinutes = "0" + scheduledMinutes;
    }

    return currentDate < scheduledDate;
  };

  const video = document.getElementById("my-video");
  console.log(video);

  if (beforeScheduledDate()) {
    video.controls = false;
    video.addEventListener("click", (event) => {
      event.preventDefault();
    });

    const message = document.createElement("p");
    message.textContent =
      "This video will be available on " +
      scheduledDay +
      "." +
      scheduledMonth +
      "." +
      scheduledYear +
      ". at " +
      scheduledHours +
      "." +
      scheduledMinutes +
      ".";
    video.parentNode.insertBefore(message, video);
  }
});
