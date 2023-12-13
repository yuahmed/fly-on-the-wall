//variables to dictate bg color transitions
let color = document.querySelector("#fcolor");
let bg = document.getElementById("background");

//                      HANDLING PAGE TRANSITIONS:                //


// handling view transitions
let views = {
  intro: document.querySelector("#intro"),
  form: document.querySelector("#form"),
  load: document.querySelector("#load"),
  images: document.querySelector("#images"),
  about: document.querySelector("#about"),
};

// on page load, if there is a hash in the url...
if (window.location.hash) {
  // show that page
  displayView(window.location.hash);
} else {
  // or show intro page by default
  displayView("intro");
}

//display the view
function displayView(view) {
  // remove hash symbol (if found)
  view = view.replace("#", "");

  // hide all others
  for (var key in views) {
    if (views.hasOwnProperty(key)) {
      views[key].style.display = "none";
    }
  }

  // show the selected item
  views[view].style.display = "block";

  // update the page state to reflect the new view
  history.pushState(view, null, `#${view}`);
  if (view !== load) {
    bg.classList.remove("bgChange");
    bg.style.backgroundColor = "#fff8f0";
    updateHSLValue("#fff8f0", view);
  }

  if (view === "images") {
    bg.style.backgroundColor = `${color.value}`;
    updateHSLValue(color.value, view);
  }

  // special case: loading page to images
  if (view === "load") {
    bg.classList.add("bgChange");
    bg.style.setProperty("--toColor", `${color.value}`);
    updateHSLValue(color.value,view);
    // set time out
    setTimeout(function () {
      displayView("images");
    }, 5000);
  }
}

// add listener to entire page
document.body.addEventListener("click", function (e) {
  // console.log(e.target.classList);
  // then determine the view to display by the target clicked

  if (e.target.classList.contains("formLink")) {
    displayView("form");
  } else if (e.target.classList.contains("introLink")) {
    displayView("intro");
  } else if (e.target.classList.contains("loadLink")) {
    displayView("load");
  } else if (e.target.classList.contains("imagesLink")) {
    displayView("images");
  } else if (e.target.classList.contains("aboutLink")) {
    displayView("about");
  }
});

//                      INTRO PAGE Content:                           //

//changing text on intro page:
let story = document.getElementById("storyline");
let contBtn = document.querySelector(".formLink");

// //timeout to change the text after 5 seconds
// setTimeout(function () {
//   story.innerText =
//     "Because flies have been around for so long, many have thought thay have all-knowing capabilities.";

//   // another timeout to change the text again after an additional 5 seconds
//   setTimeout(function () {
//     story.innerText =
//       "For some time now, many researchers all over the globe have been studying ";
//     contBtn.style.display = "block";
//   }, 5000);
// }, 5000);

var i = 0;
var txt = 'Flies have been around for roughly 250 million years, far more than us humans. Because they have been around for so long, theories have suggested that they have all-knowing capabilities. After years of research, the first model of a fly is in testing and is ready to be used. By answering a few basic questions, the fly is capable of knowing much more about you than you think!';
var speed = 40; /* The speed/duration of typing in milliseconds */
var pauseDuration = 1000; /* The duration of pause in milliseconds */

function typeWriter() {
  var storylineElement = document.getElementById("storyline");

  if (i < txt.length) {
    storylineElement.innerHTML += txt.charAt(i);
    if (txt.charAt(i) === '.' || txt.charAt(i) === '!') {
      storylineElement.innerHTML += '<br><br>';
      i++;
      setTimeout(typeWriter, pauseDuration); // Pause after each sentence
    } else {
      i++;
      setTimeout(typeWriter, speed);
    }
  } else {
    // Display the continue button after the typing is complete
    contBtn.style.display = "block";
  }
}

// Trigger the typeWriter function when the window has finished loading
window.onload = function() {
  typeWriter();
};



//                      FORM PAGE Content:                           //

// handling form values + submission
let form = document.getElementById("myForm");
let btn = document.querySelector("#submit");
let nickname = document.querySelector("#name");
let whereBtn = document.querySelector("#whereBtn");

color.addEventListener("change", buttonStyle);

// enable button once i have color + nickname values
function buttonStyle() {
  if (nickname.value === "" || color.value === "") {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

form.addEventListener("submit", logSubmit);

//setting up the where's [name] button
function logSubmit(event) {
  event.preventDefault();

  whereBtn.innerHTML = `<h2 style = "text-align: center;">
        Where's <strong> ${nickname.value}? </strong></h2>`;
}

//                              LOADING PAGE content:                         //

//changing text on loading page:
let loadText = document.getElementById("loadText");

let textOpts = [
  "snooping around...",
  "pondering...",
  "flying through...",
  "gathering intel...",
  "inspecting...",
  "spying...",
];

//timeout to change the text after 1.5 seconds
setInterval(function () {
  loadText.innerText = `${textOpts[Math.floor(Math.random() * 6)]}`;
}, 1000);

// Get the fly element
const fly = document.getElementById("fly");

// Function to animate the fly
function animateFly() {
  // Generate random coordinates for new position
  const newX = Math.random() * 200;
  const newY = Math.random() * 100;

  // Apply new position using CSS transform
  fly.style.transform = `translate(${newX}px, ${newY}px)`;

  //TODO: if it moves backwards, the image is flipped
  // such that the fly is facing the direction it flies in
}

// Call the animateFly function every 2 seconds
setInterval(animateFly, 2000);

//                          RESULTS PAGE Content + APIs              //


// Time info
function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();



//API Info

let apiKey = "0124f293e597ecbb56d530359574ff3b7c5ff74a41966f4ba1d156cc";

let longitude,
  latitude,
  continent_name,
  country_name,
  region,
  city,
  emojiFlag,
  currencyPlural;

// Getting GeoLocation info
function getGeoLocation() {
  return fetch(`https://api.ipdata.co?api-key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      longitude = data.longitude;
      latitude = data.latitude;
      continent_name = data.continent_name;
      country_name = data.country_name;
      region = data.region;
      city = data.city;
      emojiFlag = data.emoji_flag;
    });
}

// Getting currency Info
function getCurrencyInfo() {
  return fetch(`https://api.ipdata.co/currency?api-key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      currencyPlural = data.plural;
      console.log(currencyPlural);
    });
}

//obtaining user device:
//currently only set up for WINDOWS, APPLE, LINUX & ANDROID
function getDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes("windows")) {
    return "a Windows";
  } else if (userAgent.includes("macintosh") || userAgent.includes("mac os")) {
    return "an Apple";
  } else if (userAgent.includes("linux")) {
    return "a Linux";
  } else if (userAgent.includes("android")) {
    return "an Android";
  } else {
    return "an unknown";
  }
}

//battery  info
navigator.getBattery().then((battery) => {
  let chargeStatus = document.querySelector("#charge");
  let level = document.querySelector("#level");

  let battCharge = `${battery.level * 100}%`;
  level.innerHTML = battCharge + '🔋';
  chargeStatus.innerHTML = `${
    battery.charging ? " charging." : " not charging."
  }`;
});

//text display of user data:
let longLat = document.querySelector("#longLat");
let loc = document.querySelector("#location");
let currency = document.querySelector("#currency");
let device = document.querySelector("#device");
let battery = document.querySelector("#battery");

devType = getDevice();

async function initializeData() {
  await getGeoLocation();
  await getCurrencyInfo();
}

//Wait for functions to finish before loading
initializeData().then(() => {
longLat.innerHTML = `${longitude}, ${latitude}. 🗺️`;
loc.innerHTML = `${city}, ${region}, ${country_name}. ${emojiFlag}`;
currency.innerHTML = `${currencyPlural}. 💸`;
device.innerHTML = devType;
});
//battery content handled in its function above

//result display function : upon button click, a new result item is revealed
index = 0;
function resDisplay() {
  let longLatStat = document.querySelector("#longLatStat");
  let locStat = document.querySelector("#locStat");
  let currStat = document.querySelector("#currStat");
  let devStat = document.querySelector("#devStat");
  let battStat = document.querySelector("#battStat");
  let howBtn = document.querySelector("#howBtn");

  if (index == 0) {
    index++;
    longLatStat.style.display = "block";
    longLatStat.classList.remove("d-none");
  } else if (index == 1) {
    index++;
    locStat.style.display = "block";
    locStat.classList.remove("d-none");
  } else if (index == 2) {
    index++;
    currStat.style.display = "block";
    currStat.classList.remove("d-none");
  } else if (index == 3) {
    index++;
    devStat.style.display = "block";
    devStat.classList.remove("d-none");
  } else if (index == 4) {
    //index++;
    battStat.style.display = "block";
    battStat.classList.remove("d-none");
    howBtn.style.display = "block";
    howBtn.classList.remove("d-none");
  }
}

//    handling contrast bw bg color + font color:   //
function updateHSLValue(colChange, view) {
  const hexColor = colChange.substring(1); // Removing the '#' character
  const rgbColor = parseInt(hexColor, 16);
  //getting r, g & b components using bit manipulation
  const r = (rgbColor >> 16) & 255;
  const g = (rgbColor >> 8) & 255;
  const b = rgbColor & 255;

  const hslColor = rgbToHsl(r, g, b);

  const lightness = hslColor[2];

  // Set text color based on lightness
  if (view === "load") {
    bg.style.setProperty("--textToCol", lightness > 50 ? "#000000" : "#ffffff");
  } else {
    bg.style.color = lightness > 50 ? "#000000" : "#ffffff";
  }
}

//converts the rgb color to hsl here, return hsl equivalent
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
