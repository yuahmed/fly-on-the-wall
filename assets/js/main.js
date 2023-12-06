//LOGIC FLOW:
// summary of what each page should lead to:
// intro --> form
// form --> loading
// loading --> results/ images page (AUTOMATIC/ no button)
// images -- > about (two cases: about button (navbar) AND "how do you know" button after 4th image)

//TO DOs:
// 1. implement historyState for functionality to go to the previous page
// 2. organize this JS file

let bg = document.getElementById("background");
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
  console.log(`${view}`);

  // hide all others
  for (var key in views) {
    if (views.hasOwnProperty(key)) {
      views[key].style.display = "none";
    }
  }
  // show the selected item
  views[view].style.display = "block";
  // update the page hash to reflect new page
  window.location.hash = `${view}`;

  //special case: loading page to images
  if (view === "load") {
    //set time out
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
    // document.getElementById("background").style.color = color.value;
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

//timeout to change the text after 5 seconds
setTimeout(function () {
  story.innerText =
    "Now that you're here, the Fly is wondering whether your data is in this mess! To find out, it needs your help.";

  // another timeout to change the text again after an additional 5 seconds
  setTimeout(function () {
    story.innerText =
      "Can you answer some of it's questions? If yes, press continue to help the Fly solve this puzzle!";
    contBtn.style.display = "block";
  }, 5000);
}, 5000);

//                      FORM PAGE Content:                           //

//let color = document.querySelector("#fcolor");
// handling form values + submission
let form = document.getElementById("myForm");
let btn = document.querySelector("#submit");
let nickname = document.querySelector("#name");
let color = document.querySelector("#fcolor"); //moved up for background
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

function logSubmit(event) {
  event.preventDefault();

  //console.log(nickname);

  whereBtn.innerHTML = `<h2 style = "text-align: center;">
        WHERE'S </h2>
    <h2 style = "text-align: center;">
        <strong> ${nickname.value}? </strong> </h2>`;
}

//                              LOADING PAGE content:                         //
//bg.style.backgroundImage = `linear-gradient(#FFF8F0,${color.value}`;

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

  //TODO: if it moves backwords, the image is flipped
  // such that the fly is facing the direction it flies in
}

// Call the animateFly function every 2 seconds
setInterval(animateFly, 2000);

//                          RESULTS PAGE Content                //

//Get user data: location, currency

// Variables to store user information
let ipAddress, country, region, city, timezone, currency, organisationName;

// Getting user's location
fetch("http://ip-api.com/json/?fields=45674495")
  .then((response) => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse response.body (convert to JSON), pass to next
    return response.json();
  })
  // data = deserialized response body
  .then((data) => {
    // Store values in variables
    ipAddress = data.query;
    country = data.country;
    region = data.regionName;
    city = data.city;
    timezone = data.timezone;
    currency = data.currency;
    organisationName = data.org;

    //to remove later:
    console.log("IP Address:", ipAddress);
    console.log("Country:", country);
    console.log("Region:", region);
    console.log("City:", city);
    console.log("Timezone:", timezone);
    console.log("Currency:", currency);
    console.log("Organisation:", organisationName);

    //text display of user data:

    let loc = document.querySelector("#location");
    let curr = document.querySelector("#currency");

    loc.innerHTML = `${city}, ${region}, ${country}.`;
    curr.innerHTML = `${currency}.`;

    region = region.replace(/ /g, ""); //for thr image content later.
  })
  .catch((error) => {
    console.error("Error fetching IP information:", error);
  });

//obtaining user device:
//currently only set up for WINDOWS, APPLE, LINUX & ANDROID
let device = document.querySelector("#device");
devType = getDevice();
device.innerHTML = devType;

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
    return "Unknown";
  }
}

//battery  info
navigator.getBattery().then((battery) => {
  let chargeStatus = document.querySelector("#charge");
  let level = document.querySelector("#level");

  let battCharge = `${battery.level * 100}%`;
  level.innerHTML = battCharge;
  chargeStatus.innerHTML = `${
    battery.charging ? " charging." : " not charging."
  }`;
});

//image display function : upon button click, each new image is revealed
index = 0;
function imgDisplay() {
  let deviceStat = document.getElementById("deviceStat");
  let locStat = document.getElementById("locStat");
  let currStat = document.getElementById("currStat");
  let batteryStat = document.getElementById("batteryStat");
  let howBtn = document.getElementById("howBtn");

  let locImg = document.getElementById("locImg");
  let devImg = document.getElementById("devImg");
  let currImg = document.getElementById("currImg");
  let battImg = document.getElementById("battImg");

  //TODO: code this better\
  console.log(index);
  if (index == 0) {
    index++;
    locImg.innerHTML = `<img src= "https://loremflickr.com/320/240/${city},${region}">`;
    locStat.style.display = "block";
    locStat.classList.remove("d-none");
  } else if (index == 1) {
    index++;
    var myString = "This is a string.";
    var strChng = /\w\s(.*)/g;
    var match = strChng.exec(devType);
    console.log(match[1]);

    devImg.innerHTML = `<img src= "https://loremflickr.com/320/240/${match[1]}">`;
    deviceStat.classList.remove("d-none");
  } else if (index == 2) {
    index++;
    currImg.innerHTML = `<img src= "https://loremflickr.com/320/240/${currency}">`;
    currStat.classList.remove("d-none");
  } else if (index == 3) {
    //index++;
    //battImg.innerHTML = `<img src= "https://loremflickr.com/320/240/${battCharge}">`;
    batteryStat.classList.remove("d-none");
    howBtn.classList.remove("d-none");
  }
}
