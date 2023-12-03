//LOGIC FLOW:
// summary of what each page should lead to:
// intro --> form
// form --> loading
// loading --> results/ images page (AUTOMATIC/ no button)
// images -- > about (two cases: about button (navbar) AND "how do you know" button after 4th image)

//TO DOs:
// 1. implement historyState for functionality to go to the previous page

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

  //special case
  if (view === "load") {
    //set time out
    setTimeout(function () {
      displayView("images");
    }, 3000);
  }
}

// add listener to entire page
document.body.addEventListener("click", function (e) {
  // console.log(e.target.classList);
  // then determine the view to display by the target clicked

  //intro page has formLink
  //form page has loadLink
  //load page does not need a button
  //image page has imagesLink, aboutLink, homeLink [not implemented yet]

  if (e.target.classList.contains("formLink")) {
    displayView("form");
  } else if (e.target.classList.contains("loadLink")) {
    displayView("load");
  } else if (e.target.classList.contains("imagesLink")) {
    displayView("images");
  } else if (e.target.classList.contains("aboutLink")) {
    displayView("about");
  }
});

// handling form values + submission
let btn = document.querySelector("#submit");
let nickname = document.querySelector("#name");
let color = document.querySelector("#fcolor");

color.addEventListener("change", buttonStyle);

// enable button once i have color + nickname values
function buttonStyle() {
  if (nickname.value === "" || color.value === "") {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

//changing text on intro page:
let story = document.getElementById("storyline");
let contBtn = document.querySelector(".formLink");

//timeout to change the text after 5 seconds
setTimeout(function() {
  story.innerText = "Now that you're here, the Fly is wondering whether your data is in this mess! To find out, it needs your help.";

  // another timeout to change the text again after an additional 5 seconds
  setTimeout(function() {
    story.innerText = "Can you answer some of it's questions? If yes, press continue to help the Fly solve this puzzle!";
    contBtn.style.display = "block";
  }, 5000);
}, 5000);

// // Function to load the form page
// async function loadForm() {
//   // Use history.pushState to change the URL without reloading the page
//   history.pushState({ page: 'form' }, 'Form Page', 'form.html');

//   // Load the content of the form page into the #app div
//   document.getElementById('app').innerHTML = await fetchContent('form.html');

// }

// // Function to submit the form and load the images page
// function submitForm(event) {
//   event.preventDefault();
//   // Process form data here

//   // Use history.pushState to change the URL without reloading the page
//   history.pushState({ page: 'images' }, 'Images Page', 'images.html');

//   // Load the content of the images page into the #app div
//   document.getElementById('app').innerHTML = fetchContent('images.html');
// }

// // Function to show the images
// function showImages() {
//   // logic to display images goes here

//   // Use history.pushState to change the URL without reloading the page
//   history.pushState({ page: 'about' }, 'About Page', 'about.html');

//   // Load the content of the about page into the #app div
//   document.getElementById('app').innerHTML = fetchContent('about.html');
// }

// async function fetchContent(url) {
// 	const response = await fetch(url);
// 	return await response.text();
// }

// // Event listener for the browser back button
// window.onpopstate = function(event) {
//   if (event.state) {
//       // Load the content of the previous page when the back button is pressed
//       document.getElementById('app').innerHTML = fetchContent(event.state.page + '.html');
//   }
// };

// // Initial setup: Load the initial content when the page is first loaded
// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('app').innerHTML = fetchContent('index.html');
// });



//Get users location





async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
		{
			headers: { Authorization: "Bearer {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}" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
query({"inputs": "Astronaut riding a horse"}).then((response) => {
	// Use image
});
