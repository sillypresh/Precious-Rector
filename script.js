const clocks = [
  { city: "New York", location: "United States", zone: "EST", timeZone: "America/New_York" },
  { city: "London", location: "United Kingdom", zone: "GMT", timeZone: "Europe/London" },
  { city: "Lagos", location: "Nigeria", zone: "WAT", timeZone: "Africa/Lagos" },
  { city: "Dubai", location: "United Arab Emirates", zone: "GST", timeZone: "Asia/Dubai" },
  { city: "Tokyo", location: "Japan", zone: "JST", timeZone: "Asia/Tokyo" },
  { city: "Sydney", location: "Australia", zone: "AEDT", timeZone: "Australia/Sydney" }
];

const timeParts = (timeZone) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
};

const dateFor = (timeZone) => new Intl.DateTimeFormat("en-US", {
  timeZone,
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
}).format(new Date());

const grid = document.querySelector("#clock-grid");

clocks.forEach(({ city, location, zone, timeZone }) => {
  const card = document.createElement("article");
  card.className = "clock-card";
  card.innerHTML = `
    <div class="card-top">
      <div><h2 class="city">${city}</h2><p class="location">${location}</p></div>
      <span class="zone">${zone}</span>
    </div>
    <p class="time" aria-label="Current time in ${city}"><span class="hours">--</span>:<span class="minutes">--</span><span class="seconds">:--</span></p>
    <div class="time-meta"><span class="day-dot"></span><span class="date">Loading date…</span></div>`;
  card.dataset.timeZone = timeZone;
  grid.appendChild(card);
});

const update = () => {
  document.querySelectorAll(".clock-card").forEach((card) => {
    const parts = timeParts(card.dataset.timeZone);
    card.querySelector(".hours").textContent = parts.hour;
    card.querySelector(".minutes").textContent = parts.minute;
    card.querySelector(".seconds").textContent = `:${parts.second}`;
    card.querySelector(".date").textContent = dateFor(card.dataset.timeZone);
  });
  document.querySelector("#local-date").textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  }).format(new Date());
};

update();
setInterval(update, 1000);
