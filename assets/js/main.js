// Function to load the form page
async function loadForm() {
  // Use history.pushState to change the URL without reloading the page
  history.pushState({ page: 'form' }, 'Form Page', 'form.html');
  
  // Load the content of the form page into the #app div
  document.getElementById('app').innerHTML = await fetchContent('form.html');

  
}

// Function to submit the form and load the images page
function submitForm(event) {
  event.preventDefault();
  // Process form data here
  
  // Use history.pushState to change the URL without reloading the page
  history.pushState({ page: 'images' }, 'Images Page', 'images.html');
  
  // Load the content of the images page into the #app div
  document.getElementById('app').innerHTML = fetchContent('images.html');
}


// Function to show the images
function showImages() {
  // logic to display images goes here
  
  // Use history.pushState to change the URL without reloading the page
  history.pushState({ page: 'about' }, 'About Page', 'about.html');
  
  // Load the content of the about page into the #app div
  document.getElementById('app').innerHTML = fetchContent('about.html');
}

async function fetchContent(url) {
	const response = await fetch(url);
	return await response.text();
}


// Event listener for the browser back button
window.onpopstate = function(event) {
  if (event.state) {
      // Load the content of the previous page when the back button is pressed
      document.getElementById('app').innerHTML = fetchContent(event.state.page + '.html');
  }
};

// Initial setup: Load the initial content when the page is first loaded
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('app').innerHTML = fetchContent('index.html');
});